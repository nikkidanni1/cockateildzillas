import React from 'react'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { TextField, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Box from '../../components/Box'
import { getErrors } from '../../helpers/enums'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Visibility from '@material-ui/icons/Visibility'
import Button from '../../components/Button'
import IconButton from '../../components/IconButton'
import { signup } from '../../api'
import { setError, setNotifyMessage } from '../../store/actions'

const useStyles = makeStyles({
    root: {
        position: 'relative',
        zIndex: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
    },
    box: {
        width: 400
    },
    input: {
        width: '100%',
        margin: '4px 0 8px'
    },
    buttonsWrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: '8px'
    },
    hideUnderLine: {
        textDecoration: 'none !important',
    }
})

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 32

const SignUp = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [form, setForm] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        repeatPassword: false
    })
    const [errors, setErrors] = useState({
        email: getErrors().requiredField,
        password: getErrors().requiredField,
        repeatPassword: getErrors().requiredField
    })
    const [isShownPassword, setShownPassword] = useState(false)

    const validatePassword = useCallback(({ password, repeatPassword, isShownPassword }) => {
        const passwordErrors = {
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
            } else if (password.length < PASSWORD_MIN_LENGTH) {
                passwordErrors.password = getErrors({ min: PASSWORD_MIN_LENGTH }).minLength
            } else if (password.length > PASSWORD_MAX_LENGTH) {
                passwordErrors.password = getErrors({ max: PASSWORD_MAX_LENGTH }).maxLength
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

    const validate = useCallback((field, value) => {
        const newErrors = { ...errors }

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

    const handleChange = useCallback(field => e => {
        const value = e.target.value
        validate(field, value)
        setForm({
            ...form,
            [field]: value
        })
    }, [form, validate])

    const handleBlur = useCallback(field => () => {
        setTouched({
            ...touched,
            [field]: true
        })
    }, [touched])

    const onSignUp = useCallback(async () => {
        const newTouched = {}
        const touchedKeys = Object.keys(touched)
        touchedKeys.forEach(key => {
            newTouched[key] = true
        })
        setTouched(newTouched)
        if (!errors.email && !errors.password) {
            try {
                const res = await signup({ email: form.email, password: form.password })
                if (res.error) {
                    dispatch(setError(res.error))
                }
                if (res.responseBody) {
                    history.push('/login')
                    dispatch(setNotifyMessage('Пользователь успешно создан, пожалуйста, проверьте свою почту'))
                }
            } catch (err) {
                dispatch(setError(err.message))
                console.log(err)
            }
        }
    }, [errors, form, touched, dispatch, history])

    const handleMouseDownPassword = useCallback((event) => {
        event.preventDefault()
    }, [])

    const handleClickShowPassword = useCallback(() => {
        setShownPassword(prev => !prev)
    }, [])

    return (
        <Box
            className={classes.box}
            title="Регистрация"
        >
            <div>
                <TextField
                    className={classes.input}
                    label="Почта"
                    type="email"
                    variant="filled"
                    value={form.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={!!(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                />
                <TextField
                    className={classes.input}
                    label="Пароль"
                    type={isShownPassword ? 'text' : 'password'}
                    variant="filled"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    isActive={isShownPassword}
                                    edge="end"
                                >
                                    {isShownPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    value={form.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={!!(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                />
                {!isShownPassword && (
                    <TextField
                        className={classes.input}
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
                <div className={classes.buttonsWrapper}>
                    <Link
                        className={classes.hideUnderLine}
                        to="/login"
                    >
                        <Button
                            color="secondary"
                        >
                            Назад
                        </Button>
                    </Link>
                    <Button
                        onClick={onSignUp}
                    >
                        Регистрация
                    </Button>
                </div>
            </div>
        </Box>
    )
}

export default SignUp