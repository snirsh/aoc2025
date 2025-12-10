import run from "aocrunner"
import { lines, parseNumbers, bfs, sum, max, range } from "../utils/index.js"

// [.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
const parseInput = (rawInput) => lines(rawInput || '1\n2\n').map(line => {
  const [indi, ...rest] = line.split(' ')
  const indicator = indi.split('').slice(1, -1).map(s => s === '.' ? 0 : 1)
  const wirings = rest.slice(0, -1).map(w => parseNumbers(w))
  const voltage = parseNumbers(rest.slice(-1)[0])
  return { indicator, wirings, voltage }
})

const solve = ({ indicator, wirings }) => {
  const target = indicator.reduce((acc, val, i) => acc | (val << i), 0)
  const buttonMasks = wirings.map(w =>
    w.reduce((acc, idx) => acc | (1 << idx), 0)
  )

  const start = { lights: 0, presses: 0 }

  const getNeighbors = ({ lights, presses }) =>
    buttonMasks.map(mask => ({
      lights: lights ^ mask,
      presses: presses + 1
    }))

  const isGoal = ({ lights }) => lights === target
  const stateKey = ({ lights }) => lights.toString()

  const result = bfs(start, getNeighbors, isGoal, stateKey)
  return result ? result.presses : -1
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  return sum(input.map(solve))
}

const solvePart2 = ({ wirings, voltage }) => {
  const m = voltage.length
  const n = wirings.length
  const EPS = 1e-9

  const matrix = voltage.map((v) => {
    const row = Array(n + 1).fill(0)
    row[n] = v
    return row
  })
  for (let j = 0; j < n; j++) {
    for (const i of wirings[j]) matrix[i][j] = 1
  }
  
  const pivotCols = []
  let pivotRow = 0
  
  for (let col = 0; col < n && pivotRow < m; col++) {
    const found = range(pivotRow, m).find(row => Math.abs(matrix[row][col]) > EPS)
    if (found === undefined) continue
    
    [matrix[pivotRow], matrix[found]] = [matrix[found], matrix[pivotRow]]
    const pivotVal = matrix[pivotRow][col]
    for (let c = 0; c <= n; c++) matrix[pivotRow][c] /= pivotVal
    
    for (let row = 0; row < m; row++) {
      if (row !== pivotRow && Math.abs(matrix[row][col]) > EPS) {
        const factor = matrix[row][col]
        for (let c = 0; c <= n; c++) matrix[row][c] -= factor * matrix[pivotRow][c]
      }
    }
    pivotCols.push({ row: pivotRow, col })
    pivotRow++
  }
  
  for (let row = pivotRow; row < m; row++) {
    if (Math.abs(matrix[row][n]) > EPS) return -1
  }
  
  const freeVars = range(0, n).filter(c => !pivotCols.some(p => p.col === c))
  
  const trySolution = (freeVals) => {
    const solution = Array(n).fill(0)
    freeVars.forEach((fv, i) => solution[fv] = freeVals[i])
    
    for (const { row, col } of pivotCols) {
      let val = matrix[row][n]
      for (const freeCol of freeVars) val -= matrix[row][freeCol] * solution[freeCol]
      const rounded = Math.round(val)
      if (rounded < 0) return null
      solution[col] = rounded
    }
    
    for (let i = 0; i < m; i++) {
      let check = 0
      for (let j = 0; j < n; j++) if (wirings[j].includes(i)) check += solution[j]
      if (check !== voltage[i]) return null
    }
    return solution
  }
  
  const maxFreeVal = max(voltage)
  let minTotal = Infinity
  
  const search = (freeIdx, freeVals, currentSum) => {
    if (currentSum >= minTotal) return
    if (freeIdx === freeVars.length) {
      const solution = trySolution(freeVals)
      if (solution) minTotal = Math.min(minTotal, sum(solution))
      return
    }
    for (let v = 0; v <= maxFreeVal && currentSum + v < minTotal; v++) {
      search(freeIdx + 1, [...freeVals, v], currentSum + v)
    }
  }
  
  search(0, [], 0)
  return minTotal === Infinity ? -1 : minTotal
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  return sum(input.map(solvePart2))
}

run({
  part1: {
    tests: [
      {
        input: `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`,
        expected: 33,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
