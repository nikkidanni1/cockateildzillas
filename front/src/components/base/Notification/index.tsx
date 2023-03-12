import React from 'react'
import { useCallback } from 'react'
import type { AppDispatch } from 'store'
import { useDispatch } from 'react-redux'
import { Snackbar, SnackbarContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { removeNotification } from 'store/actions'
import IconButton from 'components/base/IconButton'
import styles from './Notification.module.scss'


interface IPropsAction {
    onClick: React.MouseEventHandler
}

const Action: React.FC<IPropsAction> = ({ onClick }) => (
    <IconButton
        className={styles.closeButton}
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClick}
    >
        <CloseIcon fontSize="small" />
    </IconButton>
)

interface IProps {
    notification: NotificationMessage
}

const Notification: React.FC<IProps> = ({ notification }) => {
    const dispatch: AppDispatch = useDispatch()
    const hideNotification = useCallback((id: string) => () => {
        dispatch(removeNotification(id))
    }, [])

    return (
        <Snackbar
            className={styles.notification}
            open={!!notification}
            autoHideDuration={6000}
            onClose={hideNotification(notification.id)}
        >
            <SnackbarContent
                className={
                    `${styles.notification__content} ${notification.mode === 'error' ? styles.notification__content_error : ''}`
                }
                action={<Action onClick={hideNotification(notification.id)} />}
                aria-describedby={notification.mode}
                message={notification.text}
            />
        </Snackbar>
    )
}

export default Notification