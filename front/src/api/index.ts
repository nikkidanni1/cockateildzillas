import { addSubColorsToAppearanceData } from 'helpers/utils'

const baseUrl: string = process.env.NODE_ENV === 'production' ? 'https://cockatieldzillas.onrender.com' : 'http://localhost:3001'

type AuthParams = {
    email: string,
    password: string
}

export const authenticate = async ({ email, password }: AuthParams) => {
    const auth: string = window.btoa(`${email}:${password}`)
    return fetch(`${baseUrl}/authenticate`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ auth }),
        credentials: 'include',
        mode: 'cors'
    }).then(res => res.json())
}

export const signup = ({ email, password }: AuthParams) => (
    fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ email, password: window.btoa(password) }),
        credentials: 'include',
        mode: 'cors'
    }).then(res => res.json())
)

export const activateUser = (hash: string) => (
    fetch(`${baseUrl}/activateUser/${hash}`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        credentials: 'include',
        mode: 'cors'
    }).then(res => res.json())
)

export const recovery = ({ email }: Pick<AuthParams, 'email'>) => (
    fetch(`${baseUrl}/recovery`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ email }),
        credentials: 'include',
        mode: 'cors'
    }).then(res => res.json())
)

export const getAppContants = async () => (
    fetch(`${baseUrl}/getAppContants`, {
        method: 'GET',
        headers: new Headers({ 'content-type': 'application/json' }),
        credentials: 'include',
        mode: 'cors'
    }).then(res => res.json())
)

export const getUserInfo = async (appConstants: AppConstants | null) => {
    const response: ServerResponse<UserInfo> = await fetch(`${baseUrl}/api/userInfo`, {
        method: 'GET',
        headers: new Headers({
            'content-type': 'application/json',
            'authorization': localStorage.getItem('auth') ?? ''
        }),
        credentials: 'include',
        mode: 'cors',
    }).then(res => res.json())

    if (response.responseBody?.cockatiel?.appearanceData && appConstants) {
        response.responseBody.cockatiel.appearanceData = addSubColorsToAppearanceData(
            response.responseBody.cockatiel?.appearanceData, 
            appConstants
        )
    }

    return response
}

export const updateUserInfo = async (userInfo: Partial<UserInfo>, appConstants: AppConstants) => {
    const response: ServerResponse<UserInfo> = await fetch(`${baseUrl}/api/userInfo`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json',
            'authorization': localStorage.getItem('auth') ?? ''
        }),
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(userInfo),
    }).then(res => res.json())

    if (response.responseBody?.cockatiel?.appearanceData && appConstants) {
        response.responseBody.cockatiel.appearanceData = addSubColorsToAppearanceData(
            response.responseBody.cockatiel?.appearanceData, 
            appConstants
        )
    }

    return response
}

export const getBattle = async () => {
    const response: ServerResponse<Battle> = await fetch(`${baseUrl}/api/battle`, {
        method: 'GET',
        headers: new Headers({
            'content-type': 'application/json',
            'authorization': localStorage.getItem('auth') ?? ''
        }),
        credentials: 'include',
        mode: 'cors',
    }).then(res => res.json())

    return response
}

export const moveBattle = async (hit: number) => {
    const response: ServerResponse<Battle> = await fetch(`${baseUrl}/api/moveBattle`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
            'authorization': localStorage.getItem('auth') ?? ''
        }),
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ hit })
    }).then(res => res.json())

    return response
}

export const recreateBattle = async () => {
    const response: ServerResponse<Battle> = await fetch(`${baseUrl}/api/recreateBattle`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
            'authorization': localStorage.getItem('auth') ?? ''
        }),
        credentials: 'include',
        mode: 'cors',
    }).then(res => res.json())

    return response
}