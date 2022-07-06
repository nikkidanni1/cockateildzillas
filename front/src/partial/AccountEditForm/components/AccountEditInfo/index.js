import React from 'react'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, InputAdornment } from '@material-ui/core'
import CopyIcon from '@material-ui/icons/FilterNone'
import IconButton from '../../../../components/IconButton'

const useStyles = makeStyles({
    field: {
        display: 'block',
        width: '100%',
        margin: '4px 0 8px',
    }
})

const AccountEditInfo = ({ 
    isShown, 
    handleChange,
    handleBlur,
    formData,
    touched,
    errors
}) => {
    const classes = useStyles()

    const userInfo = useSelector(state => state.userInfo)

    const onCopyID = useCallback(() => {
        if (navigator) {
            navigator.clipboard.writeText(userInfo?._id ?? '')
        }
    }, [userInfo])

    return (
        <div style={{ display: isShown ? "block" : "none" }}>
            <TextField
                className={classes.field}
                label="ID"
                variant="filled"
                disabled
                value={userInfo?._id}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={onCopyID}
                                isActive={true}
                                edge="end"
                            >
                                <CopyIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <TextField
                className={classes.field}
                label="Email"
                variant="filled"
                disabled
                value={userInfo?.email}
            />
            <TextField
                className={classes.field}
                label="Ник"
                variant="filled"
                value={formData.nick}
                onChange={handleChange('nick')}
                onBlur={handleBlur('nick')}
                error={!!(touched.nick && errors.nick)}
                helperText={touched.nick && errors.nick}
            />
            <TextField
                className={classes.field}
                label="Кличка питомца"
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