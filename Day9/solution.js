const fs = require("fs");

function findLast(line) {
  if (line.filter((i) => i !== 0).length === 0) {
    return 0;
  }

  const diff = [];
  for (let i = 0; i < line.length - 1; i++) {
    diff.push(line[i + 1] - line[i]);
  }

  return line[line.length - 1] + findLast(diff);
}

const input = fs.readFileSync("input.txt", "utf8").trimEnd().split("\n");

let lines = [];
for (let i = 0; i < input.length; i++) {
  let line = input[i].split(" ");
  line = line.map((entry) => parseInt(entry));
  lines.push(line);
}

const part1 = lines.reduce((acc, curr) => acc + findLast(curr), 0);
const part2 = lines.reduce(
  (acc, curr) => acc + findLast(curr.slice().reverse()),
  0
);

console.log("part1: ", part1);
console.log("part2: ", part2);
