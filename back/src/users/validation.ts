import APP_CONSTANTS from 'app-constants'

const isValidAppearanceData = (data: CockatielAppearanceData): boolean => {
    const appearanceData: any = data
    let isValid: boolean = true

    if (APP_CONSTANTS.cockatielPartNames.length !== Object.keys(appearanceData).length) {
        isValid = false
    } else {
        APP_CONSTANTS.cockatielPartNames.forEach(part => {
            if (!(part in appearanceData) || !('main_color' in appearanceData[part])
                || Object.keys(appearanceData[part]).length !== 1
            ) {
                isValid = false
            }
        })
    }

    return isValid
}

export const validateUpdateData = (userInfo: Partial<UserInfo>): string => {
    let error: string = ''

    if (!userInfo.nickname || !userInfo.cockatiel?.name || !userInfo.cockatiel?.appearanceData) {
        error = 'Не заполнены обязательные поля'
    } else if (userInfo.nickname.length > APP_CONSTANTS.maxName || userInfo.cockatiel.name.length > APP_CONSTANTS.maxName) {
        error = `Максимальное количество символов полей "Ник" и "Кличка воина": ${APP_CONSTANTS.maxName}`
    } else if (!isValidAppearanceData(userInfo.cockatiel.appearanceData)) {
        error = 'Некорректный формат appearanceData'
    }

    return error
}