const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://0.0.0.0:27017', { useUnifiedTopology: true })

module.exports = client