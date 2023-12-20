const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");
const modules = {};
const conjunctions = {};
const flipFlops = {};
const rxConjunctionPresses = {};
let rxConjunction = "";
let lowPulses = 0;
let highPulses = 0;
let buttonPresses = 0;

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const lcm = (values) => {
  return values.reduce((a, b) => (a * b) / gcd(a, b));
};

for (const line of input) {
  const [moduleStr, destsStr] = line.split(" -> ");
  const destinations = destsStr.split(", ");
  let label;
  const type = moduleStr[0];
  if (moduleStr === "broadcaster") {
    modules["broadcaster"] = destinations;
  } else {
    label = moduleStr.slice(1);
    modules[label] = destinations;
  }

  if (destinations.includes("rx")) {
    rxConjunction = label;
  }

  if (type === "&") {
    conjunctions[label] = {};
  }

  if (type === "%") {
    flipFlops[label] = false;
  }
}

for (const [label, destinations] of Object.entries(modules)) {
  for (const dest of destinations) {
    if (dest in conjunctions) {
      conjunctions[dest][label] = 0;
    }
  }
}

function pressButton() {
  buttonPresses++;

  lowPulses += 1 + modules["broadcaster"].length;
  const queue = [];
  for (const dest of modules["broadcaster"]) {
    queue.push([0, "broadcaster", dest]);
  }

  while (queue.length) {
    const [pulse, src, label] = queue.shift();

    if (label === "rx") {
      continue;
    }

    let send = 0;
    if (label in conjunctions) {
      conjunctions[label][src] = pulse;
      if (Object.values(conjunctions[label]).some((n) => n === 0)) {
        send = 1;
      }
    }

    if (label in flipFlops) {
      if (pulse === 1) {
        continue;
      }
      flipFlops[label] = !flipFlops[label];
      if (flipFlops[label]) {
        send = 1;
      }
    }

    if (send === 1) {
      highPulses += modules[label].length;
    } else {
      lowPulses += modules[label].length;
    }

    for (const dest of modules[label]) {
      queue.push([send, label, dest]);
    }

    for (const [conLabel, val] of Object.entries(conjunctions[rxConjunction])) {
      if (val === 1 && !(conLabel in rxConjunctionPresses)) {
        rxConjunctionPresses[conLabel] = buttonPresses;
      }
    }
  }
}

for (let part of ["part1", "part2"]) {
  let res = 0;

  for (let i = 0; i < 1000; i++) {
    pressButton();
  }

  if (part === "part1") {
    res = lowPulses * highPulses;
  } else {
    while (Object.keys(rxConjunctionPresses).length < 4) {
      pressButton();
    }
    res = lcm(Object.values(rxConjunctionPresses));
  }

  console.log(part, ": ", res);
}
