import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

const part1 = (rawInput) => {
  const input = parseInput(rawInput).map(r => r.split(' ').filter(Boolean))

  let res = 0

  for (let col = 0; col < input[0].length; col++) {
    const action = input[input.length - 1][col]

    if (action === '*') {
      res += input.slice(0, -1).reduce((acc, row) => {
        acc *= +row[col]
        return acc
      }, 1)
    } else {
      res += input.slice(0, -1).reduce((acc, row) => {
        acc += +row[col]
        return acc
      }, 0)
    }
  }



  return res
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)


  const size = input[0].length
  const ops = input.length - 1

  let eq = ''
  let eqn = []
  let res = 0

  for (let c = 0; c < size; c++) {
    if (input[ops][c] !== ' ') {
      if (eq !== '') {
        res += eval(eqn.join(eq))
        eqn = []
      }
      eq = input[ops][c]
    }

    let n = ''
    for (let r = 0; r < ops; r++) {
      n += input[r][c]
    }
    n = n.trim()
    if (n !== '') eqn.push(n)
  }
  res += eval(eqn.join(eq))
  return res
}

run({
  part1: {
    tests: [],
    solution: part1
  },
  part2: {
    tests: [],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false,
})