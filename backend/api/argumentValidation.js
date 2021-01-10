function stringOfRomanNumbers(options, args) {
  const regexp = '^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$';
  args.forEach(argument => {
    if (typeof argument !== 'string') {
      const errorMessage = `Type of "${typeof argument}" is invalid in the function argument! Available type: "string"`;
      throw new RangeError(errorMessage);
    }

    if (argument.search(regexp) === -1) {
      const errorMessage = `Invalid roman number "${argument}" in the function! Available symbols is "${options.romanNumbers}"`;
      throw new RangeError(errorMessage);
    }
  });
}

function stringOfBrackets(options, args) {
  args.forEach(argument => {
    if (typeof argument !== 'string') {
      const errorMessage = `Type of "${typeof argument}" is invalid in the function argument! Available type is "string"`;
      throw new RangeError(errorMessage);
    }

    const isBracket = argument
      .split('')
      .every(bracket => options.availableBrackets.includes(bracket));

    if (!isBracket) {
      const errorMessage = `Invalid argument "${argument}" in the function! Available symbols is "${options.availableBrackets}"`;
      throw new RangeError(errorMessage);
    }
  });
}

function arrayOfNumbers(args) {
  if (args[0]?.length < args[1]?.length) {
    const errorMessage = `Invalid length of the arrays! First array should be longe then second`;
    throw new Error(errorMessage);
  }

  args.forEach(argument => {
    if (!Array.isArray(argument)) {
      const errorMessage = `Invalid type of argument "${argument}" is in the function! Available type is "array"`;
      throw new TypeError(errorMessage);
    }

    argument.forEach(number => {
      if (typeof number !== 'number') {
        const errorMessage = `Invalid type of element "${number}" is in the array! Available type is "number"`;
        throw new TypeError(errorMessage);
      }
    });
  });
}

function arrayOfNumbersAndNumber(args) {
  if (!Array.isArray(args[0])) {
    const errorMessage = `Invalid type of argument "${args[0]}" is in the function! Available type is "array"`;
    throw new TypeError(errorMessage);
  }

  args[0]?.forEach(number => {
    if (typeof number !== 'number') {
      const errorMessage = `Invalid type of element "${number}" is in the array! Available type is "number"`;
      throw new TypeError(errorMessage);
    }
  });

  if (typeof args[1] !== 'number') {
    const errorMessage = `Invalid type of argument "${args[1]}" is in the function! Available type is "number"`;
    throw new TypeError(errorMessage);
  }
}

function checkTypeOFArguments(options, args) {
  args.some(argument => {
    if (typeof argument !== options.argumentType) {
      const errorMessage = `Invalid type of argument "${typeof argument}" is in the function! Available type is "${
        options.argumentType
      }"`;
      throw new TypeError(errorMessage);
    }
  });
}

module.exports = function () {
  const [options, ...args] = arguments;

  switch (options.argumentType) {
    case 'stringOfRomanNumbers':
      stringOfRomanNumbers(options, args);
      break;

    case 'stringOfBrackets':
      stringOfBrackets(options, args);
      break;

    case 'arrayOfNumbers':
      arrayOfNumbers(args);
      break;

    case 'arrayOfNumbersAndNumber':
      arrayOfNumbersAndNumber(args);
      break;

    default:
      checkTypeOFArguments(options, args);
  }
};
