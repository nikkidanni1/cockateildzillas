export const getErrors = (params?: ErrorParams) => ({
    requiredField: 'Обязательное поле',
    minLength: `Минимальное количество символов: ${params?.min}`,
    maxLength: `Максимальное количество символов: ${params?.max}`,
    passwordWithNums: 'Пароль должен содержать хотя бы одну цифру',
    passwordWithLetter: 'Пароль должен содержать хотя бы одну букву',
    passwordIsNotMatch: 'Пароли не совпадают',
    invalidСharacters: 'Недопустымые символы',
    invalidEmail: 'Некорректная почта'
})

export enum ButtonVariant {
    Primary,
    Secondary
}

export const pathWithAuth = ['/account', '/account/edit', '/battlefield']