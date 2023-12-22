const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trimEnd().split('\n');

function fall(bricks, brickMap) {
  const fallingBricks = new Set();
  let isFalling = true;

  while (isFalling) {
    isFalling = false;

    outer: for (let i = 0; i < bricks.length; i++) {
      const [[startX, startY, startZ], [endX, endY, endZ]] = bricks[i];

      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          for (let z = startZ; z <= endZ; z++) {
            const below = brickMap[z - 1][y][x];

            if (below && below !== i + 1) {
              continue outer;
            }
          }
        }
      }

      isFalling = true;
      fallingBricks.add(i);
      bricks[i] = [
        [startX, startY, startZ - 1],
        [endX, endY, endZ - 1],
      ];

      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          for (let z = startZ; z <= endZ; z++) {
            brickMap[z][y][x] = 0;
            brickMap[z - 1][y][x] = i + 1;
          }
        }
      }
    }
  }

  return fallingBricks.size;
}

const bricks = [];
let maxX = 0;
let maxY = 0;
let maxZ = 0;

for (const line of input) {
  const [[startX, startY, startZ], [endX, endY, endZ]] = line
    .split("~")
    .map((coord) => coord.split(",").map(Number));

  maxX = Math.max(maxX, endX);
  maxY = Math.max(maxY, endY);
  maxZ = Math.max(maxZ, endZ);

  bricks.push([
    [startX, startY, startZ],
    [endX, endY, endZ],
  ]);
}

const brickMap = [...Array(maxZ + 1)].map((_, z) =>
  [...Array(maxY + 1)].map(() => Array(maxX + 1).fill(+!!z - 1))
);

for (let i = 0; i < bricks.length; i++) {
  const [[startX, startY, startZ], [endX, endY, endZ]] = bricks[i];

  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      for (let z = startZ; z <= endZ; z++) {
        brickMap[z][y][x] = i + 1;
      }
    }
  }
}

fall(bricks, brickMap);

for (let part of ["part1", "part2"]) {
  let sum = part === "part1" ? bricks.length : 0;

  for (let i = 0; i < bricks.length; i++) {
    const bricksCopy = bricks.map((brick) => brick.map((coord) => [...coord]));
    const [[startX, startY, startZ], [endX, endY, endZ]] = bricksCopy[i];

    const mapCopy = brickMap.map((row) => row.map((col) => [...col]));

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        for (let z = startZ; z <= endZ; z++) {
          mapCopy[z][y][x] = 0;
        }
      }
    }

    const count = fall(bricksCopy, mapCopy);
    sum = part === "part1" ? sum - +!!count : sum + count;
  }

  console.log(part, ": ", sum);
}
