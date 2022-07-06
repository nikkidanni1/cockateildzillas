import React from 'react'
import { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import Tabs from '../../components/Tabs'
import { getErrors } from '../../helpers/enums'
import AccountEditInfo from './components/AccountEditInfo'
import AccountEditAppearance from './components/AccountEditAppearance'
import Button from '../../components/Button'

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