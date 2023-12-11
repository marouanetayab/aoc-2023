const fileSystem = require('fs');

const fileInput = fileSystem.readFileSync('input.txt', 'utf8').trim();
const gameLines = fileInput.split('\n');

function calculateHandStrength(handCards, part) {
  handCards = handCards.replace('T', String.fromCharCode('9'.charCodeAt(0) + 1));
  handCards = handCards.replace('J', part ? String.fromCharCode('2'.charCodeAt(0) - 1) : String.fromCharCode('9'.charCodeAt(0) + 2));
  handCards = handCards.replace('Q', String.fromCharCode('9'.charCodeAt(0) + 3));
  handCards = handCards.replace('K', String.fromCharCode('9'.charCodeAt(0) + 4));
  handCards = handCards.replace('A', String.fromCharCode('9'.charCodeAt(0) + 5));

  const cardCounter = {};
  for (const card of handCards) {
    cardCounter[card] = (cardCounter[card] || 0) + 1;
  }

  if (part === 'part2') {
    let targetCard = Object.keys(cardCounter)[0];
    for (const key in cardCounter) {
      if (key !== '1') {
        if (cardCounter[key] > cardCounter[targetCard] || targetCard === '1') {
          targetCard = key;
        }
      }
    }
    if (targetCard !== '1' || Object.keys(cardCounter).join('') !== '1') {
      if ('1' in cardCounter && targetCard !== '1') {
        cardCounter[targetCard] += cardCounter['1'];
        delete cardCounter['1'];
      }
      if ('1' in cardCounter) {
        delete cardCounter['1'];
      }
    }
  }

  const sortedCardValues = Object.values(cardCounter).sort((a, b) => a - b);

  switch (sortedCardValues.join('')) {
    case '5':
      return [10, handCards];
    case '14':
      return [9, handCards];
    case '23':
      return [8, handCards];
    case '113':
      return [7, handCards];
    case '122':
      return [6, handCards];
    case '1112':
      return [5, handCards];
    case '11111':
      return [4, handCards];
    default:
      return;
  }
}

for (const part of ['part1', 'part2']) {
  const gameHands = gameLines.map(line => {
    const [handCards, bid] = line.split(' ');
    return [handCards, bid];
  });
  
  gameHands.sort((a, b) => {
    const strengthA = calculateHandStrength(a[0], part);
    const strengthB = calculateHandStrength(b[0], part);
    return strengthA[0] - strengthB[0];
  });

  let totalScore = 0;
  for (let i = 0; i < gameHands.length; i++) {
    totalScore += (i + 1) * parseInt(gameHands[i][1]);
  }
  console.log(part, ': ', totalScore);
}
