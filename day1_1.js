const fs = require("fs");
const assert = require("assert");

const input = fs
  .readFileSync(`./day1.txt`, "utf8")
  .trim()
  .split("\n")
  .map(v => parseInt(v, 10));

// Solution

const requiredFuel = mass => Math.floor(mass / 3) - 2;
const sum = (acc, v) => acc + v;
const solve = v => v.map(requiredFuel).reduce(sum, 0);

// Tests

assert.strictEqual(solve([12]), 2);
assert.strictEqual(solve([14]), 2);
assert.strictEqual(solve([1969]), 654);
assert.strictEqual(solve([100756]), 33583);

console.log("Solution:", solve(input)); // 3254441
