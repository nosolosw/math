/**
 * Node dependencies.
 */
const assert = require("assert");

/**
 * Internal dependencies.
 */
const TOKEN_TYPES = require("../token-types");
const engine = require("../index");

function testSum() {
  assert.deepStrictEqual(engine("2 + 2"), [
    { order: 0, type: TOKEN_TYPES.NUMBER, literal: "2" },
    { order: 1, type: TOKEN_TYPES.SUM, literal: "+" },
    { order: 2, type: TOKEN_TYPES.NUMBER, literal: "2" }
  ]);
  assert.deepStrictEqual(engine("1 * 3"), [
    { order: 0, type: TOKEN_TYPES.NUMBER, literal: "1" },
    { order: 1, type: TOKEN_TYPES.MULTIPLY, literal: "*" },
    { order: 2, type: TOKEN_TYPES.NUMBER, literal: "3" }
  ]);
}

testSum();
