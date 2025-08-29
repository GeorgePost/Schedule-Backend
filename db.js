
const { MongoClient,ServerApiVersion  } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config()
let db;
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function getDb() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.MONGODB_DB || 'schedule'); // choose your DB name
    console.log('✅ MongoDB connected');
  }
  return db;
}

module.exports = { getDb };