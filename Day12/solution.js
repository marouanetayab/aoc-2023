const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim();
const rows = input.split("\n");
let totalArrangementsPart1 = 0;
let totalArrangementsPart2 = 0;

function countArrangements(row) {
  let [sequence, pattern] = row.split(" ");
  sequence = '.' + sequence + '.';
  let nums = pattern.split(",");

  function dp(currentIndex, nextIndex, left) {
    if (currentIndex === sequence.length) {
      if (nextIndex === nums.length && left === 0) {
        return 1;
      }
      return 0;
    }

    if (nextIndex > nums.length) {
      return 0;
    }

    let res = 0;
    if (sequence[currentIndex] === ".") {
      if (left === 0) {
        if (nextIndex < nums.length) {
          res += dp(currentIndex + 1, nextIndex + 1, nums[nextIndex]);
        }
        res += dp(currentIndex + 1, nextIndex, 0);
      }
    } else if (sequence[currentIndex] === "#") {
      if (left > 0) {
        res += dp(currentIndex + 1, nextIndex, left - 1);
      }
    } else {
      if (left === 0) {
        if (nextIndex < nums.length) {
          res += dp(currentIndex + 1, nextIndex + 1, nums[nextIndex]);
        }
        res += dp(currentIndex + 1, nextIndex, 0);
      }
      if (left > 0) {
        res += dp(currentIndex + 1, nextIndex, left - 1);
      }
    }
    return res;
  }

  return dp(0,0,0);
}

for (const row of rows) {
  const possibilitiesInRow = countArrangements(row);
  totalArrangementsPart1 += possibilitiesInRow;
}
console.log(totalArrangementsPart1);

// @TODO why is this running forever on input?
for (const row of rows) {
  let [sequence, pattern] = row.split(" ");
  sequence = sequence + '?' + sequence + '?' + sequence + '?' + sequence + '?' + sequence;
  pattern = pattern + ',' + pattern + ',' + pattern + ',' + pattern + ',' + pattern;
  const unfolded = '.' + sequence + ' ' + pattern + '.';
  console.log(unfolded);
  const possibilitiesInRow = countArrangements(unfolded);
  totalArrangementsPart2 += possibilitiesInRow;
}

console.log(totalArrangementsPart2);
