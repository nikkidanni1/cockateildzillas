import React from 'react'
import { useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { RootState } from 'store'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch } from 'store'
import { createSubColors, addSubColorsToAppearanceData } from 'helpers/utils'
import { getErrors, ButtonVariant } from 'helpers/enums'
import { updateUserInfoThunk } from 'store/thunk'

import Tabs from 'components/base/Tabs'
import AccountEditInfo from './components/AccountEditInfo'
import AccountEditAppearance from './components/AccountEditAppearance'
import Button from 'components/base/Button'
import HelpPopoverAppearanceTab from './components/HelpPopoverAppearanceTab'
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
                <HelpPopoverAppearanceTab />
            </span>
        )
    }
]

const AccountEditForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    const appConstants: AppConstants | null = useSelector((state: RootState) => state.appConstants)

    const [formData, setFormData] = useState<AccountEditFormFields>({
        nickname: "",
        cockatielName: ""
    })
    const [touched, setTouched] = useState<AccountEditTouched>({
        nickname: false,
        cockatielName: false
    })
    const [errors, setErrors] = useState<AccountEditErrors>({
        nickname: getErrors().requiredField,
        cockatielName: getErrors().requiredField
    })
    const [appearanceData, setAppearanceData] = useState<CockatielAppearanceData | null | undefined>()
    const [activeTab, setActiveTab] = useState<TabValue>(tabs[0].value)

    const reset = useCallback(() => {
        setAppearanceData(undefined)
        setFormData({
            nickname: "",
            cockatielName: ""
        })
        setErrors({
            nickname: getErrors().requiredField,
            cockatielName: getErrors().requiredField
        })
        setTouched({
            nickname: false,
            cockatielName: false
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
                nickname: "",
                cockatielName: ""
            }

            let appearanceData: CockatielAppearanceData | null = null

            if (userInfo?.nickname) {
                formData.nickname = userInfo.nickname
            }

            if (userInfo?.cockatiel) {
                formData.cockatielName = userInfo.cockatiel.name
                appearanceData = userInfo.cockatiel.appearanceData
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
        // init appearance data if empty on server
        if (appConstants && appearanceData === null) {
            const processedAppearanceData: CockatielAppearanceData = addSubColorsToAppearanceData(
                appConstants.cockatielAppearanceDataDefault, 
                appConstants
            )
            setAppearanceData(processedAppearanceData)
        }
    }, [appConstants, appearanceData])

    const onChangeTab = useCallback((e: React.SyntheticEvent, value: TabValue): void => {
        setActiveTab(value)
    }, [])

    const validate = useCallback((field: string, value: string): string => {
        let error: string

        if (!value) {
            error = getErrors().requiredField
        } else if (appConstants && (value.length > appConstants.maxName)) {
            error = getErrors({ max: appConstants.maxName }).maxLength
        } else {
            error = ''
        }

        setErrors(errors => {
            const newErrors: AccountEditErrors = { ...errors }
            newErrors[field] = error
            return newErrors
        })

        return error
    }, [appConstants])

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

    const onSubmit: React.MouseEventHandler = useCallback((e) => {
        let hasError: boolean = false
        const newTouched: AccountEditTouched = { ...touched }
        Object.keys(formData).forEach(key => {
            hasError = hasError || !!validate(key, formData[key])
        })
        Object.keys(newTouched).forEach(key => {
            newTouched[key] = true
        })
        setTouched(newTouched)

        if (hasError) {
            onChangeTab(e, TabValue.Info)
            return
        } else if (appearanceData && appConstants) {
            const appearanceDataForRequest: CockatielAppearanceData = { ...appearanceData }
            appConstants.cockatielPartNames.forEach(name => {
                appearanceDataForRequest[name] = {
                    main_color: appearanceData[name].main_color
                }
            })
            dispatch(
                updateUserInfoThunk(
                    {
                        nickname: formData.nickname,
                        cockatiel: {
                            name: formData.cockatielName,
                            appearanceData: appearanceDataForRequest
                        }
                    },
                    appConstants,
                    navigate
                )
            )
        }
    }, [validate, touched, formData, appearanceData, appConstants])

    return (
        <form>
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
            {activeTab === TabValue.Appearance && (
                <Button
                    variant={ButtonVariant.Secondary}
                    onClick={onSubmit}
                >
                    Сохранить
                </Button>
            )}
        </form>
    )
}

export default AccountEditForm