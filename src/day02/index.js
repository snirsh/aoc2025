import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split(',').map(coup => coup.split('-')).filter(([c1, c2]) => !c1.startsWith('0') && !c2.startsWith('0'))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let inv = 0
  for (const [c1, c2] of input) {
    for (let i = +c1; i <= +c2; i++) {
      const coup = i.toString()
      const left = coup.slice(0, mid)
      const right = coup.slice(mid)
      if (left === right) {
        inv += +coup
      }
    }
  }

  return inv
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let inv = 0
  for (const [c1, c2] of input) {
    for (let i = +c1; i <= +c2; i++) {
      const coup = i.toString()
      if ((coup + coup).slice(1, -1).includes(coup)) {
        inv+=(+coup)
      }
    }
  }

  return inv
}

run({
  part1: {
    tests: [
      {
        input: `11-22,99-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`,
        expected: 1227775554,
      },
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
