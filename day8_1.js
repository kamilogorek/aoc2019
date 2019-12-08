const fs = require("fs");
const assert = require("assert");

const input = fs.readFileSync(`./day8.txt`, "utf8");

const digits = (seq, digit) =>
  [...seq].reduce((acc, d) => {
    if (d === `${digit}`) acc++;
    return acc;
  }, 0);

// TODO: use partition
const solve = (input, w, h) => {
  const [_, seq] = calculateLayers(input, w, h)
    .map(x => x.join(""))
    .map(val => [digits(val, 0), val])
    .reduce((acc, next) => {
      if (next[0] < acc[0]) return next;
      return acc;
    });

  return digits(seq, 1) * digits(seq, 2);
};

const calculateLayers = (input, w, h) => {
  const data = input
    .trim()
    .split("")
    .map(v => parseInt(v, 10));

  const output = [];
  const l = w * h;

  for (let i = 0; i < data.length / l; i++) {
    output.push(data.slice(l * i, l * (i + 1)));
  }

  return output;
};

assert.deepStrictEqual(calculateLayers("123456789012", 3, 2), [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 0, 1, 2]
]);

const res = solve(input, 25, 6);

console.log(res); // 1320
