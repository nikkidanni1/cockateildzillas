import type { Collection, WithId, ObjectId, InsertOneResult, DeleteResult } from 'mongodb'
import type { NextFunction } from 'express'
import APP_CONSTANTS from 'app-constants'
import client from '_helpers/get-mongo'

export const getBattle = async (filter: Partial<WithId<Battle>>, next: NextFunction) => {
    try {
        const connectedClient = await client
        const battles: Collection<WithId<Battle>> = connectedClient.db('cockatieldzillas').collection('battles')
        const response: WithId<Battle> | null = await battles.findOne(filter)
        return response
    } catch (err) {
        next(err)
        console.error(err)
    }
}

export const updateBattle = async (_id: ObjectId, data: Partial<Battle>, next: NextFunction) => {
    try {
        const connectedClient = await client
        const battles: Collection<WithId<Battle>> = connectedClient.db('cockatieldzillas').collection('battles')
        await battles.updateOne(
            { _id }, 
            { $set: data }, 
            { upsert: false }
        )

        const updatedBattle: WithId<Battle> | null = await battles.findOne({ _id })
        return updatedBattle
    } catch (err) {
        next(err)
        console.error(err)
    }
}

export const addBattle = async (cockatielId: ObjectId, next: NextFunction) => {
    try {
        const connectedClient = await client
        const battles: Collection<WithId<Battle>> = connectedClient.db('cockatieldzillas').collection('battles')
        const result: InsertOneResult = await connectedClient.db('cockatieldzillas').collection('battles').insertOne({ 
            cockatielId, 
            health: APP_CONSTANTS.maxHealth, 
            healthAdversary: APP_CONSTANTS.maxHealth,
        })

        const createdBattle: WithId<Battle> | null = await battles.findOne({ _id: result.insertedId })
        return createdBattle
    } catch (err) {
        next(err)
        console.error(err)
    }
}

export const deleteBattle = async (_id: ObjectId, next: NextFunction) => {
    try {
        const connectedClient = await client
        const result: DeleteResult = await connectedClient.db('cockatieldzillas').collection('battles').deleteOne({ _id })
        return result.deletedCount > 0
    } catch (err) {
        next(err)
        console.error(err)
    }
}