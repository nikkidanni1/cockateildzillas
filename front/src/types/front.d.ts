declare type LoginForm = {
    email: string,
    password: string,
}

declare type SignUpForm = {
    email: string,
    password: string
}

declare type AccountEditFormFields = {
    nickname: string,
    cockatielName: string
}

declare type TabItem<T> = {
    label: string | React.ReactNode,
    value: T
}

declare type ErrorParams = {
    min?: number,
    max?: number
}

interface NotificationMessage {
    id: string,
    text: string,
    mode: 'error' | 'info'
}

declare module '*.ogg';