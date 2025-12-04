import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(row => row.split(''))

const getAllNeighbors = (input, x, y) => {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
    [x - 1, y - 1],
    [x + 1, y + 1],
    [x - 1, y + 1],
    [x + 1, y - 1],
  ]
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let result = 0
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] !== '@') {
        continue
      }
      const neighbors = getAllNeighbors(input, x, y)
      const neighborValues = neighbors.map(neighbor => input[neighbor[1]]?.[neighbor[0]])
      const neighborCount = neighborValues.filter(n => n === '@').length
      if (neighborCount < 4) {
        result += 1
      }
    }
  }
  return result
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const grid = input.map(row => [...row])
  let totalRemoved = 0

  while (true) {
    const toRemove = []
    
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] !== '@') {
          continue
        }
        const neighbors = getAllNeighbors(grid, x, y)
        const neighborValues = neighbors.map(neighbor => grid[neighbor[1]]?.[neighbor[0]])
        const neighborCount = neighborValues.filter(n => n === '@').length
        if (neighborCount < 4) {
          toRemove.push([x, y])
        }
      }
    }

    if (toRemove.length === 0) {
      break
    }

    for (const [x, y] of toRemove) {
      grid[y][x] = '.'
    }

    totalRemoved += toRemove.length
  }

  return totalRemoved
}

run({
  part1: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
        expected: 43,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
