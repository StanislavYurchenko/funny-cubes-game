module.exports = [
  {
    name: 'Array sort',
    input: {
      arr1:  [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
      arr2: [2, 1, 4, 3, 9, 6]
    },
    expected: {
      output: [2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19],
      statusCode: '404',
      errorMessage:'text',
    },
  },
  {
    name: 'Array sort',
    input: {
      arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
      arr2: [6, 1, 2]
    },
    expected: {
      output: [6, 1, 2, 2, 2, 3, 3, 4, 7, 9, 19],
      statusCode: '404',
      errorMessage:'text',
    },
  }
];