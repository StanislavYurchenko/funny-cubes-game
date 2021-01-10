module.exports = [
  {
    name: 'Roman number. Unavailable symbols',
    input: {
      input: 'IIIA',
    },
    expected: {
      output: 'Invalid roman number "IIIA" in the function! Available symbols is "IVXLCDM"',
    },
  },
  {
    name: 'Roman number. Incorrect roman number',
    input: {
      input: 'VIIIII',
    },
    expected: {
      output: 'Invalid roman number "VIIIII" in the function! Available symbols is "IVXLCDM"',
    },
  },
  {
    name: 'Roman number. Incorrect body - undefined',
    input: {
      input: undefined,
    },
    expected: {
      output: 'Type of "undefined" is invalid in the function argument! Available type: "string"',
    },
  },
  {
    name: 'Roman number. Incorrect body - null',
    input: {
      input: null,
    },
    expected: {
      output: 'Type of "object" is invalid in the function argument! Available type: "string"',
    },
  },
  {
    name: 'Roman number. No body',
    expected: {
      output: 'Type of "undefined" is invalid in the function argument! Available type: "string"',
    },
  },
];
