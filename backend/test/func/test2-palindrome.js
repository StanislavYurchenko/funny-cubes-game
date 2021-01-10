const fixturesPositive = require('../fixtures/fixtures2-positive-palindrome.js');
const fixturesNegative = require('../fixtures/fixtures2-negative-palindrome.js');
const test = require('../test.js');

test('Route: "api/tasks/palindrome". Positive.', fixturesPositive, 'api/tasks/palindrome');

test('Route: "api/tasks/palindrome". Negative.', fixturesNegative, 'api/tasks/palindrome');
