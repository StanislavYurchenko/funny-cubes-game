const fixturesPositive = require('../fixtures/fixtures1-positive-roman.js');
const fixturesNegative = require('../fixtures/fixtures1-negative-roman.js');
const test = require('../test.js');

test('Route: "api/tasks/roman". Positive.', fixturesPositive, 'api/tasks/roman');

test('Route: "api/tasks/roman". Negative.', fixturesNegative, 'api/tasks/roman');
