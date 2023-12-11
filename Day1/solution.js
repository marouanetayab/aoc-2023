const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

let [part1, part2] = [0, 0];

lines.map((item) => {
  part1 += getFirstAndLastNumbers(item);
  part2 += getFirstAndLastNumbers(replaceWordsWithNumbers(item));
});

function getFirstAndLastNumbers(inputString) {
  const numbers = inputString.match(/\d/g);

  const firstNumber = parseInt(numbers[0]);
  const lastNumber = parseInt(numbers[numbers.length - 1]);
  return parseInt(firstNumber + "" + lastNumber);
}
function replaceWordsWithNumbers(inputString) {
  const wordToNumber = {
    one: "one1one",
    two: "two2two",
    three: "three3three",
    four: "four4four",
    five: "five5five",
    six: "six6six",
    seven: "seven7seven",
    eight: "eight8eight",
    nine: "nine9nine",
  };
  for (const num in wordToNumber) {
    inputString = inputString.replaceAll(num, wordToNumber[num]);
  }
  return inputString;
}

console.log("part1: ", part1);
console.log("part2: ", part2);
