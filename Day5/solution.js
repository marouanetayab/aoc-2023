const fs = require('fs');

function processSeeds(input, part) {
  let [seeds, ...maps] = input.split('\n\n');
  seeds = seeds.match(/\d+/g).map(Number);

  if (part === 'part1') {
    for (let map of maps) {
      map = map
        .split('\n')
        .slice(1)
        .map((line) => line.match(/\d+/g).map(Number));
      for (let i = 0; i < seeds.length; i++) {
        const seed = seeds[i];
        for (const [dest, source, len] of map) {
          if (seed >= source && seed < source + len) {
            seeds[i] = seeds[i] - source + dest;
            break;
          }
        }
      }
    }
    return Math.min(...seeds);
  } else {
    const nextSeeds = [];
    for (let i = 0; i < seeds.length; i += 2) {
      nextSeeds.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
    }
    seeds = nextSeeds;

    for (let map of maps) {
      map = map
        .split('\n')
        .slice(1)
        .map((line) => line.match(/\d+/g).map(Number));

      const movedSeeds = [];
      for (const [dest, source, len] of map) {
        const unmovedSeeds = [];
        for (const [start, end] of seeds) {
          if (start < source + len && end >= source) {
            movedSeeds.push([
              Math.max(start, source) - source + dest,
              Math.min(end, source + len - 1) - source + dest,
            ]);
          }
          if (start < source) {
            unmovedSeeds.push([start, Math.min(end, source - 1)]);
          }
          if (end >= source + len) {
            unmovedSeeds.push([Math.max(start, source + len), end]);
          }
        }
        seeds = unmovedSeeds;
      }
      seeds.push(...movedSeeds);
    }
    return Math.min(...seeds.flat());
  }
}

const input = fs.readFileSync('input.txt', 'utf8').trimEnd();
for(part of ['part1', 'part2']) {
  console.log(part, ': ', processSeeds(input, part));
}
