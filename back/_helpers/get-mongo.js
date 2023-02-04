const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.APP_MODE === 'production' ? 'mongodb+srv://nikkidanni1:C6tfNMZm0uBAls54@cockatieldzillas.5ibxqao.mongodb.net/?retryWrites=true&w=majority' : 'mongodb://0.0.0.0:27017', { useUnifiedTopology: true })
module.exports = client