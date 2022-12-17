import React from 'react'
import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { TextField, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Box from 'components/base/Box'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Visibility from '@material-ui/icons/Visibility'
import CircularProgress from '@material-ui/core/CircularProgress'

import Button from 'components/base/Button'
import IconButton from 'components/base/IconButton'
import { authenticate } from 'api'
import { setUserInfo, setError } from 'store/actions'
import { getErrors } from 'helpers/enums'

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
        display: 'flex',
        width: '100%',
        margin: '4px 0 8px'
    },
    buttonsWrapper: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px,1fr))',
        columnGap: '8px'
    },
    link: {
        display: 'block',
        marginBottom: 8,
        fontFamily: 'monospace',
        fontSize: 17,
        color: 'rgba(255,255,255,0.87)'
    },
    hideUnderLine: {
        textDecoration: 'none !important',
    }
})

const Login = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const appContants = useSelector(state => state.appContants)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [touched, setTouched] = useState({
        email: false,
        password: false
    })
    const [errors, setErrors] = useState({
        email: getErrors().requiredField,
        password: getErrors().requiredField
    })
    const [isShownPassword, setShownPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(document.cookie)
        document.cookie = 'auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        dispatch(setUserInfo(null))
    }, [history.location.pathname])

    const validate = useCallback((field, value) => {
        const newErrors = { ...errors }
        if (!value) {
            newErrors[field] = getErrors().requiredField
        } else if (field === 'password' && value.length > appContants.maxPasswordLength) {
            newErrors[field] = getErrors({ max: appContants.maxPasswordLength }).maxLength
        } else {
            newErrors[field] = ''
        }
        setErrors(newErrors)
    }, [errors, appContants])

    const handleChange = useCallback(field => e => {
        const value = e.target.value
        validate(field, value)
        setForm(prev => ({
            ...prev,
            [field]: value
        }))
    }, [errors, appContants])

    const handleBlur = useCallback(field => () => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }))
    }, [])

    const onLogin = useCallback(async () => {
        const newTouched = { ...touched }
        const touchedKeys = Object.keys(touched)
        touchedKeys.forEach(field => {
            newTouched[field] = true
        })
        setTouched(newTouched)

        let isValidForm = true
        const errorKeys = Object.keys(errors)
        errorKeys.find(key => {
            if (errors[key]) {
                isValidForm = false
                return errors[key]
            }
        })

        if (isValidForm) {
            setLoading(true)
            try {
                const user = await authenticate(form)
                if (user.error) {
                    dispatch(setError(user.error))
                }
                if (user.responseBody) {
                    dispatch(setUserInfo(user.responseBody))
                    history.push('/account')
                }
            } catch (err) {
                dispatch(setError(err.message))
                console.log(err)
            }
            setLoading(false)
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
            title="Вход"
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
                <Link
                    className={classes.link}
                    to="/recovery"
                >
                    Восстановить пароль
                </Link>
                <div className={classes.buttonsWrapper}>
                    <Link
                        className={classes.hideUnderLine}
                        to="/signup"
                    >
                        <Button
                            color="secondary"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={16} /> : ''}
                        >
                            Регистрация
                        </Button>
                    </Link>
                    <Button
                        onClick={onLogin}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={16} /> : ''}
                    >
                        Войти
                    </Button>
                </div>
            </div>
        </Box>
    )
}

export default Login