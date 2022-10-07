import React from 'react'
import { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { createSubColors } from 'helpers/utils'

import Tabs from 'components/base/Tabs'
import { getErrors } from 'helpers/enums'
import AccountEditInfo from './components/AccountEditInfo'
import AccountEditAppearance from './components/AccountEditAppearance'
import Button from 'components/base/Button'

const useStyles = makeStyles({
    form: {

    },
    tabs: {
        marginBottom: 16
    }
})

const tabs = [
    { value: "info", label: "Информация" },
    { value: "appearance", label: "Внешность" }
]

const AccountEditForm = () => {
    const classes = useStyles()
    const userInfo = useSelector(state => state.userInfo)
    const appContants = useSelector(state => state.appContants)

    const [formData, setFormData] = useState({
        nick: "",
        cockatielNick: ""
    })
    const [touched, setTouched] = useState({
        nick: false,
        cockatielNick: false
    })
    const [errors, setErrors] = useState({
        nick: getErrors().requiredField,
        cockatielNick: getErrors().requiredField
    })
    const [appearanceData, setAppearanceData] = useState(null)
    const [activeTab, setActiveTab] = useState(tabs[0].value)

    useEffect(() => {
        let nick = ""
        if (userInfo?.nick) {
            nick = userInfo.nick
        }

        setFormData(prev => ({
            ...prev,
            nick
        }))
    }, [userInfo])

    useEffect(() => {
        const processedAppearanceData = {}
        appContants.cockateilAppearanceParts.forEach(part => {
            processedAppearanceData[part] = {
                ...appContants.cockateilAppearanceDataDefault[part],
                ...createSubColors(appContants.cockateilAppearanceDataDefault[part].main_color, appContants.cockateilParts[part].shades)
            }
        })
        setAppearanceData(processedAppearanceData)
    }, [appContants])

    const onChangeTab = useCallback((e, value) => {
        setActiveTab(value)
    }, [])

    const validate = useCallback((field, value) => {
        const newErrors = { ...errors }
        if (!value) {
            newErrors[field] = getErrors().requiredField
        } else if (value.length > appContants.maxName) {
            newErrors[field] = getErrors({ max: appContants.maxName }).maxLength
        } else {
            newErrors[field] = ''
        }
        setErrors(newErrors)
    }, [errors, appContants])

    const handleChange = useCallback((field) => (e) => {
        const value = e.target.value
        validate(field, value)
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }, [errors, appContants])

    const handleBlur = useCallback((field) => () => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }))
    }, [])

    const onChangePartColor = useCallback((part, color) => {
        const colors = createSubColors(color, appContants.cockateilParts[part].shades)
        setAppearanceData(prev => ({
            ...prev,
            [part]: {
                ...prev[part],
                ...colors
            }
        }))
    }, [])

    const onNext = useCallback((e) => {
        onChangeTab(e, "appearance")
    }, [])

    return (
        <form className={classes.form}>
            <Tabs
                className={classes.tabs}
                value={activeTab}
                onChange={onChangeTab}
                tabs={tabs}
            />
            <AccountEditInfo
                isShown={activeTab === "info"}
                handleChange={handleChange}
                handleBlur={handleBlur}
                formData={formData}
                touched={touched}
                errors={errors}
            />
            <AccountEditAppearance
                isShown={activeTab === 'appearance'}
                appearanceData={appearanceData}
                onChangePartColor={onChangePartColor}
            />
            {activeTab === "info" && (
                <Button
                    color="secondary"
                    onClick={onNext}
                >
                    Далее
                </Button>
            )}
        </form>
    )
}

export default AccountEditForm