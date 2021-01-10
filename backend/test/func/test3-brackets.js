const fixturesPositive = require('../fixtures/fixtures3-positive-brackets.js');
const fixturesNegative = require('../fixtures/fixtures3-negative-brackets.js');
const test = require('../test.js');

test('Route: "api/tasks/brackets". Positive.', fixturesPositive, 'api/tasks/brackets');

test('Route: "api/tasks/brackets". Negative.', fixturesNegative, 'api/tasks/brackets');
