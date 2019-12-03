const fs = require("fs");
const assert = require("assert");

// Solution
const solve = input => {
  const visited = new Set();
  const crosses = new Set();
  const grids = [[0, 0], [0, 0]];

  const step = (dir, dist, lineNo) => {
    const grid = grids[lineNo];
    grid[dir] += dist;
    if (lineNo === 0) {
      visited.add(grid.join(","));
    } else if (visited.has(grid.join(","))) {
      crosses.add(grid.join(","));
    }
  };

  const move = (seq, lineNo) => {
    const dist = parseInt(seq.slice(1), 10);
    if (seq[0] === "R") for (let i = 0; i < dist; i++) step(0, 1, lineNo);
    if (seq[0] === "L") for (let i = 0; i < dist; i++) step(0, -1, lineNo);
    if (seq[0] === "U") for (let i = 0; i < dist; i++) step(1, 1, lineNo);
    if (seq[0] === "D") for (let i = 0; i < dist; i++) step(1, -1, lineNo);
  };

  const travel = (line, lineNo) => {
    for (let seq of line) move(seq, lineNo);
  };

  input
    .trim()
    .split("\n")
    .map(line => line.split(`,`))
    .forEach(travel);

  return Math.min(
    ...Array.from(crosses).map(cross =>
      cross
        .split(",")
        .map(x => Math.abs(x))
        .reduce((acc, x) => acc + x)
    )
  );
};

// Tests
assert.strictEqual(
  solve(`R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`),
  159
);
assert.strictEqual(
  solve(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`),
  135
);

console.log("Solution:", solve(fs.readFileSync("./day3.txt", "utf8"))); // 8015
