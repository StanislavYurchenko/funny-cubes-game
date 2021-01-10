const validation = require("./argumentValidation.js");

const OPENED_BRACKETS = ['{', '[', '('];
const CLOSED_BRACKETS = ['}', ']', ')'];

const options = {
  argumentType: 'stringOfBrackets',
  availableBrackets:[...OPENED_BRACKETS, ...CLOSED_BRACKETS].join('')
}

module.exports = function (str) {
  validation(options, ...arguments);

  const stack = [];
  let isBracketsPair = true;  
  
  str
    .split('')
    .forEach(element => {  
      if (OPENED_BRACKETS.includes(element)) {
          stack.push(element);
      } else if (CLOSED_BRACKETS.includes(element)) {
        if (OPENED_BRACKETS.indexOf(stack.pop()) !== CLOSED_BRACKETS.indexOf(element)) {
          isBracketsPair = false;
        };
      } 
    });
  
  return stack.length === 0 && isBracketsPair;
}


