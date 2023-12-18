const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

function calculateArea(xCoords, yCoords) {
  return (
    0.5 *
    Math.abs(
      calculateDotProduct(xCoords, transpose(yCoords)) -
        calculateDotProduct(yCoords, transpose(xCoords))
    )
  );
}

function calculateDotProduct(xCoords, yCoords) {
  return xCoords
    .map((elem, index) => elem * yCoords[index])
    .reduce((acc, val) => acc + val);
}

function transpose(array) {
  return array.map((_, index, arr) => arr[(index + 1) % arr.length]);
}

for (let part of ["part1", "part2"]) {
  let sum = 0;
  let currentLocation = [0, 0];
  const xCoordinates = [];
  const yCoordinates = [];
  const directionName = ["R", "D", "L", "U"];
  const directions = { U: [1, 0], D: [-1, 0], R: [0, 1], L: [0, -1] };
  let totalPoints = 0;

  input.forEach((instruction) => {
    const [direction, length, hexValue] = instruction.split(" ");
    if (part === "part1") {
      currentDirection = directions[direction];
      currentLength = parseInt(length, 10);
    } else {
      currentDirection =
        directions[directionName[parseInt(hexValue[hexValue.length - 2])]];
      currentLength = parseInt(
        hexValue.substring(hexValue.length - 7, hexValue.length - 2),
        16
      );
    }

    totalPoints += currentLength;

    currentLocation = [
      currentLocation[0] + currentLength * currentDirection[0],
      currentLocation[1] + currentLength * currentDirection[1],
    ];
    xCoordinates.push(currentLocation[0]);
    yCoordinates.push(currentLocation[1]);
  });

  const area = calculateArea(xCoordinates, yCoordinates);
  const pointCount = totalPoints;

  const interiorArea = area + 1 - pointCount / 2;
  sum = interiorArea + pointCount;

  console.log(part, ": ", sum);
}
