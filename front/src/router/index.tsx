import React from 'react'
import { useEffect, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import type { RootState, AppDispatch } from 'store'
import { addAppLoading, removeAppLoading, disableInitLoading } from 'store/actions'
import Layout from 'components/partial/Layout'

const LoginPage = lazy(() => import('pages/LoginPage'))
const SignUpPage = lazy(() => import('pages/SignUpPage'))
const ActivateAccountPage = lazy(() => import('pages/ActivateAccountPage'))
const RecoveryPasswordPage = lazy(() => import('pages/RecoveryPasswordPage'))
const AccountPage = lazy(() => import('pages/AccountPage'))
const AccountEditPage = lazy(() => import('pages/AccountEditPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))
const BattlefieldPage = lazy(() => import('pages/BattlefieldPage'))

const Fallback = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(addAppLoading())
        return () => {
            dispatch(removeAppLoading())
        }
    }, [])
    return <span />
}

const suspenseHOC = (Component: React.FC) => {
    return (
        <Suspense fallback={<Fallback />}>
            <Component />
        </Suspense>
    )
}

const Router: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    const appLoading: number = useSelector((state: RootState) => state.appLoading)
    const initLoading: boolean = useSelector((state: RootState) => state.initLoading)

    useEffect(() => {
        dispatch(disableInitLoading())
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="login" element={suspenseHOC(LoginPage)} />
                    <Route path="signup" element={suspenseHOC(SignUpPage)} />
                    <Route path="activate/:id" element={suspenseHOC(ActivateAccountPage)} />
                    <Route path="recovery" element={suspenseHOC(RecoveryPasswordPage)} />
                    <Route path="account/edit" element={suspenseHOC(AccountEditPage)} />
                    <Route path="account" element={suspenseHOC(AccountPage)} />
                    <Route path="battlefield" element={suspenseHOC(BattlefieldPage)} />
                    {(!initLoading && appLoading === 0) && (
                        <Route
                            path="/"
                            element={
                                <Navigate to={userInfo ? '/account' : '/login'} />
                            }
                        />
                    )}
                    <Route path='*' element={suspenseHOC(NotFoundPage)} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default Router