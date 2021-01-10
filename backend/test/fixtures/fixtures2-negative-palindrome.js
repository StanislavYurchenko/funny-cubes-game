module.exports = [
  {
    name: 'Is palindrome?. Incorrect argument type - string',
    input: {
      input: '121',
    },
    expected: {
      output: 'Invalid type of argument "string" is in the function! Available type is "number"',
    },
  },
  {
    name: 'Is palindrome? Incorrect argument - undefined',
    input: {
      input: undefined,
    },
    expected: {
      output: 'Invalid type of argument "undefined" is in the function! Available type is "number"',
    },
  },
  {
    name: 'Is palindrome? Incorrect argument - argument is empty',
    expected: {
      output: 'Invalid type of argument "undefined" is in the function! Available type is "number"',
    },
  },
];
