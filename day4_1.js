// Utils because JS has no proper built-ins :((

const range = (a, b) => Array.from({ length: b - a + 1 }, (v, k) => k + a);

const partition = (arr, size, step) => {
  const acc = [];
  for (let i = 0; i < arr.length; i += step) {
    if (i + step >= arr.length) break;
    acc.push(arr.slice(i, i + size));
  }
  return acc;
};

// Solution

const numToDigitpairs = n => partition([...`${n}`].map(x => parseInt(x)), 2, 1);

const increasingOnly = n => n.every(([x, y]) => x <= y);

const doubleDigit = n => n.some(([x, y]) => x === y);

const problemFilters = n => {
  const pairs = numToDigitpairs(n);
  return increasingOnly(pairs) && doubleDigit(pairs);
};

const solve = (a, b) => range(a, b).filter(problemFilters).length;

console.log(solve(265275, 781584)); // 960
