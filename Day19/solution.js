const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim().split("\n\n");
let [workflowStr, ratings] = input;
const parts = ratings.split("\n").map(getRatings);
const workflows = {};

workflowStr.split("\n").forEach((line) => {
  const [workflowName, rules] = line.split("{");
  workflows[workflowName.trim()] = rules.slice(0, -1);
});

function getRatings(str) {
  return str.match(/\d+/g).map(Number);
}

function evaluatePart(part, currentWorkflow) {
  // Pun inteded :D 
  const [x, m, a, s] = part;
  const workflowRules = workflows[currentWorkflow];

  for (let rule of workflowRules.split(",")) {
    if (rule === "R") {
      return false;
    } else if (rule === "A") {
      return true;
    } else if (!rule.includes(":")) {
      return evaluatePart(part, rule);
    }

    const [condition, destination] = rule.split(":");
    if (eval(condition)) {
      if (destination === "R") {
        return false;
      } else if (destination === "A") {
        return true;
      } else {
        return evaluatePart(part, destination);
      }
    }
  }
}

function evaluateRanges(char, greater, value, ranges) {
  // Pun inteded once again :D 
  const index = "xmas".indexOf(char);
  const updatedRanges = [];

  for (let range of ranges) {
    let [low, high] = range[index];

    if (greater) {
      low = Math.max(low, value + 1);
    } else {
      high = Math.min(high, value - 1);
    }

    if (low <= high) {
      range[index] = [low, high];
      updatedRanges.push(range);
    }
  }

  return updatedRanges;
}

function getAcceptanceRanges(workflowName) {
  return getInnerAcceptanceRanges(workflows[workflowName].split(","));
}

function getInnerAcceptanceRanges(rules) {
  const firstRule = rules[0];

  switch (firstRule) {
    case "R":
      return [];
    case "A":
      return [
        [
          [1, 4000],
          [1, 4000],
          [1, 4000],
          [1, 4000],
        ],
      ];
    default:
      if (!firstRule.includes(":")) {
        return getAcceptanceRanges(firstRule);
      }
  }
  const condition = firstRule.split(":")[0];
  const isGreater = condition.includes(">");
  const character = condition[0];
  const value = parseInt(condition.slice(2));
  const invertedValue = isGreater ? value + 1 : value - 1;

  const conditionTrue = evaluateRanges(
    character,
    isGreater,
    value,
    getInnerAcceptanceRanges([firstRule.split(":")[1]])
  );
  const conditionFalse = evaluateRanges(
    character,
    !isGreater,
    invertedValue,
    getInnerAcceptanceRanges(rules.slice(1))
  );

  return [...conditionTrue, ...conditionFalse];
}

for (let part of ["part1", "part2"]) {
  let sum = 0;

  if (part === "part1") {
    for (let partDetails of parts) {
      if (evaluatePart(partDetails, "in")) {
        sum += partDetails.reduce((acc, val) => acc + val, 0);
      }
    }
  } else {
    for (let range of getAcceptanceRanges("in")) {
      let value = 1;
      for (let [low, high] of range) {
        value *= high - low + 1;
      }
      sum += value;
    }
  }

  console.log(part, ": ", sum);
}
