const fs = require("fs");
const assert = require("assert");

// Solution

const solve = input => {
  const graph = input.reduce(
    (acc, p) => acc.set(...p.split(")").reverse()),
    new Map()
  );

  return Array.from(graph.keys()).reduce((acc, key) => {
    while ((key = graph.get(key))) acc++;
    return acc;
  }, 0);
};

// Tests

assert.strictEqual(solve(["COM)B", "B)C", "C)D", "D)E", "E)F", "B)G", "G)H", "D)I", "E)J", "J)K", "K)L"]), 42); // prettier-ignore

console.log(
  "Solution:",
  solve(fs.readFileSync("./day6.txt", "utf8").split("\n"))
); // 154386
