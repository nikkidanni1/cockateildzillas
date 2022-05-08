module.exports = {
    getUserByAuth
}

function getUserByAuth (auth) {
    const [ email, password ] = Buffer.from(auth, 'base64').toString().split(':')
    return { email, password }
}