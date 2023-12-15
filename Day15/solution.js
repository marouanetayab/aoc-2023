const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim().split(',');
let sum = 0;

function generateHash(str) {
  let value = 0;
  for (const ch of str) {
    value += ch.charCodeAt(0);
    value *= 17;
    value %= 256;
  }
  return value;
}

for(let part of ['part1', 'part2']) {
  const lenses = Array.from({ length: 256 }, () => []);
  const lensLengths = Array.from({ length: 256 }, () => ({}));
  sum = 0;
  input.forEach((step) => {
    if (part === 'part1') sum += generateHash(step);
    else {
      const label = step.split('=')[0].split('-')[0];
    const hashValue = generateHash(label);
  
    if (step.includes('-')) {
      const lensIndex = lenses[hashValue].indexOf(label);
      if (lensIndex !== -1) {
        lenses[hashValue].splice(lensIndex, 1);
      }
    }
  
    if (step.includes('=')) {
      if (!lenses[hashValue].includes(label)) {
        lenses[hashValue].push(label);
      }
      lensLengths[hashValue][label] = parseInt(step.split('=')[1]);
    }
    }
  });

  if(part === 'part2') {
    lenses.forEach((lens, i) => {
      lens.forEach((hashLabel, j) => {
        sum += (i + 1) * (j + 1) * lensLengths[i][hashLabel];
      });
    });    
  }

  console.log(part, ': ', sum);
}
