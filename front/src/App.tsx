import React from 'react'
import { useEffect } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import type { RootState, AppDispatch } from 'store'
import { useSelector, useDispatch } from 'react-redux'
import Login from 'pages/Login'
import SignUp from 'pages/SignUp'
import ActivateAccount from 'pages/ActivateAccount'
import RecoveryPassword from 'pages/RecoveryPassword'
import Account from 'pages/Account'
import AccountEdit from 'pages/AccountEdit'
import NotFound from 'pages/NotFound'
import { loadAppDataThunk } from 'store/thunk'
import Layout from 'components/partial/Layout'

const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    const appLoading: boolean = useSelector((state: RootState) => state.appLoading)

    useEffect(() => {
        dispatch(loadAppDataThunk())
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="activate/:id" element={<ActivateAccount />} />
                    <Route path="recovery" element={<RecoveryPassword />} />
                    {userInfo && <>
                        <Route
                            path="account/edit"
                            element={userInfo ? (
                                <AccountEdit />
                            ) : (
                                <Navigate to="/login" />
                            )}
                        />
                        <Route
                            path="account"
                            element={userInfo ? (
                                (userInfo?.cockatiel && userInfo?.nick) ? (
                                    <Account />
                                ) : (
                                    <Navigate to="/account/edit" />
                                )
                            ) : (
                                <Navigate to="/login" />
                            )}
                        />
                    </>}
                    {!appLoading && (
                        <Route
                            path="/"
                            element={<Navigate to={userInfo ? '/account' : '/login'} />}
                        />
                    )}
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
