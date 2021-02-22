const mongoose = require('mongoose');
const { Schema } = mongoose;

const resultSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
