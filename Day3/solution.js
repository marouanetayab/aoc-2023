const fs = require("fs");

const input = fs.readFileSync('input.txt', 'utf8').trimEnd();
const map = input.split('\n').map((line) => line.split(''));
const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function part1() {
  let totalSum = 0;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (/[^\d^.]/.test(map[row][col])) {
        for (let [dRow, dCol] of directions) {
          if (/\d/.test(map[row + dRow]?.[col + dCol])) {
            const digits = [map[row + dRow][col + dCol]];
            for (let c = col + dCol - 1; c >= 0; c--) {
              if (/\d/.test(map[row + dRow]?.[c])) {
                digits.unshift(map[row + dRow][c]);
                map[row + dRow][c] = '.';
              } else {
                break;
              }
            }
            for (let c = col + dCol + 1; c < map[row + dRow]?.length; c++) {
              if (/\d/.test(map[row + dRow]?.[c])) {
                digits.push(map[row + dRow][c]);
                map[row + dRow][c] = '.';
              } else {
                break;
              }
            }
            totalSum += +digits.join('');
          }
        }
      }
    }
  }
  return totalSum;
}

function part2() {
  let totalSum = 0;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (/\*/.test(map[row][col])) {
        const gears = [];
        for (let [dRow, dCol] of directions) {
          if (/\d/.test(map[row + dRow]?.[col + dCol])) {
            const digits = [map[row + dRow][col + dCol]];
            for (let c = col + dCol - 1; c >= 0; c--) {
              if (/\d/.test(map[row + dRow]?.[c])) {
                digits.unshift(map[row + dRow][c]);
                map[row + dRow][c] = '.';
              } else {
                break;
              }
            }
            for (let c = col + dCol + 1; c < map[row + dRow]?.length; c++) {
              if (/\d/.test(map[row + dRow]?.[c])) {
                digits.push(map[row + dRow][c]);
                map[row + dRow][c] = '.';
              } else {
                break;
              }
            }
            gears.push(+digits.join(''));
          }
        }
        if (gears.length === 2) {
          totalSum += gears[0] * gears[1];
        }
      }
    }
  }
  return totalSum;
}

console.log('part1: ', part1());
console.log('part2: ', part2());
