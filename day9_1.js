const fs = require("fs");
const assert = require("assert");

class Computer {
  constructor(code, inputs) {
    this.halted = false;
    this.idx = 0;
    this.base = 0;
    this.output = [];

    this.inputs = inputs;
    this.mem = code
      .trim()
      .split(",")
      .map(x => parseInt(x, 10));
  }

  getMode(offset) {
    return Math.floor(
      (this.mem[this.idx] % Math.pow(10, offset + 2)) / Math.pow(10, offset + 1)
    );
  }

  getVal(offset) {
    const mode = this.getMode(offset);
    const pointer = this.mem[this.idx + offset];
    let retVal;
    if (mode === 0) retVal = this.mem[pointer];
    if (mode === 1) retVal = pointer;
    if (mode === 2) retVal = this.mem[this.base + pointer];
    return retVal || 0;
  }

  store(offset, val) {
    const mode = this.getMode(offset);
    const dest =
      mode === 2
        ? this.base + this.mem[this.idx + offset]
        : this.mem[this.idx + offset];
    this.mem[dest] = val;
  }

  process() {
    while (!this.halted) {
      const seq = this.mem[this.idx];
      const com = seq % 100;

      switch (com) {
        case 1:
          this.store(3, this.getVal(1) + this.getVal(2));
          this.idx += 4;
          break;
        case 2:
          this.store(3, this.getVal(1) * this.getVal(2));
          this.idx += 4;
          break;
        case 3:
          this.store(1, this.inputs.shift());
          this.idx += 2;
          break;
        case 4:
          this.output.push(this.getVal(1));
          this.idx += 2;
          break;
        case 5:
          if (this.getVal(1) !== 0) {
            this.idx = this.getVal(2);
          } else {
            this.idx += 3;
          }
          break;
        case 6:
          if (this.getVal(1) === 0) {
            this.idx = this.getVal(2);
          } else {
            this.idx += 3;
          }
          break;
        case 7:
          if (this.getVal(1) < this.getVal(2)) {
            this.store(3, 1);
          } else {
            this.store(3, 0);
          }
          this.idx += 4;
          break;
        case 8:
          if (this.getVal(1) === this.getVal(2)) {
            this.store(3, 1);
          } else {
            this.store(3, 0);
          }
          this.idx += 4;
          break;
        case 9:
          this.base += this.getVal(1);
          this.idx += 2;
          break;
        case 99:
          this.halted = true;
          break;
        default:
          throw new Error("nope nope nope");
      }
    }

    return this;
  }
}

const getAnswer = (code, inputs) => {
  return new Computer(code, inputs).process().output.join(",");
};

assert.deepStrictEqual(
  getAnswer("204,3,99,1125899906842624"),
  "1125899906842624"
);

assert.deepStrictEqual(
  getAnswer("109,2,204,3,99,1125899906842624"),
  "1125899906842624"
);

assert.deepStrictEqual(
  getAnswer("104,1125899906842624,99"),
  "1125899906842624"
);

assert.deepStrictEqual(
  getAnswer("1102,34915192,34915192,7,4,7,99,0").length,
  16
);

assert.deepStrictEqual(
  getAnswer("109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99"),
  "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99"
);

console.log(getAnswer(fs.readFileSync(`./day9.txt`, "utf8"), [1])); // 3460311188
