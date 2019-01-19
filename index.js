/**
 * Internal dependencies.
 */
const TOKEN_TYPES = require("./token-types");

/**
 * @param {string} expression Expression to evaluate.
 *
 * @return {Array} List of tokens from expression. Token shape:
 * { order: the order of the token in the expression (0-based number),
 *   type: one of TOKEN_TYPES: 'SUM', 'NUMBER'.
 *   literal: the value of token as it appears on the expression,
 * }
 *
 */
module.exports = function(expression) {
  const tokens = [];
  let index = 0;
  let order = 0;
  const isNumber = char => char !== " " && Number.isInteger(+char);
  while (index <= expression.length) {
    let char = expression.charAt(index);
    if (char === " ") {
      index++;
    } else if (char === "+") {
      tokens.push({ order, type: TOKEN_TYPES.SUM, literal: char });
      index++;
      order++;
    } else if (char === "*") {
      tokens.push({ order, type: TOKEN_TYPES.MULTIPLY, literal: char });
      index++;
      order++;
    } else if (isNumber(char)) {
      let number = char;
      index++;
      char = expression.charAt(index);
      while (isNumber(char) && index <= expression.length) {
        number = number + char;
        index++;
        char = expression.charAt(char);
      }
      tokens.push({ order, type: TOKEN_TYPES.NUMBER, literal: number });
      order++;
    } else {
      throw Error(`Unrecognized ${char} at position ${index}`);
    }
  }
  return tokens;
};
