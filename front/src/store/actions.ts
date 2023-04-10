import TYPES from './types'

export const setUserInfo = (payload: UserInfo): ActionWithPayload<UserInfo> => {
    return {
        type: TYPES.SET_USER_INFO, payload
    }
}

export const addNotification = (payload: NotificationMessage): ActionWithPayload<NotificationMessage> => {
    return {
        type: TYPES.ADD_NOTIFICATION, payload
    }
}

export const removeNotification = (payload: string): ActionWithPayload<string> => {
    return {
        type: TYPES.REMOVE_NOTIFICATION, payload
    }
}

export const setMusicVolume = (payload: number): ActionWithPayload<number> => {
    return {
        type: TYPES.SET_MUSIC_VOLUME, payload
    }
}

export const setSoundVolume = (payload: number): ActionWithPayload<number> => {
    return {
        type: TYPES.SET_SOUND_VOLUME, payload
    }
}

export const addAppLoading = (): Action => {
    return {
        type: TYPES.ADD_APP_LOADING
    }
}

export const removeAppLoading = (): Action => {
    return {
        type: TYPES.REMOVE_APP_LOADING
    }
}

export const disableInitLoading = (): Action => {
    return {
        type: TYPES.DISABLE_INIT_LOADING
    }
}

export const setAppContants = (payload: AppConstants): ActionWithPayload<AppConstants> => {
    return {
        type: TYPES.SET_APP_CONTANTS, payload
    }
}