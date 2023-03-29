import React from 'react'
import { useCallback, useState, useEffect } from 'react'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import { createSubColors } from 'helpers/utils'

import Tabs from 'components/base/Tabs'
import { getErrors } from 'helpers/enums'
import AccountEditInfo from './components/AccountEditInfo'
import AccountEditAppearance from './components/AccountEditAppearance'
import Button from 'components/base/Button'
import HelpPopover from 'components/view/HelpPopover'
import { ButtonVariant } from 'helpers/enums'
import styles from './AccountEditForm.module.scss'

type Fields = keyof AccountEditFormFields
type AccountEditTouched = Record<Fields, boolean>
type AccountEditErrors = Record<Fields, string>
enum TabValue {
    Info = "INFO",
    Appearance = 'APPEARANCE'
}

const tabs: Array<TabItem<TabValue>> = [
    {
        value: TabValue.Info,
        label: "Информация"
    },
    {
        value: TabValue.Appearance,
        label: (
            <span className={styles.tab_withIcon}>
                Внешность
                <HelpPopover
                    popoverProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        }
                    }}
                    paperClassName={styles.info__paper}
                >
                    <p className={styles.info__p}>
                        Для изменения цвета клинуть на соответствующую часть тела.
                    </p>
                    <p className={styles.info__p}>
                        Доступно к изменению:
                    </p>
                    <ul className={styles.info__list}>
                        <li>Голова</li>
                        <li>Щёки</li>
                        <li>Туловище</li>
                    </ul>
                    <p className={styles.info__p}>
                        Можно использовать цвет из палитры предложенных, либо нажать на элемент палитры "c" и выбрать любой другой.
                    </p>
                </HelpPopover>
            </span>
        )
    }
]

const AccountEditForm: React.FC = () => {
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    const appConstants: AppConstants | null = useSelector((state: RootState) => state.appConstants)

    const [formData, setFormData] = useState<AccountEditFormFields>({
        nick: "",
        cockatielNick: ""
    })
    const [touched, setTouched] = useState<AccountEditTouched>({
        nick: false,
        cockatielNick: false
    })
    const [errors, setErrors] = useState<AccountEditErrors>({
        nick: getErrors().requiredField,
        cockatielNick: getErrors().requiredField
    })
    const [appearanceData, setAppearanceData] = useState<CockatielAppearanceData | null | undefined>()
    const [activeTab, setActiveTab] = useState<TabValue>(tabs[0].value)

    const reset = useCallback(() => {
        setAppearanceData(undefined)
        setFormData({
            nick: "",
            cockatielNick: ""
        })
        setErrors({
            nick: getErrors().requiredField,
            cockatielNick: getErrors().requiredField
        })
        setTouched({
            nick: false,
            cockatielNick: false
        })
    }, [])

    useEffect(() => {
        return () => {
            reset()
        }
    }, [])

    useEffect(() => {
        if (appConstants) {
            const formData: AccountEditFormFields = {
                nick: "",
                cockatielNick: ""
            }
            
            let appearanceData: CockatielAppearanceData | null = null

            if (userInfo?.nick) {
                formData.nick = userInfo.nick
            }

            if (userInfo?.cockatiel) {
                formData.cockatielNick = userInfo.cockatiel.name

                appearanceData = appConstants.cockatielPartNames.reduce((result, part) => ({
                    ...result,
                    [part]: {
                        ...createSubColors(userInfo.cockatiel?.appearanceData[part].main_color, appConstants.cockatielPartInfo[part].shades),
                        main_color: userInfo.cockatiel?.appearanceData[part].main_color
                    }
                }), {})
            }

            Object.keys(formData).forEach(key => {
                validate(key, formData[key])
            })

            setAppearanceData(appearanceData)
            setFormData(prev => ({
                ...prev,
                ...formData
            }))
        }
    }, [userInfo, appConstants])

    useEffect(() => {
        if (appConstants && appearanceData === null) {
            const processedAppearanceData: CockatielAppearanceData = { ...appConstants.cockatielAppearanceDataDefault }
            appConstants?.cockatielPartNames.forEach(part => {
                processedAppearanceData[part] = {
                    ...processedAppearanceData[part],
                    ...createSubColors(appConstants.cockatielAppearanceDataDefault[part].main_color, appConstants.cockatielPartInfo[part].shades)
                }
            })
            setAppearanceData(processedAppearanceData)
        }
    }, [appConstants, appearanceData])

    const onChangeTab = useCallback((e: React.SyntheticEvent, value: TabValue): void => {
        setActiveTab(value)
    }, [])

    const validate = useCallback((field: string, value: string): void => {
        const newErrors: AccountEditErrors = { ...errors }
        if (!value) {
            newErrors[field] = getErrors().requiredField
        } else if (appConstants && (value.length > appConstants.maxName)) {
            newErrors[field] = getErrors({ max: appConstants.maxName }).maxLength
        } else {
            newErrors[field] = ''
        }
        setErrors(newErrors)
    }, [errors, appConstants])

    const handleChange = useCallback((field: string): React.ChangeEventHandler<HTMLInputElement> => (e) => {
        const value = e.target.value
        validate(field, value)
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }, [errors, appConstants])

    const handleBlur = useCallback((field: string): React.FocusEventHandler<HTMLInputElement> => () => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }))
    }, [])

    const onChangePartColor = useCallback((part: string, color: string): void => {
        if (appConstants) {
            const colors: CockatielAppearancePart = createSubColors(color, appConstants.cockatielPartInfo[part].shades)
            setAppearanceData((prev) => (prev ? {
                ...prev,
                [part]: {
                    ...prev[part],
                    ...colors
                }
            } : prev))
        }
    }, [appConstants])

    const onNext: React.MouseEventHandler = useCallback((e) => {
        onChangeTab(e, TabValue.Appearance)
    }, [])

    return (
        <form className={styles.form}>
            <Tabs
                className={styles.tabs}
                value={activeTab}
                onChange={onChangeTab}
                tabs={tabs}
            />
            <AccountEditInfo
                isShown={activeTab === TabValue.Info}
                handleChange={handleChange}
                handleBlur={handleBlur}
                formData={formData}
                touched={touched}
                errors={errors}
            />
            <AccountEditAppearance
                isShown={activeTab === TabValue.Appearance}
                appearanceData={appearanceData}
                onChangePartColor={onChangePartColor}
            />
            {activeTab === TabValue.Info && (
                <Button
                    variant={ButtonVariant.Secondary}
                    onClick={onNext}
                >
                    Далее
                </Button>
            )}
        </form>
    )
}

export default AccountEditForm