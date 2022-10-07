import React from 'react'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Box from 'components/base/Box'
import { getErrors } from 'helpers/enums'
import Button from 'components/base/Button'
import { recovery } from 'api'
import { setError, setNotifyMessage } from 'store/actions'

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

const SignUp = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [form, setForm] = useState({
        email: '',
    })
    const [touched, setTouched] = useState({
        email: false,
    })
    const [errors, setErrors] = useState({
        email: getErrors().requiredField,
    })

    const validate = useCallback((field, value) => {
        const newErrors = { ...errors }

        if (value) {
            const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            newErrors[field] = value.match(regexp) ? '' : getErrors().invalidEmail

        } else {
            newErrors[field] = getErrors().requiredField
        }

        setErrors(newErrors)
    }, [errors])

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

        if (!errors.email) {
            try {
                const res = await recovery({ email: form.email })
                if (res.error) {
                    dispatch(setError(res.error))
                }
                if (res.responseBody) {
                    history.push('/login')
                    dispatch(setNotifyMessage('Пароль выслан, пожалуйста, проверьте свою почту'))
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

    return (
        <Box
            className={classes.box}
            title="Восстановление пароля"
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
                        Восстановить
                    </Button>
                </div>
            </div>
        </Box>
    )
}

export default SignUp