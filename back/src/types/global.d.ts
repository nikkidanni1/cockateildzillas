declare type ServerResponse<T> = {
    error: string | null,
    responseBody: T
}

declare type UserByAuth = {
    email: string,
    password: string,
}

declare type AuthResponse = {
    auth: string
}

declare type UserInfo = {
    cockatiel: Cockatiel,
    email: string,
    password: string,
    isActive: boolean,
    nick: string | null
}