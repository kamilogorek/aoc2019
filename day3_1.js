const fs = require("fs");
const assert = require("assert");

// Solution

const solve = input => {
  const [line1, line2] = input
    .trim()
    .split("\n")
    .map(line => line.split(`,`));

  const visited = new Set();
  const crosses = new Set();
  let pos = [0, 0];

  for (let seq of line1) {
    const op = seq[0];
    const dist = parseInt(seq.slice(1), 10);

    switch (op) {
      case "R":
        for (let i = 0; i < dist; i++) {
          pos[0] += 1;
          visited.add(pos.join(","));
        }
        break;
      case "L":
        for (let i = 0; i < dist; i++) {
          pos[0] -= 1;
          visited.add(pos.join(","));
        }
        break;
      case "U":
        for (let i = 0; i < dist; i++) {
          pos[1] += 1;
          visited.add(pos.join(","));
        }
        break;
      case "D":
        for (let i = 0; i < dist; i++) {
          pos[1] -= 1;
          visited.add(pos.join(","));
        }
        break;
    }
  }

  pos = [0, 0];

  for (let seq of line2) {
    const op = seq[0];
    const dist = parseInt(seq.slice(1), 10);

    switch (op) {
      case "R":
        for (let i = 0; i < dist; i++) {
          pos[0] += 1;
          if (visited.has(pos.join(","))) {
            crosses.add(pos.join(","));
          }
        }
        break;
      case "L":
        for (let i = 0; i < dist; i++) {
          pos[0] -= 1;
          if (visited.has(pos.join(","))) {
            crosses.add(pos.join(","));
          }
        }
        break;
      case "U":
        for (let i = 0; i < dist; i++) {
          pos[1] += 1;
          if (visited.has(pos.join(","))) {
            crosses.add(pos.join(","));
          }
        }
        break;
      case "D":
        for (let i = 0; i < dist; i++) {
          pos[1] -= 1;
          if (visited.has(pos.join(","))) {
            crosses.add(pos.join(","));
          }
        }
        break;
    }
  }

  return Math.min(
    ...Array.from(crosses).map(cross => {
      const [x, y] = cross.split(",");
      return Math.abs(x) + Math.abs(y);
    })
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
