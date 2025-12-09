import run from "aocrunner"
import { parseCoordKey, pairs, getArea, isRectInsidePolygon } from "../utils/index.js"

const parseInput = (rawInput) => rawInput.split("\n").map(parseCoordKey).map(([x, y]) => ({x ,y}))

const part1 = (rawInput) => {
  const tiles = parseInput(rawInput)
  return pairs(tiles).reduce((max, [t1, t2]) => Math.max(max, getArea(t1, t2)), 0)
}

const part2 = (rawInput) => {
  const tiles = parseInput(rawInput)
  return pairs(tiles)
    .filter(([t1, t2]) => isRectInsidePolygon(t1, t2, tiles))
    .reduce((max, [t1, t2]) => Math.max(max, getArea(t1, t2)), 0)
}

run({
  part1: {
    tests: [
      {
        input: `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`,
        expected: 50,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`,
        expected: 24,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
