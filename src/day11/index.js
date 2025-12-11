import run from "aocrunner"
import { memoize } from "../utils/index.js"

const parseInput = (rawInput) => rawInput.split('\n').map(line => line.split(': ')).reduce((acc, [key, value]) => {
  acc[key] = value.split(' ')
  return acc
}, {})

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  
  const start = 'you'
  const end = 'out'

  const countPaths = memoize((node) => {
    if (node === end) return 1
    if (!input[node]) return 0

    const neighbors = input[node]
    return neighbors.reduce((acc, neighbor) => acc + countPaths(neighbor), 0)
  })

  return countPaths(start)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  
  const start = 'svr'
  const end = 'out'
  const mustVisit1 = 'dac'
  const mustVisit2 = 'fft'

  const countPaths = memoize((node, visitedDac, visitedFft) => {
    if (node === end) return (visitedDac && visitedFft) ? 1 : 0
    if (!input[node]) return 0
    const neighbors = input[node]
    return neighbors.reduce((acc, neighbor) => {
      return acc + countPaths(neighbor, visitedDac || neighbor === mustVisit1, visitedFft || neighbor === mustVisit2)
    }, 0)
  })
  return countPaths(start, false, false)
}

run({
  part1: {
    tests: [
      {
        input: `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
