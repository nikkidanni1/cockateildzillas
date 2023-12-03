import type { Collection, WithId, UpdateResult, InsertOneResult, DeleteResult } from 'mongodb'
import { ObjectId } from 'mongodb'
import type { NextFunction } from 'express'
import client from '_helpers/get-mongo'
import { getCockatiel } from 'cockatiels/cockatiel.service'

export const getUser = async (filter: Partial<UserInfoDB>, next: NextFunction) => {
    try {
        const connectedClient = await client
        const usersCollection: Collection<WithId<UserInfoDB>> = connectedClient.db('cockatieldzillas').collection('users')
        const response: WithId<UserInfoDB> | null = await usersCollection.findOne(filter)
        return response
    } catch (err) {
        next(err)
        console.error(err)
    }
}

export const getUserInfo = async (filter: Partial<UserInfoDB>, next: NextFunction) => {
    try {
        const connectedClient = await client
        const usersCollection: Collection<WithId<UserInfoDB>> = connectedClient.db('cockatieldzillas').collection('users')
        let response: WithId<UserInfoDB> | WithId<UserInfo> | null = await usersCollection.findOne(filter)

        if (response) {
            const { cockatielId, password, ...restUserInfo } = response
            const cockatiel: Cockatiel | null = cockatielId ? await getCockatiel({ _id: cockatielId }, next) : null
            const resposeUserInfo: WithId<UserInfo> = { ...restUserInfo, cockatiel }
            response = resposeUserInfo
        }

        return response
    } catch (err) {
        next(err)
        console.error(err)
    }
}

export const getUsers = async (skip: number, limit: number, next: NextFunction) => {
    try {
        const connectedClient = await client
        const usersCollection: Collection<WithId<UserInfoDB>> = connectedClient.db('cockatieldzillas').collection('users')
        const count = await usersCollection.countDocuments({});
        const users: WithId<UserInfoDB>[] = await usersCollection.find().skip(skip).limit(limit).toArray()
        const data: WithId<UserInfo>[] = await Promise.all(users.map(async user => {
            const { cockatielId, password, ...restUser } = user
            const cockatiel: Cockatiel | null = cockatielId ? await getCockatiel({ _id: cockatielId }, next) : null
            return { ...restUser, cockatiel }
        }))
        const result: ListResponse<WithId<UserInfo>> = {
            data,
            count,
        }

        return result
    } catch (err) {
        next(err)
        console.error(err)
    }
}

export const addUser = async (user: UserByAuth, next: NextFunction) => {
    try {
        const connectedClient = await client
        const usersCollection: Collection<WithId<UserInfoDB>> = connectedClient.db('cockatieldzillas').collection('users')
        const result: InsertOneResult = await connectedClient.db('cockatieldzillas').collection('users').insertOne({
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
    }
}

export const updateUser = async (_id: ObjectId, data: Partial<UserInfoDB>, next: NextFunction) => {
    try {
        const connectedClient = await client
        const usersCollection: Collection<WithId<UserInfoDB>> = connectedClient.db('cockatieldzillas').collection('users')
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
    }
}

export const deleteUser = async (_id: ObjectId, next: NextFunction) => {
    try {
        const connectedClient = await client
        const result: DeleteResult = await connectedClient.db('cockatieldzillas').collection('users').deleteOne({ _id })
        return result.deletedCount > 0
    } catch (err) {
        next(err)
        console.error(err)
    }
}

export const activateUser = async (id: string, next: NextFunction) => {
    try {
        const connectedClient = await client
        const usersCollection: Collection<WithId<UserInfoDB>> = connectedClient.db('cockatieldzillas').collection('users')
        const updateResult: UpdateResult = await usersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { "isActive": true } },
            { upsert: false }
        )

        if (updateResult.modifiedCount === 0) {
            next(new Error('modifiedCount === 0'))
        }

        return !!updateResult.modifiedCount
    } catch (err: unknown) {
        if (err instanceof Error) {
            if (err.message === 'Argument passed in must be a string of 12 bytes or a string of 24 hex characters' || err.message === '') {
                next(new Error('Некорректная ссылка'))
            }
            console.error(err.message)
        }
    }
}

export const increaseBattleCount = async (_id: ObjectId, isWin: boolean, next: NextFunction) => {
    try {
        const connectedClient = await client
        const usersCollection: Collection<WithId<UserInfoDB>> = connectedClient.db('cockatieldzillas').collection('users')
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
    }
}
// dGVzdDp1bmRlZmluZWQ%3D