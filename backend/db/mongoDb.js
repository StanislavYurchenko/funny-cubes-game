// MONGODB
const MongoClient = require('mongodb').MongoClient;
const MONGO_DB_URL = 'mongodb://mongo:27017/docker-node-mongo';
// const MONGO_DB_URL = 'mongodb://localhost:27017/';
const mongoClient = new MongoClient(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let mongoDb;

const startMongoDb = async () => {
  try {
    const client = await mongoClient.connect();
    mongoDb = client.db('funny-cubes-game');
    const users = mongoDb.collection('users');
    const results = mongoDb.collection('results');
    await users.createIndex({ login: 1 }, { unique: true });
  } catch (error) {
    console.log(error);
  }
};

const getUsersCursor = async () => {
  try {
    return await mongoDb.collection('users');
  } catch (error) {
    console.log(error);
  }
};

const getResultsCursor = async () => {
  try {
    return await mongoDb.collection('results');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { startMongoDb, getUsersCursor, getResultsCursor };
