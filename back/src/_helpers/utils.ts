export const getUserByAuth = (auth: string): UserByAuth => {
    const [ email, password ] = Buffer.from(auth, 'base64').toString().split(':')
    return { email, password }
}