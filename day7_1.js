const fs = require("fs");
const assert = require("assert");
const permutations = require("./permutations");

class Computer {
  constructor(code, inputs) {
    this.inputs = inputs;
    this.halt = false;
    this.mem = code
      .trim()
      .split(",")
      .map(x => parseInt(x, 10));
  }

  getVal(i, offset) {
    const mode = Math.floor(
      (this.mem[i] % Math.pow(10, offset + 2)) / Math.pow(10, offset + 1)
    );
    const valAtOffset = this.mem[i + offset];
    return mode === 1 ? valAtOffset : this.mem[valAtOffset];
  }

  store(i, offset, val) {
    const dest = this.mem[i + offset];
    this.mem[dest] = val;
  }

  process() {
    let output;
    let idx = 0;

    loop: for (; idx < this.mem.length; ) {
      const seq = this.mem[idx];
      const com = seq % 100;

      switch (com) {
        case 1:
          this.store(idx, 3, this.getVal(idx, 1) + this.getVal(idx, 2));
          idx += 4;
          break;
        case 2:
          this.store(idx, 3, this.getVal(idx, 1) * this.getVal(idx, 2));
          idx += 4;
          break;
        case 3:
          this.store(idx, 1, this.inputs.shift());
          idx += 2;
          break;
        case 4:
          output = this.getVal(idx, 1);
          idx += 2;
          break;
        case 5:
          if (this.getVal(idx, 1) !== 0) {
            idx = this.getVal(idx, 2);
          } else {
            idx += 3;
          }
          break;
        case 6:
          if (this.getVal(idx, 1) === 0) {
            idx = this.getVal(idx, 2);
          } else {
            idx += 3;
          }
          break;
        case 7:
          if (this.getVal(idx, 1) < this.getVal(idx, 2)) {
            this.store(idx, 3, 1);
          } else {
            this.store(idx, 3, 0);
          }
          idx += 4;
          break;
        case 8:
          if (this.getVal(idx, 1) === this.getVal(idx, 2)) {
            this.store(idx, 3, 1);
          } else {
            this.store(idx, 3, 0);
          }
          idx += 4;
          break;
        case 99:
          this.halt = true;
          break loop;
      }
    }

    return output;
  }
}

function solveForSeq(code, seq) {
  return seq.reduce((acc, val) => new Computer(code, [val, acc]).process(), 0);
}

assert.deepStrictEqual(solveForSeq("3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0", [4, 3, 2, 1, 0]), 43210); // prettier-ignore
assert.deepStrictEqual(solveForSeq("3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0", [0,1,2,3,4]), 54321); // prettier-ignore
assert.deepStrictEqual(solveForSeq("3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0", [1, 0, 4, 3, 2]), 65210); // prettier-ignore

const getAnswer = code => {
  return permutations([0, 1, 2, 3, 4]).reduce((max, next) => {
    const output = solveForSeq(code, next);
    if (output > max) {
      maxSeq = next;
      return output;
    }
    return max;
  }, 0);
};

assert.deepStrictEqual(getAnswer("3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"), 43210); //prettier-ignore
assert.deepStrictEqual(getAnswer("3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"), 54321); // prettier-ignore
assert.deepStrictEqual(getAnswer("3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0"), 65210); // prettier-ignore

console.log(getAnswer(fs.readFileSync(`./day7.txt`, "utf8"))); // 844468
