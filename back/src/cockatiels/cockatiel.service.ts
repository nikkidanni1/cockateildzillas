import type { Collection, WithId, InsertOneResult, UpdateResult, OptionalId } from 'mongodb'
import { ObjectId } from 'mongodb'
import client from '_helpers/get-mongo'

export const getCockatiel = async (filter: Partial<WithId<Cockatiel>>) => {
    try {
        await client.connect()
        const cockatiels: Collection<WithId<Cockatiel>> = client.db('cockatieldzillas').collection('cockatiels')
        const response: WithId<Cockatiel> | null = await cockatiels.findOne(filter)
        return response
    } catch (err) {
        console.log(err)
        return null
    } finally {
        await client.close()
    }
}
