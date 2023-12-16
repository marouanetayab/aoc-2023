const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");
const grid = input.map((row) => row.split(""));
let sum = 0;

const directionNames = ["R", "L", "D", "U"];

const mirrorConfig = new Map([
  [".", { R: ["R"], L: ["L"], D: ["D"], U: ["U"] }],
  ["-", { R: ["R"], L: ["L"], D: ["L", "R"], U: ["L", "R"] }],
  ["|", { R: ["D", "U"], L: ["D", "U"], D: ["D"], U: ["U"] }],
  ["/", { R: ["U"], L: ["D"], D: ["L"], U: ["R"] }],
  ["\\", { R: ["D"], L: ["U"], D: ["R"], U: ["L"] }],
]);


function countEnergized(i, j, direction) {
  const energized = new Set();
  function traverse(i, j, direction) {
    const hash = `${i},${j},${direction}`;
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    if (energized.has(hash)) {
      return;
    }
    energized.add(hash);
    const mirror = grid[i][j];
    for (const dir of mirrorConfig.get(mirror)[direction]) {
      const nextDirection = directions[directionNames.indexOf(dir)];
      const row = i + nextDirection[0];
      const col = j + nextDirection[1];
      if (
        row >= 0 &&
        row < grid.length &&
        col >= 0 &&
        col < grid[0].length
      ) {
        traverse(row, col, dir);
      }
    }
  }

  traverse(i, j, direction);
  return [
    ...new Set(
      [...energized].map((hash) => hash.split(",").slice(0, 2).join(","))
    ),
  ].length;
}

for (let part of ["part1", "part2"]) {
  sum = 0;
  if (part === "part1") {
    sum = countEnergized(0, 0, "R");
  } else {
    const startCoordinates = [];
    for (let i = 0; i < grid.length; i++) {
      startCoordinates.push([i, 0, "R"]);
      startCoordinates.push([i, grid[0].length - 1, "L"]);
    }
    for (let j = 0; j < grid[0].length; j++) {
      startCoordinates.push([0, j, "D"]);
      startCoordinates.push([grid.length - 1, j, "U"]);
    }
    sum = Math.max(...startCoordinates.map((startCoordinate) => countEnergized(startCoordinate[0], startCoordinate[1], startCoordinate[2])));
  }
  console.log(part, ': ', sum);
}
