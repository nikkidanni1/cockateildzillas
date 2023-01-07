interface IReducerState {
    userInfo: UserInfo
    error: string
    notifyMessage: string
    musicVolume: number
    soundVolume: number
    appLoading: boolean
    appConstants: AppConstants | null
}

type Action = {
    type: string
}

type SetUserInfo = (payload: UserInfo) => Action & {
    payload: UserInfo
}

type SetErrorAction = (payload: string) => Action & {
    payload: string
}

type SetNotifyMessage = (payload: string) => Action & {
    payload: string
}

type SetMusicVolume = (payload: number) => Action & {
    payload: number
}

type SetSoundVolume = (payload: number) => Action & {
    payload: number
}

type SetAppLoading = (payload: boolean) => Action & {
    payload: boolean
}

type SetAppContants = (payload: AppConstants | null) => Action & {
    payload: AppConstants | null
}