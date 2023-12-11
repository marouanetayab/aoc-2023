const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const grid = lines.map(row => row.split(''));
const rows = grid.length;
const columns = grid[0].length;

const voidRows = [];
for (let row = 0; row < rows; row++) {
  if (grid[row].every(item => item === '.')) {
    voidRows.push(row);
  }
}

const voidColumns = [];
for (let col = 0; col < columns; col++) {
  const column = grid.map(x => x[col]);
  if (column.every(col => col === '.')) {
    voidColumns.push(col);
  }
}

const galaxies = [];
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < columns; col++) {
    if (grid[row][col] === '#') {
      galaxies.push([row, col]);
    }
  }
}

for (const part of ['part1', 'part2']) {
  const expansionFactor = part === 'part2' ? 1000000 - 1 : 1;
  let sum = 0;
  
  for (let i = 0; i < galaxies.length; i++) {
    const [row, col] = galaxies[i];
    for (let j = i; j < galaxies.length; j++) {
      const [row2, col2] = galaxies[j];
      let manhattanDist = Math.abs(row2 - row) + Math.abs(col2 - col);
      
      for (const emptyRow of voidRows) {
        if (Math.min(row, row2) <= emptyRow && emptyRow <= Math.max(row, row2)) {
          manhattanDist += expansionFactor;
        }
      }
      
      for (const emptyCol of voidColumns) {
        if (Math.min(col, col2) <= emptyCol && emptyCol <= Math.max(col, col2)) {
          manhattanDist += expansionFactor;
        }
      }
      
      sum += manhattanDist;
    }
  }
  
 console.log(part, ': ', sum);
}
