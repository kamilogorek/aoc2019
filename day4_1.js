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
  for (let i = 0; i < chs.length; i++) if (chs[i] === chs[i + 1]) return true;
  return false;
}

for (let n = from; n <= to; n++) {
  if (isIncreasingOnly(n) && hasDoubleDigit(n)) possibilities.push(n);
}

console.log(possibilities.length); // 960
