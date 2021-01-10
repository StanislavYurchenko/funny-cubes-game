module.exports = [
  {
    name: 'Have brackets pair?',
    input: "()",
    expected: {
      output: true,
      statusCode: '404',
      errorMessage:'text',
    },
  },
  {
    name: 'Have brackets pair?',
    input: "{}()[]",
    expected: {
      output: true,
      statusCode: '404',
      errorMessage:'text',
    },
  },
  {
    name: 'Have brackets pair?',
    input: "{[]}",
    expected: {
      output: true,
      statusCode: '404',
      errorMessage:'text',
    },
  },
  {
    name: 'Have brackets pair?',
    input: "(]",
    expected: {
      output: false,
      statusCode: '404',
      errorMessage:'text',
    },
  },
  {
    name: 'Have brackets pair?',
    input: "([)]",
    expected: {
      output: false,
      statusCode: '404',
      errorMessage:'text',
    },
  },
  {
    name: 'Have brackets pair?',
    input: '({(()))}}',
    expected: {
      output: false,
      statusCode: '404',
      errorMessage:'text',
    },
  },
];