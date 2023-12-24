const fs = require("fs");
const { init } = require("z3-solver");

const input = fs.readFileSync("input.txt", "utf8").trimEnd();

async function countIntersectionsInRange(input, range) {
  const hailstones = input
    .split("\n")
    .map((line) => line.match(/-?\d+/g).map(Number));
  let count = 0;

  for (let i = 0; i < hailstones.length - 1; i++) {
    const [x1, y1, _, vx1, vy1, __] = hailstones[i];

    for (let j = i + 1; j < hailstones.length; j++) {
      const [x2, y2, _, vx2, vy2, __] = hailstones[j];

      const t2 =
        (y1 - y2 + (vy1 * (x2 - x1)) / vx1) / (vy2 - (vy1 * vx2) / vx1);
      const t1 =
        (y2 - y1 + (vy2 * (x1 - x2)) / vx2) / (vy1 - (vy2 * vx1) / vx2);
      const x = x2 + vx2 * t2;
      const y = y2 + vy2 * t2;

      if (
        t1 > 0 &&
        t2 > 0 &&
        x >= range[0] &&
        x <= range[1] &&
        y >= range[0] &&
        y <= range[1]
      ) {
        count++;
      }
    }
  }

  return count;
}

async function solveUsingZ3(input) {
  const { Context } = await init();
  const Z3 = Context("main");
  const hailstones = input
    .split("\n")
    .map((line) => line.match(/-?\d+/g).map(Number));

  const solver = new Z3.Solver();
  const [x, y, z, vx, vy, vz] = ["x", "y", "z", "vx", "vy", "vz"].map(
    Z3.Int.const
  );

  for (let i = 0; i < 3; i++) {
    const [x1, y1, z1, vx1, vy1, vz1] = hailstones[i];
    const t = Z3.Int.const(`t${i}`);

    solver.add(t.ge(0));
    solver.add(x.add(vx.mul(t)).eq(t.mul(vx1).add(x1)));
    solver.add(y.add(vy.mul(t)).eq(t.mul(vy1).add(y1)));
    solver.add(z.add(vz.mul(t)).eq(t.mul(vz1).add(z1)));
  }

  await solver.check();
  const model = solver.model();
  const result = [x, y, z]
    .map((p) => +model.get(p).toString())
    .reduce((acc, n) => acc + n);

  return result;
}

async function solve() {
  const range = [200000000000000, 400000000000000];

  const intersectionCount = await countIntersectionsInRange(input, range);
  console.log("part1:", intersectionCount);

  const z3Result = await solveUsingZ3(input);
  console.log("part2:", z3Result);
}

solve().then(() => {
  process.exit();
});
