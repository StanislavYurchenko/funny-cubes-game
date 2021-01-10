const validation = require("./argumentValidation.js");

  const ROMAN_NUMBERS = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
}
  
const options = {
  argumentType: 'stringOfRomanNumbers',
  romanNumbers: Object.keys(ROMAN_NUMBERS).join('')
}

module.exports = function(number) { 
  validation(options, ...arguments);

  return number
    .toUpperCase()
    .split('')
    .reduce((accumulator, number, index, numbers) => {
      const currentValue = ROMAN_NUMBERS[number];
      const nextValue = ROMAN_NUMBERS[numbers[index + 1]];

      return currentValue >= nextValue || !nextValue
        ? accumulator + currentValue
        : accumulator - currentValue   
    }, 0)
}


