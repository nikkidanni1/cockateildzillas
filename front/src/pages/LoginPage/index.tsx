import React from 'react'
import { useCallback, useState } from 'react'
import type { RootState, AppDispatch } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Box from 'components/base/Box'

import TextField from 'components/base/TextField'
import Button from 'components/base/Button'
import { loginThunk } from 'store/thunk'
import { getErrors, ButtonVariant } from 'helpers/enums'
import styles from './LoginPage.module.scss'

type Fields = keyof LoginForm
type LoginTouched = Record<Fields, boolean>
type LoginErrors = Record<Fields, string>

const LoginPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const appConstants: AppConstants | null = useSelector((state: RootState) => state.appConstants)
    const initLoading: boolean = useSelector((state: RootState) => state.initLoading)
    const appLoading: number = useSelector((state: RootState) => state.appLoading)

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
            dispatch(loginThunk(form, appConstants, navigate))
        }
    }, [errors, form, touched, dispatch, navigate, appConstants])

    const onSignUp = useCallback(() => {
        navigate('/signup')
    }, [])

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
                    <Button
                        variant={ButtonVariant.Primary}
                        onClick={onLogin}
                        disabled={initLoading || appLoading !== 0}
                    >
                        Войти
                    </Button>
                    <Button
                        variant={ButtonVariant.Secondary}
                        onClick={onSignUp}
                        disabled={initLoading || appLoading !== 0}
                    >
                        Регистрация
                    </Button>
                </div>
            </div>
        </Box>
    )
}

export default LoginPage