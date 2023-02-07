import type { Dispatch } from 'redux'
import type { NavigateFunction } from 'react-router-dom'
import _ from 'lodash'
import { 
    getUserInfo, getAppContants, authenticate, recovery, signup 
} from 'api'
import {
    setAppLoading, setUserInfo, setAppContants, addNotification
} from './actions'

export const loadAppDataThunk = () => async (dispatch: Dispatch) => {
    dispatch(setAppLoading(true))

    type ResponseItem<T> = PromiseFulfilledResult<ServerResponse<T | undefined>> | PromiseRejectedResult

    const [
        userResponse,
        appContantsResponse
    ]: [ResponseItem<UserInfo>, ResponseItem<AppConstants>] = await Promise.allSettled(
        [
            getUserInfo(),
            getAppContants()
        ]
    )

    if (appContantsResponse.status === 'rejected' || appContantsResponse.value?.error) {
        dispatch(addNotification({
            id: _.uniqueId(),
            text: 'Fetch AppConstants failed',
            mode: 'error'
        }))
    }
    const user: UserInfo | undefined = userResponse.status === 'rejected' ? undefined : userResponse.value?.responseBody

    const appConstants: AppConstants | undefined = appContantsResponse.status === 'rejected' ? undefined : appContantsResponse.value?.responseBody
    if (user) {
        dispatch(setUserInfo(user))
    }
    if (appConstants) {
        dispatch(setAppContants(appConstants))
    }
    dispatch(setAppLoading(false))
}

export const loginThunk = (form: LoginForm, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    dispatch(setAppLoading(true))
    try {
        const authResponse: ServerResponse<AuthResponse> = await authenticate(form)
        if (authResponse.error) {
            dispatch(addNotification({ 
                id: _.uniqueId(), 
                text: authResponse.error,
                mode: 'error'
            }))
        }
        if (authResponse.responseBody) {
            localStorage.setItem('auth', authResponse.responseBody.auth)
            const userInfoResponse = await getUserInfo()
            if (userInfoResponse.error) {
                dispatch(addNotification({
                    id: _.uniqueId(),
                    text: userInfoResponse.error,
                    mode: 'error'
                }))
            }
            if (userInfoResponse.responseBody) {
                dispatch(setUserInfo(userInfoResponse.responseBody))
            }
            navigate('/account')
        }
    } catch (err) {
        if (err instanceof Error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: err.message,
                mode: 'error'
            }))
            console.log(err)
        }
    }
    dispatch(setAppLoading(false))
}

export const recoveryThunk = (email: string, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    dispatch(setAppLoading(true))
    try {
        const res: ServerResponse<RecoveryResponse> = await recovery({ email })
        if (res.error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: res.error,
                mode: 'error'
            }))
        }
        if (res.responseBody) {
            navigate('/login')
            dispatch(addNotification({
                id: _.uniqueId(),
                text: 'Пароль выслан, пожалуйста, проверьте свою почту',
                mode: 'info'
            }))
        }
    } catch (err) {
        if (err instanceof Error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: err.message,
                mode: 'error'
            }))
            console.log(err)
        }
    }
    dispatch(setAppLoading(false))
}

export const signUpThunk = (form: SignUpForm, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    dispatch(setAppLoading(true))
    try {
        const res = await signup({ email: form.email, password: form.password })
        if (res.error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: res.error,
                mode: 'error'
            }))
        }
        if (res.responseBody) {
            navigate('/login')
            dispatch(addNotification({
                id: _.uniqueId(),
                text: 'Пользователь успешно создан, пожалуйста, проверьте свою почту',
                mode: 'info'
            }))
        }
    } catch (err) {
        if (err instanceof Error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: err.message,
                mode: 'error'
            }))
        }
    }
    dispatch(setAppLoading(false))
}