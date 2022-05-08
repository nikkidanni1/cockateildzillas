import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Box from '../../components/Box'
import ControlHeader from '../../components/ControlHeader'

const useStyles = makeStyles({
    root: {
        position: 'relative',
        zIndex: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
    }
})

const Account = () => {
    const classes = useStyles()
    const userInfo = useSelector(state => state.userInfo)
    const appLoading = useSelector(state => state.appLoading)
    console.log(userInfo, ' userInfo')
    return (
        !appLoading && (
            <Box>
                <ControlHeader title={`Пользователь: ${userInfo?.email}`} />
            </Box>
        )
    )
}

export default Account