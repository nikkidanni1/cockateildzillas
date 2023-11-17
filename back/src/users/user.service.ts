import type { Collection, WithId, UpdateResult, InsertOneResult, DeleteResult } from 'mongodb'
import { ObjectId } from 'mongodb'
import type { NextFunction } from 'express'
import client from '_helpers/get-mongo'

export const getUser = async (filter: Partial<UserInfoDB>, next: NextFunction) => {
    try {
        await client.connect()
        const usersCollection: Collection<WithId<UserInfoDB>> = client.db('cockatieldzillas').collection('users')
        const response: WithId<UserInfoDB> | null = await usersCollection.findOne(filter)
        return response
    } catch (err) {
        next(err)
        console.error(err)
    } finally {
        await client.close()
    }
}

export const addUser = async (user: UserByAuth, next: NextFunction) => {
    try {
        await client.connect()
        const usersCollection: Collection<WithId<UserInfoDB>> = client.db('cockatieldzillas').collection('users')
        const result: InsertOneResult = await client.db('cockatieldzillas').collection('users').insertOne({
            email: user.email,
            password: Buffer.from(user.password, 'base64').toString(),
            isActive: false,
            cockatielId: null,
            nickname: null,
            battleCounter: 0,
            winCounter: 0,
        })

        const createdUser: WithId<UserInfoDB> | null = await usersCollection.findOne({ _id: result.insertedId })
        return createdUser
    } catch (err) {
        next(err)
        console.error(err)
    } finally {
        await client.close()
    }
}

export const updateUser = async (_id: ObjectId, data: Partial<UserInfoDB>, next: NextFunction) => {
    try {
        await client.connect()
        const usersCollection: Collection<WithId<UserInfoDB>> = client.db('cockatieldzillas').collection('users')
        await usersCollection.updateOne(
            { _id }, 
            { $set: data }, 
            { upsert: false }
        )

        const updatedUser: WithId<UserInfoDB> | null = await usersCollection.findOne({ _id })
        return updatedUser
    } catch (err) {
        next(err)
        console.error(err)
    } finally {
        await client.close()
    }
}

export const deleteUser = async (_id: ObjectId, next: NextFunction) => {
    try {
        await client.connect()
        const result: DeleteResult = await client.db('cockatieldzillas').collection('users').deleteOne({ _id })
        return result.deletedCount > 0
    } catch (err) {
        next(err)
        console.error(err)
    } finally {
        await client.close()
    }
}

export const activateUser = async (id: string, next: NextFunction) => {
    try {
        await client.connect()
        const usersCollection: Collection<WithId<UserInfoDB>> = client.db('cockatieldzillas').collection('users')
        const updateResult: UpdateResult = await usersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { "isActive": true } },
            { upsert: false }
        )

        if (updateResult.modifiedCount === 0) {
            next(new Error('modifiedCount === 0'))
        }

        await client.close()
        return !!updateResult.modifiedCount
    } catch (err: unknown) {
        if (err instanceof Error) {
            if (err.message === 'Argument passed in must be a string of 12 bytes or a string of 24 hex characters' || err.message === '') {
                next(new Error('Некорректная ссылка'))
            }
            console.error(err.message)
        }
    } finally {
        await client.close()
    }
}

export const increaseBattleCount = async (_id: ObjectId, isWin: boolean, next: NextFunction) => {
    try {
        await client.connect()
        const usersCollection: Collection<WithId<UserInfoDB>> = client.db('cockatieldzillas').collection('users')
        const userInfo: WithId<UserInfoDB> | null = await usersCollection.findOne({ _id })
        let wasIncreased = false

        if (userInfo) {
            const data = {
                battleCounter: ++userInfo.battleCounter,
                ...(isWin && { winCounter: ++userInfo.winCounter })
            }
            const updateResult = await usersCollection.updateOne(
                { _id }, 
                { $set: data }, 
                { upsert: false }
            )

            wasIncreased = !updateResult.modifiedCount
        }
              
        return wasIncreased

    } catch (err: unknown) {
        if (err instanceof Error) {
            if (err.message === 'Argument passed in must be a string of 12 bytes or a string of 24 hex characters' || err.message === '') {
                next(new Error('Некорректная ссылка'))
            }
            console.error(err.message)
        }
    } finally {
        await client.close()
    }
}
// dGVzdDp1bmRlZmluZWQ%3D