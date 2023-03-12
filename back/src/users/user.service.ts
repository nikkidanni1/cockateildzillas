import type { Collection, WithId, InsertOneResult, UpdateResult, OptionalId } from 'mongodb'
import { ObjectId } from 'mongodb'
import client from '_helpers/get-mongo'

export const getUser = async (filter: Partial<UserInfo>) => {
    try {
        await client.connect()
        const usersCollection: Collection<WithId<UserInfo>> = client.db('cockatieldzillas').collection('users')
        const response: WithId<UserInfo> | null = await usersCollection.findOne(filter)
        return response
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
}

export const addUser = async (user: UserByAuth) => {
    try {
        await client.connect()
        const usersCollection: Collection<WithId<UserInfo> | OptionalId<UserInfo>> = client.db('cockatieldzillas').collection('users')
        const result: InsertOneResult<OptionalId<UserInfo>> = await usersCollection.insertOne({
            email: user.email,
            password: Buffer.from(user.password, 'base64').toString(),
            isActive: false,
            cockatiel: null,
            nick: null
        })

        const createdUser: WithId<UserInfo> | null = await usersCollection.findOne({ _id: result.insertedId })
        return createdUser
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
        const updateResult: UpdateResult = await usersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { "isActive": true } },
            { upsert: false }
        )

        if (updateResult.modifiedCount === 0) {
            throw (new Error('modifiedCount === 0'))
        }

        await client.close()
        return !!updateResult.modifiedCount
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