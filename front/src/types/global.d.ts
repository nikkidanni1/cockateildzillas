declare type ServerResponse<T> = {
    error: string | null,
    responseBody: T
}

declare type CockatielPartNames = 'bodyCockatiel' | 'headCockatiel' | 'cheeksCockatiel'
declare type CockatielShades = 'main_color' | 'color_light1' | 'color_dark1' | 'color_outline'
declare type CockatielAppearancePart = Partial<Omit<Record<CockatielShades, string>, 'main_color'>> & { main_color: string }
declare type CockatielAppearanceData = (
    Record<
        CockatielPartNames, 
        CockatielAppearancePart
    >
)

declare type Cockatiel = {
    _id?: string,
    appearanceData: CockatielAppearanceData,
    name: string
} | null

declare type UserInfo = {
    _id: string,
    cockatiel: Cockatiel,
    email: string,
    isActive: boolean,
    nickname: string | null
} | null

declare type CockatielPartInfoItem = {
    name: string,
    colorVariants: Array<string>,
    shades: Array<CockatielShades>
}
declare type CockatielPartInfo = Record<CockatielPartNames, CockatielPartInfoItem>

declare type AppConstants = {
    maxPasswordLength: number,
    minPasswordLength: number,
    maxName: number,
    cockatielPartInfo: CockatielPartInfo,
    cockatielAppearanceDataDefault: CockatielAppearanceData,
    cockatielPartNames: Array<CockatielPartsNames>
}

declare type RecoveryResponse = {
    _id: string
}

declare type AuthResponse = {
    _id: string,
    auth: string
}