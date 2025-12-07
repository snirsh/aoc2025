import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const startCol = input[0].indexOf('S')

  let splits = 0

  let beams = new Set([startCol])

  for (let row = 1; row < input.length; row++) {
    const newBeams = new Set()

    for (const x of beams) {
      if (input[row][x] === '^') {
        splits++
        newBeams.add(x - 1)
        newBeams.add(x + 1)
      } else {
        newBeams.add(x)
      }
    }

    beams = newBeams

    if (beams.size === 0) break
  }

  return splits
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const startCol = input[0].indexOf('S')

  let paths = new Map([[startCol, 1]])

  for (let row = 1; row < input.length; row++) {
    const newPaths = new Map()

    for (const [x, count] of paths) {
      if (input[row][x] === '^') {
        newPaths.set(x - 1, (newPaths.get(x - 1) || 0) + count)
        newPaths.set(x + 1, (newPaths.get(x + 1) || 0) + count)
      } else {
        newPaths.set(x, (newPaths.get(x) || 0) + count)
      }
    }

    paths = newPaths

    if (paths.size === 0) break
  }

  let total = 0
  for (const count of paths.values()) {
    total += count
  }
  return total
}

run({
  part1: {
    tests: [
      {
        input: `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`,
        expected: 40,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
