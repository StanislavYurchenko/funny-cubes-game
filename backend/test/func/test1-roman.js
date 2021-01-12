const fixturesPositive = require('../fixtures/fixtures1-positive-roman.js');
const fixturesNegative = require('../fixtures/fixtures1-negative-roman.js');
const fixturesNegativeStatus500 = require('../fixtures/fixtures1-negative-roman-status500.js');
const test = require('../test.js');

test('Route: "api/tasks/roman". Positive.', fixturesPositive, 'api/tasks/roman');

test('Route: "api/tasks/roman". Negative.', fixturesNegative, 'api/tasks/roman');

test(
  'Route: "api/tasks/roman". Negative. Status 500.',
  fixturesNegativeStatus500,
  'api/tasks/roman',
);
