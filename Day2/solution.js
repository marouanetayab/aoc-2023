const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').trimEnd();
const gameConfigurations = input.split('\n');

function calculateGameScoreBasedOnRules() {
  let totalScore = 0;

  outer: for (const configuration of gameConfigurations) {
    let [gamePoints, sets] = configuration.split(': ');
    gamePoints = +gamePoints.match(/\d+/);
    sets = sets.split('; ');

    for (const set of sets) {
      const individualCubes = set.split(', ');
      const cubeTotals = {
        red: 12,
        green: 13,
        blue: 14,
      };

      for (const individualCube of individualCubes) {
        let [cubeValue, cubeColor] = individualCube.split(' ');
        cubeValue = +cubeValue;

        if (cubeValue > cubeTotals[cubeColor]) {
          continue outer;
        }
      }
    }

    totalScore += gamePoints;
  }

  return totalScore;
}

function calculateAggregateMinimums() {
  let totalAggregatedMinimum = 0;

  for (const configuration of gameConfigurations) {
    let [gamePoints, sets] = configuration.split(': ');
    gamePoints = +gamePoints.match(/\d+/);
    sets = sets.split('; ');

    const minValues = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const set of sets) {
      const individualCubes = set.split(', ');

      for (const individualCube of individualCubes) {
        let [cubeValue, cubeColor] = individualCube.split(' ');
        cubeValue = +cubeValue;

        minValues[cubeColor] = Math.max(minValues[cubeColor], cubeValue);
      }
    }

    totalAggregatedMinimum += minValues.red * minValues.green * minValues.blue;
  }

  return totalAggregatedMinimum;
}

console.log('Part1: ', calculateGameScoreBasedOnRules());
console.log('Part2: ', calculateAggregateMinimums());
