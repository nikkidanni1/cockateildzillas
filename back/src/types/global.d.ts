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

declare type CockatielPartNames = 'bodyCockatiel' | 'headCockatiel' | 'cheeksCockatiel'
declare type CockatielAppearancePart = { main_color: string }
declare type CockatielAppearanceData = (
    Record<
        CockatielPartNames, 
        CockatielAppearancePart
    >
)

declare type Cockatiel = {
    appearanceData: CockatielAppearanceData,
    name: string
}

declare type UserInfo = {
    cockatiel: Cockatiel | null,
    email: string,
    isActive: boolean,
    nickname: string | null
}

declare type UserInfoDB = {
    cockatielId: ObjectId | null,
    email: string,
    password?: string,
    isActive: boolean,
    nickname: string | null
}