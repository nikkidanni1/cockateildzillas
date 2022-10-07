import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Box from 'components/base/Box'
import AccountEditForm from 'components/partial/AccountEditForm'

const useStyles = makeStyles({
    box: {
        width: '100%',
        minWidth: 320,
        maxWidth: 600,
        padding: "16px 24px 24px"
    }
})

const AccountEdit = () => {
    const classes = useStyles()
    const appLoading = useSelector(state => state.appLoading)

    return (
        !appLoading && (
            <Box className={classes.box}>
                <AccountEditForm />
            </Box>
        )
    )
}

export default AccountEdit