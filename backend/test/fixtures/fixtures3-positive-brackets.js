module.exports = [
  {
    name: 'Have brackets pair?',
    input: {
      input: '()',
    },
    expected: {
      output: true,
    },
  },
  {
    name: 'Have brackets pair?',
    input: {
      input: '{}()[]',
    },
    expected: {
      output: true,
    },
  },
  {
    name: 'Have brackets pair?',
    input: {
      input: '{[]}',
    },
    expected: {
      output: true,
    },
  },
  {
    name: 'Have brackets pair?',
    input: {
      input: '(]',
    },
    expected: {
      output: false,
    },
  },
  {
    name: 'Have brackets pair?',
    input: {
      input: '([)]',
    },
    expected: {
      output: false,
    },
  },
  {
    name: 'Have brackets pair?',
    input: {
      input: '({(()))}}',
    },
    expected: {
      output: false,
    },
  },
];
