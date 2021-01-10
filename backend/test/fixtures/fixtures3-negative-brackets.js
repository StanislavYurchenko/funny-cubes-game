module.exports = [
  {
    name: 'Have brackets pair? Incorrect type of argument - object {}',
    input: {},
    expected: {
      output: 'Type of "undefined" is invalid in the function argument! Available type is "string"',
    },
  },
  {
    name: 'Have brackets pair? Incorrect type of argument - object []',
    input: { input: [] },
    expected: {
      output: 'Type of "object" is invalid in the function argument! Available type is "string"',
    },
  },
  {
    name: 'Have brackets pair? Incorrect type of argument - boolean',
    input: { input: true },
    expected: {
      output: 'Type of "boolean" is invalid in the function argument! Available type is "string"',
    },
  },
  {
    name: 'Have brackets pair? There is no argument',
    expected: {
      output: 'Type of "undefined" is invalid in the function argument! Available type is "string"',
    },
  },
];
