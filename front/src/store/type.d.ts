interface IReducerState {
    userInfo: UserInfo,
    notifications: Array<NotificationMessage>,
    musicVolume: number,
    soundVolume: number,
    appLoading: number,
    initLoading: boolean,
    appConstants: AppConstants | null,
    activeBattle: Battle
}

type ActionWithPayload<T> = {
    type: string,
    payload: T
}

type Action = {
    type: string
}