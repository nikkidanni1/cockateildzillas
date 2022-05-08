import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core'
import Button from '../Button'

const useStyles = makeStyles({
    paper: {
        width: '100%',
        maxWidth: 350,
        background: 'rgb(40,50,70)',
        borderRadius: '0',
        boxShadow: '-8px 0 0 0 black, 8px 0 0 0 black, 0 -8px 0 0 black, 0 8px 0 0 black',
    },
    title: {
        '& .MuiTypography-root': {
            fontFamily: 'MultiTypePixel',
            color: 'rgba(255,255,255,0.53)',
            fontSize: '2rem',
        }
    },
    actions: {
        padding: '0 24px 16px'
    }
})

const ModalBase = ({ isOpen, onClose, children }) => {
    const classes = useStyles()
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            classes={{ paper: classes.paper }}
        >
            <DialogTitle className={classes.title}>
                Настройки
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button
                    isActive={false}
                    onClick={onClose}
                >
                    ОК
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalBase