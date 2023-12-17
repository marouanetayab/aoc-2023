const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const grid = input.map(i => i.split('').map(Number));
const [destinationI, destinationJ] = [grid.length -1, grid[0].length -1];
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
];

function traverse(minDistance, maxDistance) {
  const queue = [[0, 0, 0, -1]];
  const visited = new Set();
  const costs = {};

  while (queue.length > 0) {
    const [cost, i, j, delta] = queue.shift();

    if (i === destinationI && j === destinationJ) {
      return cost;
    }

    if (visited.has(`${i}-${j}-${delta}`)) {
      continue;
    }

    visited.add(`${i}-${j}-${delta}`);

    for (let direction = 0; direction < 4; direction++) {
      let costIncrement = 0;

      if (direction === delta || (direction + 2) % 4 === delta) {
        continue;
      }

      for (let distance = 1; distance <= maxDistance; distance++) {
        const nextI = i + directions[direction][0] * distance;
        const nextJ = j + directions[direction][1] * distance;

        if (nextI >= 0 && nextI < grid.length && nextJ >= 0 && nextJ < grid[0].length) {
          costIncrement += grid[nextI][nextJ];

          if (distance < minDistance) {
            continue;
          }

          const newCost = cost + costIncrement;

          if (costs[`${nextI}-${nextJ}-${direction}`] !== undefined && costs[`${nextI}-${nextJ}-${direction}`] <= newCost) {
            continue;
          }

          costs[`${nextI}-${nextJ}-${direction}`] = newCost;
          queue.push([newCost, nextI, nextJ, direction]);
        }
      }
    }

    queue.sort((a, b) => a[0] - b[0]);
  }

  return -1;
}

for(let part of ['part1', 'part2']) {
  let shortestPath = 0; 
  if (part === 'part1') {
    shortestPath = traverse(1,3);
  } else {
    shortestPath = traverse(4,10);
  }
  console.log(part, ': ', shortestPath);
}

