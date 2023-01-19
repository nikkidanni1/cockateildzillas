declare type ServerResponse<T> = {
    error: string | null,
    responseBody: T
}

declare type CockatielPartNames = 'bodyCockatiel' | 'headCockatiel' | 'cheeksCockatiel'
declare type CockatielShades = 'main_color' | 'color_light1' | 'color_dark1' | 'color_outline'
declare type CockatielPartInfoItem = {
    name: string,
    colorVariants: Array<string>,
    shades: Array<CockatielShades>
}
declare type CockatielPartInfo = Record<CockatielPartNames, CockatielPartInfoItem>
declare type CockatielAppearancePart = Partial<Omit<Record<CockatielShades, string>, 'main_color'>> & { main_color: string }
declare type CockatielAppearanceData = (
    Record<
        CockatielPartNames, 
        CockatielAppearancePart
    >
)
declare type CockatielShades = 'main_color' | 'color_light1' | 'color_dark1' | 'color_outline'

declare type Cockatiel = {
    appearanceData: CockatielAppearanceData
} | null

declare type UserInfo = {
    _id: string,
    cockatiel: Cockatiel,
    email: string,
    isActive: boolean,
    nick: string | null
} | null

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