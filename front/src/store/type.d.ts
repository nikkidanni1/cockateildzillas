interface IReducerState {
    userInfo: UserInfo,
    notifications: Array<NotificationMessage>,
    musicVolume: number,
    soundVolume: number,
    appLoading: boolean,
    appConstants: AppConstants | null
}

type Action<T> = {
    type: string,
    payload: T
}