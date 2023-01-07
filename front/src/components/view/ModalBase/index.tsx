import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { ButtonVariant } from 'helpers/enums'
import Button from 'components/base/Button'
import styles from './ModalBase.module.scss'

type Props = {
    isOpen: boolean,
    onClose: React.MouseEventHandler,
    title?: string
}

const ModalBase: React.FC<Props> = ({ isOpen, onClose, children, title }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            classes={{ paper: styles.paper }}
        >
            <DialogTitle className={styles.title}>
                {title}
            </DialogTitle>
            <DialogContent className={styles.content}>
                {children}
            </DialogContent>
            <DialogActions className={styles.actions}>
                <Button
                    variant={ButtonVariant.Secondary}
                    onClick={onClose}
                >
                    ОК
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalBase