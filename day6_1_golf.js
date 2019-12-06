// prettier-ignore
const solution = require("fs")
  .readFileSync("./day6.txt", "utf8")
  .split("\n")
  .reduce((acc, p) => (acc[0].set(...p.split(")").reverse()), acc), [new Map()])
  .map(graph => Array.from(graph.keys()).reduce((acc, key) => ((() => { while (key = graph.get(key)) acc++; })(), acc), 0))
  .reduce(x => x);

console.log(solution);
