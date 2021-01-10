module.exports = [
  {
    name: 'Find index. There are no arguments',
    expected: {
      output: 'Invalid type of argument "undefined" is in the function! Available type is "array"',
    },
  },
  {
    name: 'Find index. Invalid type of element is in the array',
    input: {
      nums: [1, 3, 5, '6'],
      target: 2,
    },
    expected: {
      output: 'Invalid type of element "6" is in the array! Available type is "number"',
    },
  },
  {
    name: 'Find index. Invalid type of element is in second argument',
    input: {
      nums: [1, 3, 5, 6],
      target: '7',
    },
    expected: {
      output: 'Invalid type of argument "7" is in the function! Available type is "number"',
    },
  },
  {
    name: 'Find index. Invalid type of element is in second argument',
    input: {
      nums: '[1, 3, 5, 6]',
      target: 7,
    },
    expected: {
      output:
        'Invalid type of argument "[1, 3, 5, 6]" is in the function! Available type is "array"',
    },
  },
];
