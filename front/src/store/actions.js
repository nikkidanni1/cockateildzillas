import TYPES from './types'

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