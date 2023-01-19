import React from 'react'
import { useCallback, useState, useEffect } from 'react'
import type { RootState, AppDispatch } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import Box from 'components/base/Box'

import TextField from 'components/base/TextField'
import Button from 'components/base/Button'
import { setUserInfo } from 'store/actions'
import { loginThunk } from 'store/thunk'
import { getErrors, ButtonVariant } from 'helpers/enums'
import styles from './Login.module.scss'

type Fields = keyof LoginForm
type LoginTouched = Record<Fields, boolean>
type LoginErrors = Record<Fields, string>

const Login: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const history = useHistory()

    const appConstants: AppConstants | null = useSelector((state: RootState) => state.appConstants)
    const appLoading = useSelector((state: RootState) => state.appLoading)

    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: ''
    })
    const [touched, setTouched] = useState<LoginTouched>({
        email: false,
        password: false
    })
    const [errors, setErrors] = useState<LoginErrors>({
        email: getErrors().requiredField,
        password: getErrors().requiredField
    })
    const [isShownPassword, setShownPassword] = useState<boolean>(false)

    useEffect(() => {
        document.cookie = 'auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        dispatch(setUserInfo(null))
    }, [history.location.pathname])

    const validate = useCallback((field: string, value: string): void => {
        const newErrors: LoginErrors = { ...errors }
        if (!value) {
            newErrors[field] = getErrors().requiredField
        } else if (field === 'password' && appConstants && (value.length > appConstants.maxPasswordLength)) {
            newErrors[field] = getErrors({ max: appConstants?.maxPasswordLength }).maxLength
        } else {
            newErrors[field] = ''
        }
        setErrors(newErrors)
    }, [errors, appConstants])

    const handleChange = useCallback((field: string): React.ChangeEventHandler<HTMLInputElement> => e => {
        const value: string = e.target.value
        validate(field, value)
        setForm(prev => ({
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

    const onLogin: React.MouseEventHandler = useCallback(async () => {
        const newTouched: LoginTouched = { ...touched }
        const touchedKeys: string[] = Object.keys(touched)
        touchedKeys.forEach(field => {
            newTouched[field] = true
        })
        setTouched(newTouched)

        let isValidForm: boolean = true
        const errorKeys: string[] = Object.keys(errors)
        errorKeys.find(key => {
            if (errors[key]) {
                isValidForm = false
                return errors[key]
            }
        })

        if (isValidForm && appConstants) {
            dispatch(loginThunk(form, history))
        }
    }, [errors, form, touched, dispatch, history, appConstants])

    const onClickShowPassword: React.MouseEventHandler = useCallback(() => {
        setShownPassword(prev => !prev)
    }, [])

    return (
        <Box
            className={styles.box}
            title="Вход"
        >
            <div>
                <TextField
                    className={styles.input}
                    label="Почта"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={!!(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                />
                <TextField
                    className={styles.input}
                    label="Пароль"
                    type="password"
                    variant="filled"
                    passwordDetails={{
                        isShownPassword,
                        onClickShowPassword
                    }}
                    value={form.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={!!(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                />
                <Link
                    className={styles.link}
                    to="/recovery"
                >
                    Восстановить пароль
                </Link>
                <div className={styles.buttonsWrapper}>
                    <Link
                        className={styles.hideUnderLine}
                        to="/signup"
                    >
                        <Button
                            variant={ButtonVariant.Secondary}
                            disabled={appLoading}
                            startIcon={appLoading ? <CircularProgress size={16} /> : ''}
                        >
                            Регистрация
                        </Button>
                    </Link>
                    <Button
                        variant={ButtonVariant.Primary}
                        onClick={onLogin}
                        disabled={appLoading}
                        startIcon={appLoading ? <CircularProgress size={16} /> : ''}
                    >
                        Войти
                    </Button>
                </div>
            </div>
        </Box>
    )
}

export default Login