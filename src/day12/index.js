import run from "aocrunner"
import { blocks, parseNumbers } from "../utils/index.js"

const parseInput = (rawInput) => {
  const b = blocks(rawInput)
  const regions = b.pop().split('\n')
  const shapes = b.map(bl => [...bl].filter(s => s === '#').length)
  const areas = regions.map((l) => {
    const [ln, ...r] = l.split(':')
    return { a: ln.split('x').map(Number).reduce((a, n) => a * n, 1), q : parseNumbers(r.join(''))}
  })
  return { regions, shapes, areas }
}


const part1 = (rawInput) => {
  const { shapes, areas } = parseInput(rawInput)
  let r = 0
  for (const {a, q} of areas) {
    let sum = shapes.reduce((acc, shape, i) => acc + shape * q[i], 0)
    if (a < sum) continue
    r += 1
  }
  return r 
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
