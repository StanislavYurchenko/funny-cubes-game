const fixturesPositive = require('../fixtures/fixtures4-positive-arraySort.js');
const fixturesNegative = require('../fixtures/fixtures4-negative-arraySort.js');
const test = require('../test.js');

test(
  'Route: "api/tasks/arraySort". Positive.',
  fixturesPositive,
  'api/tasks/arraySort',
  'deepEqual',
);

test(
  'Route: "api/tasks/arraySort". Negative.',
  fixturesNegative,
  'api/tasks/arraySort',
  'deepEqual',
);
