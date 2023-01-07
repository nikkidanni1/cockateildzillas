import TYPES from './types'

export const setUserInfo: SetUserInfo = (payload) => {
    return {
        type: TYPES.SET_USER_INFO, payload
    }
}

export const setError: SetErrorAction = (payload) => {
    return {
        type: TYPES.SET_ERROR, payload
    }
}

export const setNotifyMessage: SetNotifyMessage = (payload) => {
    return {
        type: TYPES.SET_NOTIFY_MESSAGE, payload
    }
}

export const setMusicVolume: SetMusicVolume = (payload) => {
    return {
        type: TYPES.SET_MUSIC_VOLUME, payload
    }
}

export const setSoundVolume: SetSoundVolume = (payload) => {
    return {
        type: TYPES.SET_SOUND_VOLUME, payload
    }
}

export const setAppLoading: SetAppLoading = (payload) => {
    return {
        type: TYPES.SET_APP_LOADING, payload
    }
}

export const setAppContants: SetAppContants = (payload) => {
    return {
        type: TYPES.SET_APP_CONTANTS, payload
    }
}