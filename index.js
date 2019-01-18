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
module.exports = function(input) {
  const tokens = [];
  let position = 0;
  let order = 0;
  const isNumber = char => Number.isInteger(+char);
  const expression = input.replace(/ /g, "");
  while (position <= expression.length) {
    let char = expression.charAt(position);
    if (char === "+") {
      tokens.push({ order, type: TOKEN_TYPES.SUM, literal: char });
      position++;
      order++;
    } else if (isNumber(char)) {
      let number = char;
      position++;
      char = expression.charAt(position);
      while (isNumber(char) && position <= expression.length) {
        number = number + char;
        position++;
        char = expression.charAt(char);
      }
      tokens.push({ order, type: TOKEN_TYPES.NUMBER, literal: number });
      order++;
    }
  }
  return tokens;
};
