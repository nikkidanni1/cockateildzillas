import type { Collection, WithId, ObjectId, InsertOneResult } from 'mongodb'
import type { NextFunction } from 'express'
import client from '_helpers/get-mongo'

export const getCockatiel = async (filter: Partial<WithId<Cockatiel>>, next: NextFunction) => {
    try {
        const connectedClient = await client
        const cockatiels: Collection<WithId<Cockatiel>> = connectedClient.db('cockatieldzillas').collection('cockatiels')
        const response: WithId<Cockatiel> | null = await cockatiels.findOne(filter)
        return response
    } catch (err) {
        next(err)
        console.error(err)
        return null
    }
}

export const updateCockatiel = async (_id: ObjectId, data: Partial<Cockatiel>, next: NextFunction) => {
    try {
        const connectedClient = await client
        const cockatiels: Collection<WithId<Cockatiel>> = connectedClient.db('cockatieldzillas').collection('cockatiels')
        await cockatiels.updateOne(
            { _id }, 
            { $set: data }, 
            { upsert: false }
        )

        const updatedCockatiel: WithId<Cockatiel> | null = await cockatiels.findOne({ _id })
        return updatedCockatiel
    } catch (err) {
        next(err)
        console.error(err)
        return null
    }
}

export const addCockatiel = async (data: Partial<Cockatiel>, next: NextFunction) => {
    try {
        const connectedClient = await client
        const cockatiels: Collection<WithId<Cockatiel>> = connectedClient.db('cockatieldzillas').collection('cockatiels')
        const result: InsertOneResult = await connectedClient.db('cockatieldzillas').collection('cockatiels').insertOne(data)

        const createdCoockatiel: WithId<Cockatiel> | null = await cockatiels.findOne({ _id: result.insertedId })
        return createdCoockatiel
    } catch (err) {
        next(err)
        console.error(err)
        return null
    }
}