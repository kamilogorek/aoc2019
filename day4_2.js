const from = 265275;
const to = 781584;

const possibilities = [];

function isIncreasingOnly(n) {
  const chs = Array.from(String(n).split(""));
  for (let i = 0; i < chs.length; i++) {
    if (isNaN(+chs[i + 1])) continue;
    if (+chs[i] > +chs[i + 1]) return false;
  }
  return true;
}

function hasDoubleDigit(n) {
  const chs = Array.from(String(n).split(""));
  let last;
  let count = 0;
  for (let i = 0; i < chs.length; i++) {
    if (last !== chs[i] && count === 2) return true;
    if (last !== chs[i]) {
      last = chs[i];
      count = 0;
    }
    count += 1;
  }
  return count === 2;
}

for (let n = from; n <= to; n++) {
  if (isIncreasingOnly(n) && hasDoubleDigit(n)) possibilities.push(n);
}

console.log(possibilities.length); // 626
