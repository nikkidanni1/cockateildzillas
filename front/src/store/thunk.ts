import type { Dispatch } from 'redux'
import type { NavigateFunction } from 'react-router-dom'
import _ from 'lodash'
import { 
    getUserInfo, getAppContants, authenticate, recovery, signup, updateUserInfo, getBattle
} from 'api'
import {
    addAppLoading, removeAppLoading, setUserInfo, setAppContants, addNotification, setActiveBattle
} from './actions'

const thunkWrapper = async (func: () => Promise<void>, dispatch: Dispatch) => {
    dispatch(addAppLoading())

    try {
        await func()
    } catch (err) {
        if (err instanceof Error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: err.message,
                mode: 'error'
            }))
            console.error(err)
        }
    } finally {
        dispatch(removeAppLoading())
    }
}

export const loadAppDataThunk = () => async (dispatch: Dispatch) => {
    thunkWrapper(async () => {
        const appContantsResponse: ServerResponse<AppConstants> = await getAppContants()
        const userResponse: ServerResponse<UserInfo> = await getUserInfo(appContantsResponse.responseBody)

        if (appContantsResponse.error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: appContantsResponse.error,
                mode: 'error'
            }))
        }

        if (userResponse.error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: userResponse.error,
                mode: 'error'
            }))
        }

        if (appContantsResponse.responseBody) {
            dispatch(setAppContants(appContantsResponse.responseBody))
        }

        if (userResponse.responseBody) {
            dispatch(setUserInfo(userResponse.responseBody))
        }
    }, dispatch)
}

export const loginThunk = (form: LoginForm, appConstants: AppConstants, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    thunkWrapper(async () => {
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
            const userInfoResponse = await getUserInfo(appConstants)

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
    }, dispatch)
}

export const recoveryThunk = (email: string, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    thunkWrapper(async () => {
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
    }, dispatch)
}

export const signUpThunk = (form: SignUpForm, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    thunkWrapper(async () => {
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
    }, dispatch)
}

export const updateUserInfoThunk = (userInfo: Partial<UserInfo>, appConstants: AppConstants, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    thunkWrapper(async () => {
        const res: ServerResponse<UserInfo> = await updateUserInfo(userInfo, appConstants)

        if (res.error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: res.error,
                mode: 'error'
            }))
        }

        if (res.responseBody) {
            dispatch(setUserInfo(res.responseBody))
            navigate('/account')
        }
    }, dispatch)
    dispatch(addAppLoading())
}

export const getBattleThunk = () => async (dispatch: Dispatch) => {
    thunkWrapper(async () => {
        const res: ServerResponse<Battle> = await getBattle()

        if (res.error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: res.error,
                mode: 'error'
            }))
            return
        }

        if (res.responseBody) {
            dispatch(setActiveBattle(res.responseBody))
        }
    }, dispatch)
}