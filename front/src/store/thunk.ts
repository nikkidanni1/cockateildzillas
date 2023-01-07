import type { Dispatch } from 'redux'
import type { RouteComponentProps } from 'react-router-dom'
import { 
    getUserInfo, getAppContants, authenticate, recovery, signup 
} from 'api'
import {
    setAppLoading, setError, setUserInfo, setAppContants, setNotifyMessage
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
        dispatch(setError('Fetch AppConstants failed'))
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

export const loginThunk = (form: LoginForm, history: RouteComponentProps.history) => async (dispatch: Dispatch) => {
    dispatch(setAppLoading(true))
    try {
        const userResponse: ServerResponse<UserInfo> = await authenticate(form)
        if (userResponse.error) {
            dispatch(setError(userResponse.error))
        }
        if (userResponse.responseBody) {
            dispatch(setUserInfo(userResponse.responseBody))
            history.push('/account')
        }
    } catch (err) {
        if (err instanceof Error) {
            dispatch(setError(err.message))
            console.log(err)
        }
    }
    dispatch(setAppLoading(false))
}

export const recoveryThunk = (email: string, history: RouteComponentProps.history) => async (dispatch: Dispatch) => {
    dispatch(setAppLoading(true))
    try {
        const res: ServerResponse<RecoveryResponse> = await recovery({ email })
        if (res.error) {
            dispatch(setError(res.error))
        }
        if (res.responseBody) {
            history.push('/login')
            dispatch(setNotifyMessage('Пароль выслан, пожалуйста, проверьте свою почту'))
        }
    } catch (err) {
        if (err instanceof Error) {
            dispatch(setError(err.message))
            console.log(err)
        }
    }
    dispatch(setAppLoading(false))
}

export const signUpThunk = (form: SignUpForm, history: RouteComponentProps.history) => async (dispatch: Dispatch) => {
    dispatch(setAppLoading(true))
    try {
        const res = await signup({ email: form.email, password: form.password })
        if (res.error) {
            dispatch(setError(res.error))
        }
        if (res.responseBody) {
            history.push('/login')
            dispatch(setNotifyMessage('Пользователь успешно создан, пожалуйста, проверьте свою почту'))
        }
    } catch (err) {
        if (err instanceof Error) {
            dispatch(setError(err.message))
            console.log(err)
        }
    }
    dispatch(setAppLoading(false))
}