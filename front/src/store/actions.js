import TYPES from './types'
import { getUserInfo, getAppContants } from '../api'

export const setUserInfo = (payload) => {
    return {
        type: TYPES.SET_USER_INFO, payload
    }
}

export const setError = (payload) => {
    return {
        type: TYPES.SET_ERROR, payload
    }
}

export const setNotifyMessage = (payload) => {
    return {
        type: TYPES.SET_NOTIFY_MESSAGE, payload
    }
}

export const setMusicVolume = (payload) => {
    return {
        type: TYPES.SET_MUSIC_VOLUME, payload
    }
}

export const setSoundVolume = (payload) => {
    return {
        type: TYPES.SET_SOUND_VOLUME, payload
    }
}

export const setAppLoading = (payload) => {
    return {
        type: TYPES.SET_APP_LOADING, payload
    }
}

export const setAppContants = (payload) => {
    return {
        type: TYPES.SET_APP_CONTANTS, payload
    }
}

export const loadAppData = () => async (dispatch) => {
    dispatch(setAppLoading(true))
    const [user, appContants] = await Promise.all([getUserInfo(), getAppContants()])
    if (user?.responseBody) {
        dispatch(setUserInfo(user.responseBody))
    }
    if (appContants?.responseBody) {
        dispatch(setAppContants(appContants.responseBody))
    }
    dispatch(setAppLoading(false))
}