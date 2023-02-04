const client = require('../_helpers/get-mongo')
const mongodb = require('mongodb')
// const ObjectId = require(mongodb).ObjectID

const authenticate = async (user) => {
    const userFullInfo = await getUser(user.email)
    console.log(userFullInfo, 'userFullInfo')
    const response = { error: null, responseBody: null }
    if (userFullInfo && userFullInfo.isActive) {
        const { _id, password, email } = userFullInfo
        response.responseBody = { _id, auth: Buffer.from(`${email}:${password}`).toString('base64') }
    } else if (userFullInfo && !userFullInfo.isActive) {
        response.error = 'Пользователь неактивный'
    } else {
        response.error = 'Неверный пароль и/или почта'
    }

    return response
}

const createUser = async (user) => {
    try {
        await client.connect()
        const usersCollection = client.db('cockatieldzillas').collection('users')
        const userFromDB = await usersCollection.find({ email: user.email }).toArray()
        let response = { error: null, responseBody: null }
        if (userFromDB.length) {
            response.error = `Пользователь с почтой ${user.email} уже существует`
        } else {
            const result = await usersCollection.insertOne({
                email: user.email,
                password: Buffer.from(user.password, 'base64').toString(),
                isActive: false,
                cockatiel: null,
                nick: null
            })
            const createdUser = await usersCollection.find({ _id: result.insertedId }).toArray()
            response = {
                ...response,
                responseBody: {
                    ...createdUser[0]
                }
            }
        }
        return response
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }

}

const activateUser = async id => {
    try {
        await client.connect()
        const usersCollection = client.db('cockatieldzillas').collection('users')
        const res = await usersCollection.updateOne(
            { _id: new mongodb.ObjectId(id) },
            { $set: { "isActive": true } },
            { upsert: false }
        )
        if (res.modifiedCount === 0) {
            throw (new Error('modifiedCount === 0'))
        }

        await client.close()
        return res
    } catch (err) {
        if (err.message === 'Argument passed in must be a string of 12 bytes or a string of 24 hex characters' || err.message === '') {
            throw (new Error('Некорректная ссылка'))
        }
        console.log(err.message)
    } finally {
        await client.close()
    }
    // return response
}

const getUser = async email => {
    try {
        await client.connect()
        const usersCollection = client.db('cockatieldzillas').collection('users')
        const response = await usersCollection.findOne(
            { email, isActive: true }
        )
        return response
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
}

module.exports = {
    authenticate,
    createUser,
    activateUser,
    getUser
}
// dGVzdDp1bmRlZmluZWQ%3D