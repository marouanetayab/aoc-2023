const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trimEnd().split("\n");
const time = input[0].match(/\d+/g);
const distance = input[1].match(/\d+/g);

let concatedTime = "";
let concatedDistance = "";
let part1 = 1;
let part2 = 0;

for (let i = 0; i < time.length; i++) {
  concatedTime += time[i];
  concatedDistance += distance[i];
  let win = 0;
  for (let j = 0; j < time[i]; j++) {
    if (j * (time[i] - j) > distance[i]) {
      win++;
    }
  }
  part1 *= win;
}

concatedTime = parseInt(concatedTime);
concatedDistance = parseInt(concatedDistance);

for (let i = 0; i < concatedTime; i++) {
  if (i * (concatedTime - i) > concatedDistance) {
    part2++;
  }
}

console.log("part1: ", part1);
console.log("part2: ", part2);

