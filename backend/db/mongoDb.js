const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = `mongodb+srv://admin:${DB_PASSWORD}@funny-cubes-game.7mpbk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const mongoClient = new MongoClient(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let mongoDb;

const startMongoDb = async () => {
  try {
    const client = await mongoClient.connect();
    mongoDb = client.db('funny-cubes-game');
    const users = mongoDb.collection('users');
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
