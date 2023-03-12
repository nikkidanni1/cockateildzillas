import React from 'react'
import { useCallback } from 'react'
import { TextField as MTextField } from '@mui/material'
import { InputAdornment } from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { ButtonVariant } from 'helpers/enums'
import IconButton from 'components/base/IconButton'
import styles from './TextField.module.scss'

type Props = {
    passwordDetails?: {
        isShownPassword?: boolean,
        onClickShowPassword?: React.MouseEventHandler,
    }
} & React.ComponentProps<typeof MTextField>

const TextField: React.FC<Props> = ({ className, type = 'text', passwordDetails, ...props }) => {
    const handleMouseDownPassword: React.MouseEventHandler = useCallback((event) => {
        event.preventDefault()
    }, [])

    return (
        <MTextField
            variant="filled"
            InputProps={(type === 'password' && passwordDetails) ? {
                endAdornment: (
                    <InputAdornment className={styles.input__inputAdornment} position="end">
                        <IconButton
                            onClick={passwordDetails.onClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            variant={passwordDetails.isShownPassword ? ButtonVariant.Primary : ButtonVariant.Secondary}
                            edge="end"
                        >
                            {passwordDetails.isShownPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            } : {}}
            {...props}
            className={`${styles.input} ${className ?? ''}`}
            type={(type === 'password') ? (passwordDetails?.isShownPassword ? 'text' : 'password') : type}
            FormHelperTextProps={{
                className: styles.helperText
            }}
        />
    )
}

export default TextField