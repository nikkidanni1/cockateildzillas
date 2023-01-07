import React from 'react'
import { useCallback } from 'react'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import { TextField, InputAdornment } from '@mui/material'
import CopyIcon from '@mui/icons-material/FilterNone'
import IconButton from 'components/base/IconButton'
import { ButtonVariant } from 'helpers/enums'
import styles from './AccountEditInfo.module.scss'

type Fields = keyof AccountEditFormFields
type AccountEditTouched = Record<Fields, boolean>
type AccountEditErrors = Record<Fields, string>

type Props = {
    isShown: boolean,
    handleChange: (field: string) => React.ChangeEventHandler,
    handleBlur: (field: string) => React.FocusEventHandler,
    formData: AccountEditFormFields,
    touched: AccountEditTouched,
    errors: AccountEditErrors
}

const AccountEditInfo: React.FC<Props> = ({ 
    isShown, 
    handleChange,
    handleBlur,
    formData,
    touched,
    errors
}) => {
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)

    const onCopyID: React.MouseEventHandler = useCallback(() => {
        if (navigator) {
            navigator.clipboard.writeText(userInfo?._id ?? '')
        }
    }, [userInfo])

    return (
        <div style={{ display: isShown ? "block" : "none" }}>
            <TextField
                className={styles.field}
                label="ID"
                variant="filled"
                disabled
                value={userInfo?._id}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={onCopyID}
                                variant={ButtonVariant.Primary}
                                edge="end"
                            >
                                <CopyIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <TextField
                className={styles.field}
                label="Email"
                variant="filled"
                disabled
                value={userInfo?.email}
            />
            <TextField
                className={styles.field}
                label="Ник"
                variant="filled"
                value={formData.nick}
                onChange={handleChange('nick')}
                onBlur={handleBlur('nick')}
                error={!!(touched.nick && errors.nick)}
                helperText={touched.nick && errors.nick}
            />
            <TextField
                className={styles.field}
                label="Кличка воина"
                variant="filled"
                value={formData.cockatielNick}
                onChange={handleChange('cockatielNick')}
                onBlur={handleBlur('cockatielNick')}
                error={!!(touched.cockatielNick && errors.cockatielNick)}
                helperText={touched.cockatielNick && errors.cockatielNick}
            />
        </div>
    )
}

export default AccountEditInfo