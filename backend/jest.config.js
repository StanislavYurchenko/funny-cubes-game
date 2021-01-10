const nodemon = require("nodemon");

module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: [
   "**/test/func/**.[tj]s?(x)" 
  ]
};