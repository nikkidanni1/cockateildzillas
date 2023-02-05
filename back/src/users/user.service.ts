import type { Collection, WithId, InsertOneResult, UpdateResult } from 'mongodb'
import mongodb from 'mongodb'
import client from '_helpers/get-mongo'

export const getUser = async (email: string) => {
    try {
        await client.connect()
        const usersCollection: Collection<WithId<UserInfo>> = client.db('cockatieldzillas').collection('users')
        const response: WithId<UserInfo> | null = await usersCollection.findOne(
            { email, isActive: true }
        )
        return response
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
}

export const authenticate = async (user: UserByAuth) => {
    const userFullInfo: WithId<UserInfo> | null | undefined = await getUser(user.email)

    const response: ServerResponse<WithId<AuthResponse> | null> = { error: null, responseBody: null }
    if (userFullInfo) {
        const { _id, password, email } = userFullInfo
        if (userFullInfo.isActive && _id) {
            response.responseBody = { _id, auth: Buffer.from(`${email}:${password}`).toString('base64') }
        } else if (_id && !userFullInfo.isActive) {
            response.error = 'Пользователь неактивный'
        } else {
            response.error = 'Неверный пароль и/или почта'
        }
    }

    return response
}

export const createUser = async (user: UserByAuth) => {
    try {
        await client.connect()
        const usersCollection: Collection<WithId<UserInfo>> = client.db('cockatieldzillas').collection('users')
        const userFromDB: Array<WithId<UserInfo>> = await usersCollection.find({ email: user.email }).toArray()
        let response: ServerResponse<WithId<UserInfo> | null> = { error: null, responseBody: null }
        if (userFromDB.length) {
            response.error = `Пользователь с почтой ${user.email} уже существует`
        } else {
            const result: InsertOneResult = await usersCollection.insertOne({
                email: user.email,
                password: Buffer.from(user.password, 'base64').toString(),
                isActive: false,
                cockatiel: null,
                nick: null
            })
            const createdUser: Array<WithId<UserInfo>> = await usersCollection.find({ _id: result.insertedId }).toArray()
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

export const activateUser = async (id: string) => {
    try {
        await client.connect()
        const usersCollection: Collection<WithId<UserInfo>> = client.db('cockatieldzillas').collection('users')
        const res: UpdateResult = await usersCollection.updateOne(
            { _id: new mongodb.ObjectId(id) },
            { $set: { "isActive": true } },
            { upsert: false }
        )
        if (res.modifiedCount === 0) {
            throw (new Error('modifiedCount === 0'))
        }

        await client.close()
        return res
    } catch (err: unknown) {
        if (err instanceof Error) {
            if (err.message === 'Argument passed in must be a string of 12 bytes or a string of 24 hex characters' || err.message === '') {
                throw (new Error('Некорректная ссылка'))
            }
            console.log(err.message)
        }
    } finally {
        await client.close()
    }
}
// dGVzdDp1bmRlZmluZWQ%3D