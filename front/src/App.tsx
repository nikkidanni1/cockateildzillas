import React from 'react'
import { useCallback, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import type { RootState, AppDispatch } from 'store'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, IconButton, SnackbarContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LoadingComponent from 'components/base/LoadingComponent'
import Login from 'pages/Login'
import SignUp from 'pages/SignUp'
import ActivateAccount from 'pages/ActivateAccount'
import RecoveryPassword from 'pages/RecoveryPassword'
import Account from 'pages/Account'
import AccountEdit from 'pages/AccountEdit'
import { setError, setNotifyMessage } from 'store/actions'
import { loadAppDataThunk } from 'store/thunk'
import Layout from 'components/partial/Layout'
import styles from './App.module.scss'

enum ActionType {
    Error,
    Info
}

const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const error: string = useSelector((state: RootState) => state.error)
    const notifyMessage: string = useSelector((state: RootState) => state.notifyMessage)
    const appLoading: boolean = useSelector((state: RootState) => state.appLoading)
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)

    useEffect(() => {
        dispatch(loadAppDataThunk())
    }, [])

    const hideNotifyError = useCallback(() => {
        dispatch(setError(''))
    }, [dispatch])

    const hideNotifyInfo = useCallback(() => {
        dispatch(setNotifyMessage(''))
    }, [dispatch])

    const action: React.FC<ActionType> = (type) => (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={type === ActionType.Error ? hideNotifyError : hideNotifyInfo}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    )

    return (
        <Router>
            <Layout>
                <>
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
                        open={!!error}
                        autoHideDuration={6000}
                        onClose={hideNotifyError}
                    >
                        <SnackbarContent
                            className={styles.snackError}
                            action={action(ActionType.Error)}
                            aria-describedby="error"
                            message={error}
                        />
                    </Snackbar>
                    <Snackbar
                        open={!!notifyMessage}
                        autoHideDuration={6000}
                        onClose={hideNotifyInfo}
                    >
                        <SnackbarContent
                            action={action(ActionType.Info)}
                            aria-describedby="info"
                            message={notifyMessage}
                        />
                    </Snackbar>
                </>
            </Layout>
        </Router>
    )
}

export default App
