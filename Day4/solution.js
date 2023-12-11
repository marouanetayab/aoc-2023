const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trimEnd().split("\n");

let part1 = 0;
let part2 = 0;
let points = input.map(() => 1);

for (let i = 0; i < input.length; i++) {
  const game = input[i].trim().split(":")[1].split("|");
  const first = game[0].match(/\d+/g);
  const second = game[1].match(/\d+/g);
  const wins = second.filter((n) => first.includes(n)).length;
  part1 += wins && 2 ** (wins - 1);
  for (let j = 0; j < wins; j++) {
    points[i + j + 1] += points[i];
  }
}
console.log("part1: ", part1);
part2 = points.reduce((a, b) => a + b, 0);
console.log("part2: ", part2);
