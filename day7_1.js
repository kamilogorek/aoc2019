const fs = require("fs");
const assert = require("assert");

const getVal = (mem, i, offset) => {
  const mode = Math.floor(
    (mem[i] % Math.pow(10, offset + 2)) / Math.pow(10, offset + 1)
  );
  const val = mode === 1 ? mem[i + offset] : mem[mem[i + offset]];
  return val;
};

const store = (mem, i, offset, val) => {
  const dest = mem[i + offset];
  mem[dest] = val;
};

const processCode = (code, inputs) => {
  let output;

  const mem = code
    .trim()
    .split(",")
    .map(x => parseInt(x, 10));

  let i = 0;
  process: for (; i < mem.length; ) {
    const seq = mem[i];
    const com = seq % 100;

    switch (com) {
      case 1:
        store(mem, i, 3, getVal(mem, i, 1) + getVal(mem, i, 2));
        i += 4;
        break;
      case 2:
        store(mem, i, 3, getVal(mem, i, 1) * getVal(mem, i, 2));
        i += 4;
        break;
      case 3:
        store(mem, i, 1, inputs.shift());
        i += 2;
        break;
      case 4:
        output = getVal(mem, i, 1);
        i += 2;
        break;
      case 5:
        if (getVal(mem, i, 1) !== 0) {
          i = getVal(mem, i, 2);
        } else {
          i += 3;
        }
        break;
      case 6:
        if (getVal(mem, i, 1) === 0) {
          i = getVal(mem, i, 2);
        } else {
          i += 3;
        }
        break;
      case 7:
        if (getVal(mem, i, 1) < getVal(mem, i, 2)) {
          store(mem, i, 3, 1);
        } else {
          store(mem, i, 3, 0);
        }
        i += 4;
        break;
      case 8:
        if (getVal(mem, i, 1) === getVal(mem, i, 2)) {
          store(mem, i, 3, 1);
        } else {
          store(mem, i, 3, 0);
        }
        i += 4;
        break;
      case 99:
        break process;
    }
  }

  return output;
};

function solveForSeq(code, seq) {
  return seq.reduce((acc, val) => processCode(code, [val, acc]), 0);
}

assert.deepStrictEqual(solveForSeq("3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0", [4, 3, 2, 1, 0]), 43210); // prettier-ignore
assert.deepStrictEqual(solveForSeq("3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0", [0,1,2,3,4]), 54321); // prettier-ignore
assert.deepStrictEqual(solveForSeq("3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0", [1, 0, 4, 3, 2]), 65210); // prettier-ignore

// Don't judge me
function getCombinations() {
  const combinations = [];
  for (let a = 0; a <= 4; a++)
    for (let b = 0; b <= 4; b++)
      for (let c = 0; c <= 4; c++)
        for (let d = 0; d <= 4; d++)
          for (let e = 0; e <= 4; e++) combinations.push([a, b, c, d, e]);
  return combinations;
}

assert.deepStrictEqual(getCombinations().length, Math.pow(5, 5));

const getAnswer = code => {
  let maxSeq;
  getCombinations().reduce((max, next) => {
    const output = solveForSeq(code, next);
    if (output > max) {
      maxSeq = next;
      return output;
    }
    return max;
  }, 0);
  return maxSeq.join("");
};

assert.deepStrictEqual(getAnswer("3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"), '43210'); //prettier-ignore
assert.deepStrictEqual(getAnswer("3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"), '54321'); // prettier-ignore
assert.deepStrictEqual(getAnswer("3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0"), '65210'); // prettier-ignore

//const code = fs.readFileSync(`./day7.txt`, "utf8");
// 01111
// 02330
