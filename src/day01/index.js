import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(row => [+(row.match(/\d+/)[0]), row.match(/\w/)[0]])

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let start = 50
  let count = 0
  for (const [n, r] of input) {
    let newAcc = r === 'R' ? start + n : start - n
    newAcc = ((newAcc%100)+100)%100
    if (newAcc === 0) {
      count += 1
    }
    start = newAcc
  }
  return count
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let dial = 50
  let count = 0
  for (const [n, r] of input) {
    const newDial = r === 'R' ? dial + n : dial - n
    count += r === 'R' ? Math.floor((newDial / 100)) : Math.floor(-newDial / 100)
    if (r === 'L' && dial !== 0) {
      count += 1
    }
    dial = ((newDial % 100) + 100) % 100
  }
  return count
}

run({
  part1: {
    // tests: [],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
expected: 6,
      },
      {
        input: `L50\nL5`,
        expected: 1,
      },
      {
        input: `R1000`,
        expected: 10,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
