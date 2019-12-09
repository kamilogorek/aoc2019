const fs = require("fs");
const assert = require("assert");
const permutations = require("./permutations");

class Computer {
  constructor(code, inputs) {
    this.halted = false;
    this.idx = 0;
    this.inputs = inputs;
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
    iter: while (true) {
      const seq = this.mem[this.idx];
      const com = seq % 100;

      switch (com) {
        case 1:
          this.store(
            this.idx,
            3,
            this.getVal(this.idx, 1) + this.getVal(this.idx, 2)
          );
          this.idx += 4;
          break;
        case 2:
          this.store(
            this.idx,
            3,
            this.getVal(this.idx, 1) * this.getVal(this.idx, 2)
          );
          this.idx += 4;
          break;
        case 3:
          this.store(this.idx, 1, this.inputs.shift());
          this.idx += 2;
          break;
        case 4:
          this.output = this.getVal(this.idx, 1);
          this.idx += 2;
          break iter;
        case 5:
          if (this.getVal(this.idx, 1) !== 0) {
            this.idx = this.getVal(this.idx, 2);
          } else {
            this.idx += 3;
          }
          break;
        case 6:
          if (this.getVal(this.idx, 1) === 0) {
            this.idx = this.getVal(this.idx, 2);
          } else {
            this.idx += 3;
          }
          break;
        case 7:
          if (this.getVal(this.idx, 1) < this.getVal(this.idx, 2)) {
            this.store(this.idx, 3, 1);
          } else {
            this.store(this.idx, 3, 0);
          }
          this.idx += 4;
          break;
        case 8:
          if (this.getVal(this.idx, 1) === this.getVal(this.idx, 2)) {
            this.store(this.idx, 3, 1);
          } else {
            this.store(this.idx, 3, 0);
          }
          this.idx += 4;
          break;
        case 99:
          this.halted = true;
          break iter;
      }
    }
  }
}

function solveForSeq(code, seq) {
  let output = 0;
  const computers = seq.map(s => new Computer(code, [s]));

  while (!computers[4].halted) {
    for (let c of computers) {
      c.inputs.push(output);
      c.process();
      output = c.output;
    }
  }

  return output;
}

const getAnswer = code => {
  return permutations([5, 6, 7, 8, 9]).reduce((max, next) => {
    const output = solveForSeq(code, next);
    if (output > max) {
      maxSeq = next;
      return output;
    }
    return max;
  }, 0);
};

console.log(getAnswer(fs.readFileSync(`./day7.txt`, "utf8"))); // 4215746
