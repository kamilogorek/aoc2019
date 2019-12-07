const fs = require("fs");
const assert = require("assert");

// Solution

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

const solve = (code, input) => {
  const output = [];

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
        store(mem, i, 1, input);
        i += 2;
        break;
      case 4:
        output.push(getVal(mem, i, 1));
        i += 2;
        break;
      case 99:
        break process;
    }
  }

  return output.join("\n");
};

console.log("Solution:", solve(fs.readFileSync(`./day5.txt`, "utf8"), 1)); // 4887191
