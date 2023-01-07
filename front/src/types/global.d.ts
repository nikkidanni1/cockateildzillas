declare type ServerResponse<T> = {
    error: string | null,
    responseBody: T
}

declare type CockateilPartNames = 'bodyCockateil' | 'headCockateil' | 'cheeksCockateil'
declare type CockateilShades = 'main_color' | 'color_light1' | 'color_dark1' | 'color_outline'
declare type CockateilPartInfoItem = {
    name: string,
    colorVariants: Array<string>,
    shades: Array<CockateilShades>
}
declare type CockateilPartInfo = Record<CockateilPartNames, CockateilPartInfoItem>
declare type CockateilAppearancePart = Partial<Omit<Record<CockateilShades, string>, 'main_color'>> & { main_color: string }
declare type CockateilAppearanceData = (
    Record<
        CockateilPartNames, 
        CockateilAppearancePart
    >
)
declare type CockateilShades = 'main_color' | 'color_light1' | 'color_dark1' | 'color_outline'

declare type Cockateil = {
    appearanceData: CockateilAppearanceData
} | null

declare type UserInfo = {
    _id: string,
    cockateil: Cockateil,
    email: string,
    isActive: boolean,
    nick: string | null
} | null

declare type AppConstants = {
    maxPasswordLength: number,
    minPasswordLength: number,
    maxName: number,
    cockateilPartInfo: CockateilPartInfo,
    cockateilAppearanceDataDefault: CockateilAppearanceData,
    cockateilPartNames: Array<CockateilPartsNames>
}

declare type RecoveryResponse = {
    _id: string
}