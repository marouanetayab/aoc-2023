const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n\n");
let sum = 0;

function transposeMatrix(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((j) => j[colIndex]));
}

function findReflectionIndex(pattern, nonMatching) {
  pattern = pattern.map((j) => j.join(""));
  for (let i = 0; i < pattern.length - 1; i++) {
    let nonMatchingCount = 0;
    for (let j = 0; j < pattern.length; j++) {
      if (i + 1 + (i - j) >= 0 && i + 1 + (i - j) < pattern.length) {
        for (let k = 0; k < pattern[i].length; k++) {
          if (pattern[j][k] !== pattern[i + 1 + (i - j)][k]) {
            nonMatchingCount++;
          }
        }
      }
    }
    if (nonMatchingCount === nonMatching) {
      return i + 1;
    }
  }
  return null;
}

function calculatePatternValue(pattern, nonMatching) {
  pattern = pattern.split("\n").map((row) => row.split(""));
  let row = findReflectionIndex(pattern, nonMatching);
  if (row !== null) {
    return 100 * row;
  }
  const transposedPattern = transposeMatrix(pattern);
  let column = findReflectionIndex(transposedPattern, nonMatching);
  if (column !== null) {
    return column;
  }
  return 0;
}

for (const part of ["part1", "part2"]) {
  sum = 0;
  const start = performance.now();
  for (let grid of input) {
    if (part === "part1") {
      sum += calculatePatternValue(grid, 0);
    } else {
      sum += calculatePatternValue(grid, 2);
    }
  }
  console.log(part, ": ", sum);
  console.log(`Execution time ${part}: ${performance.now() - start} ms`);
}
