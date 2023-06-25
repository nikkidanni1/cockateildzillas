import React from 'react'
import { useCallback, useState } from 'react'
import type { AppDispatch } from 'store'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import TextField from 'components/base/TextField'
import Box from 'components/base/Box'
import { getErrors } from 'helpers/enums'
import Button from 'components/base/Button'
import { ButtonVariant } from 'helpers/enums'
import { recoveryThunk } from 'store/thunk'
import styles from './RecoveryPasswordPage.module.scss'

type RecoveryPasswordForm = Record<'email', string>
type RecoveryPasswordTouched = Record<'email', boolean>
type RecoveryPasswordErrors = Record<'email', string>

const RecoveryPasswordPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState<RecoveryPasswordForm>({
        email: '',
    })
    const [touched, setTouched] = useState<RecoveryPasswordTouched>({
        email: false,
    })
    const [errors, setErrors] = useState<RecoveryPasswordErrors>({
        email: getErrors().requiredField,
    })

    const validate = useCallback((field: string, value: string): void => {
        const newErrors: RecoveryPasswordErrors = { ...errors }

        if (value) {
            const regexp: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            newErrors[field] = value.match(regexp) ? '' : getErrors().invalidEmail

        } else {
            newErrors[field] = getErrors().requiredField
        }

        setErrors(newErrors)
    }, [errors])

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

    const onRecovery: React.MouseEventHandler<HTMLButtonElement> = useCallback(async () => {
        const newTouched: RecoveryPasswordTouched = { ...touched }
        for (let key in newTouched) {
            newTouched[key] = true
        }
        setTouched(newTouched)

        if (!errors.email) {
            dispatch(recoveryThunk(form.email, navigate))
        }
    }, [errors, form, touched, dispatch, navigate])

    return (
        <Box
            className={styles.box}
            title="Восстановление пароля"
        >
            <div>
                <TextField
                    className={styles.input}
                    label="Почта"
                    type="email"
                    variant="filled"
                    value={form.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={!!(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                />
                <div className={styles.buttonsWrapper}>
                    <Button
                        variant={ButtonVariant.Primary}
                        onClick={onRecovery}
                    >
                        Восстановить
                    </Button>
                    <Link
                        className={styles.hideUnderLine}
                        to="/login"
                    >
                        <Button
                            variant={ButtonVariant.Secondary}
                        >
                            Назад
                        </Button>
                    </Link>
                </div>
            </div>
        </Box>
    )
}

export default RecoveryPasswordPage