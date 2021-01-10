module.exports = [
  {
    name: 'Roman number',
    input: 'III',
    expected: {
      output: 3,
      statusCode: '404',
      errorMessage: 'text',
    },
  },
  {
    name: 'Roman number',
    input: 'VI',
    expected: {
      output: 6,
      statusCode: '404',
      errorMessage: 'text',
    },
  },
  {
    name: 'Roman number',
    input: 'V',
    expected: {
      output: 5,
      statusCode: '404',
      errorMessage: 'text',
    },
  },
  {
    name: 'Roman number',
    input: 'IX',
    expected: {
      output: 9,
      statusCode: '404',
      errorMessage: 'text',
    },
  },
  {
    name: 'Roman number',
    input: 'LVIII',
    expected: {
      output: 58,
      statusCode: '404',
      errorMessage: 'text',
    },
  },
  {
    name: 'Roman number',
    input: 'MCMXCIV',
    expected: {
      output: 1994,
      statusCode: '404',
      errorMessage: 'text',
    },
  },
];
