module.exports = [
  {
    name: 'Find index',
    input: {
      nums: [1, 3, 5, 6],
      target: 5
    },
    expected: {
      output: 2,
      statusCode: '404',
      errorMessage:'text',
    },
  },
  {
    name: 'Find index',
    input: {
      nums: [1, 3, 5, 6],
      target: 2
    },
    expected: {
      output: 1,
      statusCode: '404',
      errorMessage:'text',
    },
  },
  {
    name: 'Find index',
    input: {
      nums: [1, 3, 5, 6],
      target: 7
    },
    expected: {
      output: 4,
      statusCode: '404',
      errorMessage:'text',
    },
  },
  {
    name: 'Find index',
    input: {
      nums: [1, 3, 5, 6],
      target: 0
    },
    expected: {
      output: 0,
      statusCode: '404',
      errorMessage:'text',
    },
  },
  {
    name: 'Find index',
    input: {
      nums: [1],
      target: 0
    },
    expected: {
      output: 0,
      statusCode: '404',
      errorMessage:'text',
    },
  },
];