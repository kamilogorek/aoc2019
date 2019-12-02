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
const recur = (mass, total) => {
  const fuel = requiredFuel(mass);
  return fuel <= 0 ? total : recur(fuel, total + fuel);
};
const solve = i => i.map(v => recur(v, 0)).reduce(sum, 0);

// Tests

assert.strictEqual(solve([14]), 2);
assert.strictEqual(solve([1969]), 966);
assert.strictEqual(solve([100756]), 50346);

console.log("Solution:", solve(input)); // 4878818
