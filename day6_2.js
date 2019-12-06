const fs = require("fs");
const assert = require("assert");

// Solution

function getOrbit(point, graph) {
  const orbit = [];
  while (graph.get(point)) {
    point = graph.get(point);
    orbit.push(point);
  }
  return orbit;
}

const solve = input => {
  const graph = input.reduce(
    (acc, p) => acc.set(...p.split(")").reverse()),
    new Map()
  );
  const youOrbit = getOrbit("YOU", graph);
  const sanOrbit = getOrbit("SAN", graph);

  for (let p of youOrbit) {
    if (sanOrbit.includes(p)) {
      return youOrbit.indexOf(p) + sanOrbit.indexOf(p);
    }
  }
};

// Tests

assert.strictEqual(solve(["COM)B", "B)C", "C)D", "D)E", "E)F", "B)G", "G)H", "D)I", "E)J", "J)K", "K)L", "K)YOU", "I)SAN"]), 4); // prettier-ignore

console.log(
  "Solution:",
  solve(fs.readFileSync("./day6.txt", "utf8").split("\n"))
); // 346
