const fs = require("fs");
const assert = require("assert");

const input = fs
  .readFileSync(`./day2.txt`, "utf8")
  .trim()
  .split(",")
  .map(v => parseInt(v, 10));

// Solution

const solve = input => {
  const jump = 4;

  for (let i = 0; i < input.length; i++) {
    const [com, p1, p2, dest] = input.slice(i * jump, (i + 1) * jump);

    if (com === 1) {
      input[dest] = input[p1] + input[p2];
      continue;
    }

    if (com === 2) {
      input[dest] = input[p1] * input[p2];
      continue;
    }

    if (com === 99) break;
  }

  return input;
};

// Tests
assert.deepStrictEqual(solve([1,0,0,0,99]), [2,0,0,0,99]); // prettier-ignore
assert.deepStrictEqual(solve([2,3,0,3,99]), [2,3,0,6,99]); // prettier-ignore
assert.deepStrictEqual(solve([2,4,4,5,99,0]), [2,4,4,5,99,9801]); // prettier-ignore
assert.deepStrictEqual(solve([1,1,1,4,99,5,6,0,99]), [30,1,1,4,2,5,6,0,99]); // prettier-ignore

outer: for (let i = 0; i <= 99; i++) {
  for (let j = 0; j <= 99; j++) {
    let memory = input.slice(0);
    memory[1] = i; // noun
    memory[2] = j; // verb

    if (solve(memory)[0] === 19690720) {
      console.log("Solution:", 100 * i + j); // 4112
      break outer;
    }
  }
}
