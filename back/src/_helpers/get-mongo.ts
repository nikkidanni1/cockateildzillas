import { MongoClient } from 'mongodb'

const client = new MongoClient(
    process.env.APP_MODE === 'production' ? 
        'mongodb+srv://nikkidanni1:C6tfNMZm0uBAls54@cockatieldzillas.5ibxqao.mongodb.net/?retryWrites=true&w=majority' 
            : 'mongodb://0.0.0.0:27017'
)
const cliectConnection = client.connect()

client.on('close', async () => {
    await client.connect()
});

client.on('error', async (err) => {
    console.log((err as Error).message)
    await client.connect()
});

export default cliectConnection