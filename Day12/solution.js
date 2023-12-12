const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim();
const rows = input.split("\n");
let sum = 0;

function countArrangements(row, part) {
  let [sequence, pattern] = row.split(" ");
  if (part === "part2") {
    sequence =
      sequence +
      "?" +
      sequence +
      "?" +
      sequence +
      "?" +
      sequence +
      "?" +
      sequence;
    pattern =
      pattern + "," + pattern + "," + pattern + "," + pattern + "," + pattern;
  }
  sequence = "." + sequence + ".";
  let nums = pattern.split(",");

  const memo = {}; // Memoization cache for dp function

  function dp(currentIndex, nextIndex, left) {
    const memoKey = `${currentIndex}-${nextIndex}-${left}`;
    if (memoKey in memo) {
      return memo[memoKey];
    }

    if (currentIndex === sequence.length) {
      const res = nextIndex === nums.length && left === 0 ? 1 : 0;
      memo[memoKey] = res;
      return res;
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
    memo[memoKey] = res;
    return res;
  }

  return dp(0, 0, 0);
}

for(const part of ['part1', 'part2']) {
  sum = 0;
  for (const row of rows) {
    const possibilitiesInRow = countArrangements(row, part);
    sum += possibilitiesInRow;
  }
console.log(part, ': ', sum);
}
