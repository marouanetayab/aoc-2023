const fs = require("fs");

const input = fs.readFileSync('input.txt', "utf-8").split("\n");
const graphHeight = input.length;
const graphWidth = input[0].length;

const mapGraph = Array.from({ length: graphHeight }, () => Array(graphWidth).fill(0));

let startPosX = -1;
let startPosY = -1;
for (let i = 0; i < graphHeight; i++) {
  if (input[i].includes("S")) {
    startPosX = i;
    startPosY = input[i].indexOf("S");
    break;
  }
}

const movementDirections = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const validCharacters = ["-7J", "|LJ", "-FL", "|F7"];
const validDirections = [];
for (let i = 0; i < 4; i++) {
  const direction = movementDirections[i];
  const x = startPosX + direction[0];
  const y = startPosY + direction[1];
  if (
    x >= 0 &&
    x < graphHeight &&
    y >= 0 &&
    y < graphWidth &&
    validCharacters[i].includes(input[x][y])
  ) {
    validDirections.push(i);
  }
}
const isStartDirectionValid = validDirections.includes(3);
const transformationMatrix = {
  "0-": 0,
  "07": 1,
  "0J": 3,
  "2-": 2,
  "2F": 1,
  "2L": 3,
  "1|": 1,
  "1L": 0,
  "1J": 2,
  "3|": 3,
  "3F": 0,
  37: 2,
};

let currentDirection = validDirections[0];
let currentX = startPosX + movementDirections[currentDirection][0];
let currentY = startPosY + movementDirections[currentDirection][1];
let pathLength = 1;
mapGraph[startPosX][startPosY] = 1;

while (!(currentX === startPosX && currentY === startPosY)) {
  mapGraph[currentX][currentY] = 1;
  pathLength += 1;
  currentDirection = transformationMatrix[`${currentDirection}${input[currentX][currentY]}`];
  currentX += movementDirections[currentDirection][0];
  currentY += movementDirections[currentDirection][1];
}



let part2 = 0;

for (let i = 0; i < graphHeight; i++) {
  let inside = false;
  for (let j = 0; j < graphWidth; j++) {
    if (mapGraph[i][j]) {
      if (
        input[i][j] === "|" ||
        input[i][j] === "J" ||
        input[i][j] === "L" ||
        (input[i][j] === "S" && isStartDirectionValid)
      ) {
        inside = !inside;
      }
    } else {
      part2 += inside ? 1 : 0;
    }
  }
}

console.log("Part1: ", Math.floor(pathLength / 2));
console.log("Part2: ", part2);
