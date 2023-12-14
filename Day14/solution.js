const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').trim();
let grid = input.split('\n').map((row) => row.split(''));

function rotate(grid) {
  const rows = grid.length;
  const columns = grid[0].length;
  const rotatedGrid = Array.from({ length: columns }, () => Array.from({ length: rows }, () => '?'));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      rotatedGrid[col][rows - 1 - row] = grid[row][col];
    }
  }
  return rotatedGrid;
}

function rollRocks(grid) {
  const rows = grid.length;
  const columns = grid[0].length;

  for (let col = 0; col < columns; col++) {
    for (let _ = 0; _ < rows; _++) {
      for (let row = 0; row < rows; row++) {
        if (grid[row][col] === 'O' && row > 0 && grid[row - 1][col] === '.') {
          grid[row][col] = '.';
          grid[row - 1][col] = 'O';
        }
      }
    }
  }
  return grid;
}

function calculateLoad(grid) {
  let totalLoad = 0;
  const rows = grid.length;

  for (let row = 0; row < rows; row++) {
    const len = grid[row].length;
    for (let col = 0; col < len; col++) {
      if (grid[row][col] === 'O') {
        totalLoad += len - row;
      }
    }
  }
  return totalLoad;
}

function spin360() {
  for (let j = 0; j < 4; j++) {
    grid = rollRocks(grid);
    grid = rotate(grid);
  }
}

for(let part of ['part1', 'part2']) {
  let sum = 0;
  if (part === 'part1') {
    sum = calculateLoad(rollRocks(grid));
  } else {
    const cache = new Map();
    const target = 1000000000;
    let currentIteration = 0;
    
    while (currentIteration < target) {
      currentIteration++;
      spin360();
    
      const hash = grid.map((row) => row.join('')).toString();
      if (cache.has(hash)) {
        const cycleLength = currentIteration - cache.get(hash);
        const repetitions = Math.floor((target - currentIteration) / cycleLength);
        currentIteration += repetitions * cycleLength;
      }
      cache.set(hash, currentIteration);
    }
    sum = calculateLoad(grid);
  }
  console.log(part, ': ', sum);
}