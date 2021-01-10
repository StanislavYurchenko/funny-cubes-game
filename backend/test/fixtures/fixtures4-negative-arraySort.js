module.exports = [
  {
    name: 'Array sort. Incorrect type of first argument - object',
    input: {
      arr1: {},
      arr2: [2, 1, 4, 3, 9, 6],
    },
    expected: {
      output:
        'Invalid type of argument "[object Object]" is in the function! Available type is "array"',
    },
  },
  {
    name: 'Array sort. Incorrect type of second argument - boolean',
    input: {
      arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
      arr2: true,
    },
    expected: {
      output: 'Invalid type of argument "true" is in the function! Available type is "array"',
    },
  },
  {
    name: 'Array sort',
    input: {
      arr1: [2, 1, 4, 3, 9, 6],
      arr2: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
    },
    expected: {
      output: 'Invalid length of the arrays! First array should be longe then second',
    },
  },
  ,
  {
    name: 'Array sort. There are no argument',
    expected: {
      output: 'Invalid type of argument "undefined" is in the function! Available type is "array"',
    },
  },
];
