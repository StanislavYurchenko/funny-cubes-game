const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = `mongodb+srv://admin:${DB_PASSWORD}@funny-cubes-game.7mpbk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const startMongooseDb = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = startMongooseDb;
