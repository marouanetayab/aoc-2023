const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const grid = input.map(row => row.split(''));
const rows = grid.length;
const cols = grid[0].length;

for(let part of ['part1', 'part2']) {
  const intersections = new Set();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let neighborCount = 0;
      const directions = [['^', -1, 0], ['v', 1, 0], ['<', 0, -1], ['>', 0, 1]];
      for (const [_, dx, dy] of directions) {
        if (0 <= row + dx && row + dx < rows && 0 <= col + dy && col + dy < cols && grid[row + dx][col + dy] !== '#') {
          neighborCount += 1;
        }
      }
      if (neighborCount > 2 && grid[row][col] !== '#') {
        intersections.add(`${row},${col}`);
      }
    }
  }

  let startPoint;
  for (let col = 0; col < cols; col++) {
    if (grid[0][col] === '.') {
      intersections.add(`0,${col}`);
      startPoint = `0,${col}`;
    }
    if (grid[rows - 1][col] === '.') {
      intersections.add(`${rows - 1},${col}`);
      endPoint = `${rows - 1},${col}`;
    }
  }

  const edgeList = {};
  for (const intersection of intersections) {
    edgeList[intersection] = [];
    const [rowVal, colVal] = intersection.split(',').map(Number);
    const queue = [[rowVal, colVal, 0]];
    const visited = new Set();
    while (queue.length) {
      const [r, c, dist] = queue.shift();
      const hash = `${r},${c}`;
      if (visited.has(hash)) {
        continue;
      }
      visited.add(hash);
      if (intersections.has(hash) && hash !== intersection) {
        edgeList[intersection].push([`${r},${c}`, dist]);
        continue;
      }
      const directions = [['^', -1, 0], ['v', 1, 0], ['<', 0, -1], ['>', 0, 1]];
      for (const [dir, dx, dy] of directions) {
        if (0 <= r + dx && r + dx < rows && 0 <= c + dy && c + dy < cols && grid[r + dx][c + dy] !== '#') {
          if (part === 'part1' && ['<', '>', '^', 'v'].includes(grid[r][c]) && grid[r][c] !== dir) {
            continue;
          }
          queue.push([r + dx, c + dy, dist + 1]);
        }
      }
    }
  }

  let count = 0;
  let maxDistance = 0;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  function dfs(node, distance) {
    count += 1;
    const [r, c] = node.split(',').map(Number);
    if (visited[r][c]) {
      return;
    }
    visited[r][c] = true;
    if (r === rows - 1) {
      maxDistance = Math.max(maxDistance, distance);
    }
    for (const [neighbor, neighborDist] of edgeList[node]) {
      dfs(neighbor, distance + neighborDist);
    }
    visited[r][c] = false;
  }

  dfs(startPoint, 0);

  console.log(part, ': ', maxDistance)
}