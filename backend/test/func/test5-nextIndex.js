const fixturesPositive = require('../fixtures/fixtures5-positive-nextIndex.js');
const fixturesNegative = require('../fixtures/fixtures5-negative-nextIndex.js');
const test = require('../test.js');

test(
  'Route: "api/tasks/nextIndex". Positive.',
  fixturesPositive,
  'api/tasks/nextIndex',
  'deepEqual',
);

test(
  'Route: "api/tasks/nextIndex". Negative.',
  fixturesNegative,
  'api/tasks/nextIndex',
  'deepEqual',
);
