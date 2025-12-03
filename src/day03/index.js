import run from "aocrunner"
import { argv0 } from "process"

const parseInput = (rawInput) => rawInput.split('\n').map(row => row.split(''))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let result = 0

  let nums = []
  for (const row of input) {
    let max = 0
    nums = []
    let maxI = -1
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] > max) {
        max = row[i]
        maxI = i
      }
    }
    nums.push(max)
    max = 0
    for (let i = maxI + 1; i < row.length; i++) {
      if (row[i] > max) max = row[i]
    }
    nums.push(max)
    result += +nums.join('')
  }
  return result
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let result = 0

  for (const row of input) {
    const toRemove = row.length - 12
    let removed = 0
    let stack = []
    for (const d of row) {
      while (stack.length > 0 && removed < toRemove && stack[stack.length - 1] < d) {
        stack.pop()
        removed++
      }
      stack.push(d)
    }
    while (removed < toRemove) {
      stack.pop()
      removed++
    }
    result += +stack.join('')

  }

  return result
}

run({
  part1: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 357,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 3121910778619
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false
})
