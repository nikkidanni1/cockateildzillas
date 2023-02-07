import TYPES from './types'

export const setUserInfo = (payload: UserInfo): Action<UserInfo> => {
    return {
        type: TYPES.SET_USER_INFO, payload
    }
}

export const addNotification = (payload: NotificationMessage): Action<NotificationMessage> => {
    return {
        type: TYPES.ADD_NOTIFICATION, payload
    }
}

export const removeNotification = (payload: string): Action<string> => {
    return {
        type: TYPES.REMOVE_NOTIFICATION, payload
    }
}

export const setMusicVolume = (payload: number): Action<number> => {
    return {
        type: TYPES.SET_MUSIC_VOLUME, payload
    }
}

export const setSoundVolume = (payload: number): Action<number> => {
    return {
        type: TYPES.SET_SOUND_VOLUME, payload
    }
}

export const setAppLoading = (payload: boolean): Action<boolean> => {
    return {
        type: TYPES.SET_APP_LOADING, payload
    }
}

export const setAppContants = (payload: AppConstants): Action<AppConstants> => {
    return {
        type: TYPES.SET_APP_CONTANTS, payload
    }
}