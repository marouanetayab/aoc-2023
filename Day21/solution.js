const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trimEnd();

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function parseInput(input) {
  const positions = new Set();
  const map = input.split("\n").map((line, row) =>
    line.split("").map((char, col) => {
      if (char === "S") {
        positions.add([row, col].join());
      }
      return +(char !== "#");
    })
  );

  return { positions, map };
}

function safeMod(a, b) {
  return a < 0 ? (b - (-a % b)) % b : a % b;
}

for (let part of ["part1", "part2"]) {
  let { positions, map } = parseInput(input);
  let count;
  if (part === "part1") {
    for (let i = 0; i < 64; i++) {
      const nextPositions = new Set();
      for (const p of positions) {
        const [row, col] = p.split(",").map(Number);
        for (const [dr, dc] of directions) {
          if (map[row + dr]?.[col + dc]) {
            nextPositions.add([row + dr, col + dc].join());
          }
        }
      }
      positions = nextPositions;
    }
    count = positions.size;
  } else {
    const size = map.length;

    const target = 26501365;
    const counts = [];
    for (let i = 0; i < target; i++) {
      const nextPositions = new Set();
      for (const p of positions) {
        const [row, col] = p.split(",").map(Number);
        for (const [dr, dc] of directions) {
          const r2 = row + dr;
          const c2 = col + dc;
          if (map[safeMod(r2, size)][safeMod(c2, size)]) {
            nextPositions.add([r2, c2].join());
          }
        }
      }

      positions = nextPositions;
      if ((i + 1) % size === target % size) {
        if (
          counts.length >= 3 &&
          positions.size - 2 * counts.at(-1) + counts.at(-2) ===
            counts.at(-1) - 2 * counts.at(-2) + counts.at(-3)
        ) {
          break;
        }
        counts.push(positions.size);
      }
    }

    const derivative2 = counts.at(-1) - 2 * counts.at(-2) + counts.at(-3);
    for (
      let i = counts.length * size + (target % size);
      i <= target;
      i += size
    ) {
      counts.push(derivative2 + 2 * counts.at(-1) - counts.at(-2));
    }
    count = counts.at(-1);
  }
  console.log(part, ": ", count);
}
