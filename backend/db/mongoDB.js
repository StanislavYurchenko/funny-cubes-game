const MongoClient = require('mongodb').MongoClient;
// const MONGO_DB_URL = 'mongodb://mongo:27017/docker-node-mongo';
const MONGO_DB_URL = 'mongodb://localhost:27017/';
const mongoClient = new MongoClient(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const start = async () => {
  try {
    const client = await mongoClient.connect();
    const db = client.db('funny-cubes-game');
    users = db.collection('users');
    results = db.collection('results');
    await users.createIndex({ login: 1 }, { unique: true });

    app.listen(PORT, () => {
      console.log(`Go to page http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log('in4');
    console.log(error);
  }
};

module.exports = start;
