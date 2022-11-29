const fs = require("fs");
const assert = require("assert");

const isAsteroid = v => v === "#";

const calculateVisible = (grid, x, y) => {
  const visible = new Set();

  for (let cy = 0; cy < grid[0].length; cy++) {
    for (let cx = 0; cx < grid.length; cx++) {
      if (x === cx && y === cy) continue;

      if (isAsteroid(grid[cy][cx])) {
        const dx = x - cx;
        const dy = y - cy;
        const initAngle = dx >= 0 ? 0 : 180;
        const angle = initAngle + Math.sin(Math.abs(y) / Math.abs(x));

        visible.add(angle);
      }
    }
  }

  console.log(visible);

  return Array.from(visible.values()).length;
};

const solve = input => {
  const grid = input.split("\n").map(x => x.trim().split(""));

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (isAsteroid(grid[y][x])) {
        calculateVisible(grid, x, y);
      }
    }
  }

  console.log(grid);
};

assert.deepStrictEqual(
  solve(`.#..#
.....
#####
....#
...##`),
  [3, 4]
);

console.log(getAnswer(fs.readFileSync(`./day9.txt`, "utf8"), [1])); // 3460311188
