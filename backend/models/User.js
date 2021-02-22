const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
    index: 1,
  },
  password: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  registrationData: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  totalGames: {
    type: Number,
    required: true,
  },
  bestResult: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
