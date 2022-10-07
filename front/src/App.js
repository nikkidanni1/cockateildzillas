import React, { useCallback, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import LoadingComponent from 'components/base/LoadingComponent'
import Login from 'pages/Login'
import Account from 'pages/Account'
import SignUp from 'pages/SignUp'
import AccountEdit from 'pages/AccountEdit'
import ActivateAccount from 'pages/ActivateAccount'
import RecoveryPassword from 'pages/RecoveryPassword'
import { setError, setNotifyMessage, loadAppData } from 'store/actions'
import Layout from 'components/partial/Layout'

const useStyles = makeStyles({
    snackError: {
        backgroundColor: 'rgb(255,81,81, 0.83)'
    }
})

const App = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const notifyMessage = useSelector(state => state.notifyMessage)
    const appLoading = useSelector(state => state.appLoading)
    const userInfo = useSelector(state => state.userInfo)

    useEffect(() => {
        dispatch(loadAppData())
    }, [])


    const hideNotifyError = useCallback(() => {
        dispatch(setError(''))
    }, [dispatch])

    const hideNotifyInfo = useCallback(() => {
        dispatch(setNotifyMessage(''))
    }, [dispatch])

    const action = type => (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={type === 'error' ? hideNotifyError : hideNotifyInfo}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    return (
        <Router>
            <Layout>
                {
                    appLoading ? (
                        <LoadingComponent />
                    ) : (
                        <Switch>
                            <Route path="/login" >
                                <Login />
                            </Route>
                            <Route path="/signup" >
                                <SignUp />
                            </Route>
                            <Route path="/activate/:id">
                                <ActivateAccount />
                            </Route>
                            <Route path="/recovery" >
                                <RecoveryPassword />
                            </Route>
                            <Route path="/account/edit">
                                {userInfo ? (
                                    <AccountEdit />
                                ) : (
                                    <Redirect to="/login" />
                                )}
                            </Route>
                            <Route path="/account">
                                {userInfo ? (
                                    (userInfo?.cockateil && userInfo?.nick) ? (
                                        <Account />
                                    ) : (
                                        <Redirect to="/account/edit" />
                                    )
                                ) : (
                                    <Redirect to="/login" />
                                )}
                            </Route>
                            <Route exact path="/">
                                <Redirect to={userInfo ? '/account' : '/login'} />
                            </Route>
                        </Switch>
                    )}
                <Snackbar
                    open={error}
                    autoHideDuration={6000}
                    onClose={hideNotifyError}
                >
                    <SnackbarContent
                        className={classes.snackError}
                        action={action('error')}
                        aria-describedby="error"
                        message={error}
                    />
                </Snackbar>
                <Snackbar
                    open={notifyMessage}
                    autoHideDuration={6000}
                    onClose={hideNotifyInfo}
                >
                    <SnackbarContent
                        action={action('info')}
                        aria-describedby="info"
                        message={notifyMessage}
                    />
                </Snackbar>
            </Layout>
        </Router>
    )
}

export default App
