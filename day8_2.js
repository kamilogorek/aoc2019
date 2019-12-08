const fs = require("fs");
const assert = require("assert");

const input = fs.readFileSync(`./day8.txt`, "utf8");

const digits = (seq, digit) =>
  [...seq].reduce((acc, d) => {
    if (d === `${digit}`) acc++;
    return acc;
  }, 0);

const solve = (input, w, h) => {
  const layers = calculateLayers(input, w, h);
  const output = [];

  for (let x = 0; x < h; x++) {
    output.push([]);
  }

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      for (let layer of layers) {
        const pixel = layer[y][x];
        if (pixel === 0) {
          output[y][x] = "█";
          break;
        }

        if (pixel === 1) {
          output[y][x] = " ";
          break;
        }
      }
    }
  }

  return output.map(x => x.join("")).join("\n");
};

const calculateLayers = (input, w, h) => {
  const data = input
    .trim()
    .split("")
    .map(v => parseInt(v, 10));

  const output = [];
  const l = w * h;

  for (let i = 0; i < data.length / l; i++) {
    const layer = [];
    const chunk = data.slice(l * i, l * (i + 1));

    for (let j = 0; j < chunk.length / w; j++) {
      layer.push(chunk.slice(w * j, w * (j + 1)));
    }

    output.push(layer);
  }

  return output;
};

assert.deepStrictEqual(calculateLayers("123456789012", 3, 2), [
  [[1, 2, 3], [4, 5, 6]],
  [[7, 8, 9], [0, 1, 2]]
]);

assert.deepStrictEqual(solve("0222112222120000", 2, 2), "█ \n █");

const res = solve(input, 25, 6);

console.log(res); // RYCKR
