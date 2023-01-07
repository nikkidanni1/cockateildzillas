declare type LoginForm = {
    email: string,
    password: string,
}

declare type SignUpForm = {
    email: string,
    password: string
}

declare type AccountEditFormFields = {
    nick: string,
    cockatielNick: string
}

declare type TabItem<T> = {
    label: string,
    value: T
}

declare type ErrorParams = {
    min?: number,
    max?: number
}