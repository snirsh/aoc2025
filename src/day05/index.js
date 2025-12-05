import run from "aocrunner"

const parseInput = (rawInput) => {
  const [ranges, numbers] = rawInput.split('\n\n').map(section => section.split('\n'))
  return {
    fullRange: ranges.map(range => range.split('-').map(number => +number)),
    numbers: new Set(numbers.map(number => +number))
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let result = 0

  for (const number of input.numbers) {
    for (const range of input.fullRange) {
      if (number >= range[0] && number <= range[1]) {
        result += 1
        break
      }
    }
  }

  return result
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const mergeOverlappingRanges = (ranges) => {
    const mergedRanges = ranges.sort((a, b) => a[0] - b[0])
    for (let i = 0; i < mergedRanges.length; i++) {
      for (let j = i + 1; j < mergedRanges.length; j++) {
        const range1 = mergedRanges[i]
        const range2 = mergedRanges[j]
        if (range1[1] >= range2[0]) {
          mergedRanges[i] = [range1[0], Math.max(range1[1], range2[1])]
          mergedRanges.splice(j, 1)
          j--
        }
      }
    }
    return mergedRanges
  }

  const mergedRanges = mergeOverlappingRanges(input.fullRange)
  return mergedRanges.reduce((acc, range) => {acc +=Math.abs(range[1] - range[0]) + 1; return acc}, 0)
}

run({
  part1: {
    tests: [
      {
        input: `3-5
10-14
16-20
12-18

1
5
8
11
17
32`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3-5
10-14
16-20
12-18

1
5
8
11
17
32`,
        expected: 14,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
