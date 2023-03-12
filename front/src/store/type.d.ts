interface IReducerState {
    userInfo: UserInfo,
    notifications: Array<NotificationMessage>,
    musicVolume: number,
    soundVolume: number,
    appLoading: number,
    appConstants: AppConstants | null
}

type ActionWithPayload<T> = {
    type: string,
    payload: T
}

type Action = {
    type: string
}