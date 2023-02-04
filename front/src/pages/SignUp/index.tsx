import React from 'react'
import { useCallback, useState } from 'react'
import type { RootState, AppDispatch } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import Box from 'components/base/Box'
import TextField from 'components/base/TextField'
import { getErrors } from 'helpers/enums'
import Button from 'components/base/Button'
import { ButtonVariant } from 'helpers/enums'
import { signUpThunk } from 'store/thunk'
import styles from './SignUp.module.scss'

type SignUpFormWithChecking = SignUpForm & {
    repeatPassword: string
}
type Fields = keyof SignUpFormWithChecking
type SignUpTouched = Record<Fields, boolean>
type SignUpErrors = Record<Fields, string>

type ValidatePassword = (
    obj: {
        password: string,
        repeatPassword: string,
        isShownPassword: boolean
    }
) => Omit<SignUpErrors, 'email'>

const SignUp: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const appConstants: AppConstants | null = useSelector((state: RootState) => state.appConstants)
    const appLoading: boolean = useSelector((state: RootState) => state.appLoading)

    const [form, setForm] = useState<SignUpFormWithChecking>({
        email: '',
        password: '',
        repeatPassword: ''
    })
    const [touched, setTouched] = useState<SignUpTouched>({
        email: false,
        password: false,
        repeatPassword: false
    })
    const [errors, setErrors] = useState<SignUpErrors>({
        email: getErrors().requiredField,
        password: getErrors().requiredField,
        repeatPassword: getErrors().requiredField
    })
    const [isShownPassword, setShownPassword] = useState<boolean>(false)

    const validatePassword: ValidatePassword = useCallback(({ password, repeatPassword, isShownPassword }) => {
        const passwordErrors: Omit<SignUpFormWithChecking, 'email'> = {
            password: '',
            repeatPassword: ''
        }
        if (!password) {
            passwordErrors.password = getErrors().requiredField
        }
        if (!repeatPassword) {
            passwordErrors.repeatPassword = getErrors().requiredField
        }

        if (!passwordErrors.password && !passwordErrors.repeatPassword) {
            if (repeatPassword !== password && !isShownPassword) {
                passwordErrors.password = getErrors().passwordIsNotMatch
                passwordErrors.repeatPassword = getErrors().passwordIsNotMatch
            } else if (appConstants && (password.length < appConstants.minPasswordLength)) {
                passwordErrors.password = getErrors({ min: appConstants.minPasswordLength }).minLength
            } else if (appConstants && (password.length > appConstants.maxPasswordLength)) {
                passwordErrors.password = getErrors({ max: appConstants.maxPasswordLength }).maxLength
            } else if (password.search(/[0-9]/) === -1) {
                passwordErrors.password = getErrors().passwordWithNums
            } else if (password.search(/[A-Za-z]/) === -1) {
                passwordErrors.password = getErrors().passwordWithLetter
            } else if (password.search(/[^A-Za-z1-9_]/) !== -1) {
                passwordErrors.password = getErrors().invalidСharacters
            } else {
                passwordErrors.password = ''
                passwordErrors.repeatPassword = ''
            }
        }
        return passwordErrors
    }, [])

    const validate = useCallback((field: string, value: string): void => {
        const newErrors: SignUpErrors = { ...errors }

        switch (field) {
            case 'password': {
                const passwordErrors = validatePassword({
                    password: value,
                    repeatPassword: form.repeatPassword,
                    isShownPassword: isShownPassword
                })
                newErrors.password = passwordErrors.password
                newErrors.repeatPassword = passwordErrors.repeatPassword
                break
            }
            case 'repeatPassword': {
                const passwordErrors = validatePassword({
                    password: form.password,
                    repeatPassword: value,
                    isShownPassword: isShownPassword
                })
                newErrors.password = passwordErrors.password
                newErrors.repeatPassword = passwordErrors.repeatPassword
                break
            }
            case 'email': {
                if (value) {
                    const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    newErrors[field] = value.match(regexp) ? '' : getErrors().invalidEmail

                } else {
                    newErrors[field] = getErrors().requiredField
                }
                break
            }
            default: {
                if (!value) {
                    newErrors[field] = getErrors().requiredField
                } else {
                    newErrors[field] = ''
                }
            }
        }

        setErrors(newErrors)
    }, [errors, form, isShownPassword, validatePassword])

    const handleChange = useCallback((field: string): React.ChangeEventHandler<HTMLInputElement> => e => {
        const value = e.target.value
        validate(field, value)
        setForm({
            ...form,
            [field]: value
        })
    }, [form, validate])

    const handleBlur = useCallback((field: string): React.FocusEventHandler<HTMLInputElement> => () => {
        setTouched({
            ...touched,
            [field]: true
        })
    }, [touched])

    const onSignUp: React.MouseEventHandler<HTMLButtonElement> = useCallback(async () => {
        const newTouched: SignUpTouched = { ...touched }
        for (let key in newTouched) {
            newTouched[key] = true
        }

        setTouched(newTouched)
        if (!errors.email && !errors.password) {
            dispatch(signUpThunk({ email: form.email, password: form.password }, navigate))
        }
    }, [errors, form, touched, dispatch, navigate])

    const onClickShowPassword: React.MouseEventHandler = useCallback(() => {
        setShownPassword(prev => !prev)
    }, [])

    return (
        <Box
            className={styles.box}
            title="Регистрация"
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
                {!isShownPassword && (
                    <TextField
                        className={styles.input}
                        label="Повторите пароль"
                        type="password"
                        variant="filled"
                        value={form.repeatPassword}
                        onChange={handleChange('repeatPassword')}
                        onBlur={handleBlur('repeatPassword')}
                        error={!!(touched.repeatPassword && errors.repeatPassword)}
                        helperText={touched.repeatPassword && errors.repeatPassword}
                    />
                )}
                <div className={styles.buttonsWrapper}>
                    <Button
                        variant={ButtonVariant.Primary}
                        onClick={onSignUp}
                        disabled={appLoading}
                        startIcon={appLoading ? <CircularProgress size={16} /> : ''}
                    >
                        Регистрация
                    </Button>
                    <Link
                        className={styles.hideUnderLine}
                        to="/login"
                    >
                        <Button
                            variant={ButtonVariant.Secondary}
                            disabled={appLoading}
                            startIcon={appLoading ? <CircularProgress size={16} /> : ''}
                        >
                            Назад
                        </Button>
                    </Link>
                </div>
            </div>
        </Box>
    )
}

export default SignUp