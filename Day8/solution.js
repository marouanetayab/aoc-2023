const fs = require("fs");

const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const lcm = (a, b) => (a * b) / gcd(a, b);

const input = fs.readFileSync("input.txt", "utf8").trimEnd().split("\n");
const instructions = input[0];
const map = new Map();

let part1 = 0;
let start = "AAA";
let moves = [];

for (let i = 2; i < input.length; i++) {
  const key = input[i].split("=")[0].trim();
  const instructions = input[i].split("=")[1];
  map.set(key, instructions);
}

let i = -1;
while (start !== "ZZZ") {
  const move = instructions[++i % instructions.length];
  const left = map.get(start).substring(2, 5);
  const right = map.get(start).substring(7, 10);
  if (move === "L") {
    start = left;
  } else {
    start = right;
  }
  part1++;
}

for (const key of Array.from(map.keys())) {
  if (key.endsWith("A")) {
    let start = key;
    let i = -1;
    let totalMoves = 0;
    while (!start.endsWith("Z")) {
      const move = instructions[++i % instructions.length];
      const left = map.get(start).substring(2, 5);
      const right = map.get(start).substring(7, 10);
      if (move === "L") {
        start = left;
      } else {
        start = right;
      }
      totalMoves++;
    }
    moves.push(totalMoves);
  }
}

console.log("part1: ", part1);
console.log('part2: ', moves.reduce(lcm));
