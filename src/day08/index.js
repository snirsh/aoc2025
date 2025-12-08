import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(row => row.split(',').map(n => +n.trim()))

const dist = (p1, p2) => Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2 + (p2[2] - p1[2]) ** 2)

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.rank = new Array(n).fill(0)
    this.size = new Array(n).fill(1)
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x])
    }
    return this.parent[x]
  }

  union(x, y) {
    const rootX = this.find(x)
    const rootY = this.find(y)

    if (rootX === rootY) return false

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY
      this.size[rootY] += this.size[rootX]
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX
      this.size[rootX] += this.size[rootY]
    } else {
      this.parent[rootY] = rootX
      this.size[rootX] += this.size[rootY]
      this.rank[rootX]++
    }
    return true
  }

  getSize(x) {
    return this.size[this.find(x)]
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const n = input.length

  const pairs = []
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      pairs.push({ i, j, dist: dist(input[i], input[j]) })
    }
  }

  pairs.sort((a, b) => a.dist - b.dist)

  const connectionsToMake = n === 20 ? 10 : 1000

  const uf = new UnionFind(n)

  for (let k = 0; k < Math.min(connectionsToMake, pairs.length); k++) {
    const { i, j } = pairs[k]
    uf.union(i, j)
  }

  const circuitSizes = new Map()
  for (let i = 0; i < n; i++) {
    const root = uf.find(i)
    circuitSizes.set(root, uf.getSize(root))
  }

  const sizes = [...circuitSizes.values()].sort((a, b) => b - a)

  return sizes[0] * sizes[1] * sizes[2]
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const n = input.length

  const pairs = []
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      pairs.push({ i, j, dist: dist(input[i], input[j]) })
    }
  }

  pairs.sort((a, b) => a.dist - b.dist)

  const uf = new UnionFind(n)
  let lastConnection = null

  for (const { i, j } of pairs) {
    if (uf.union(i, j)) {
      lastConnection = { i, j }
      if (uf.getSize(i) === n) break
    }
  }

  return input[lastConnection.i][0] * input[lastConnection.j][0]
}

run({
  part1: {
    tests: [
      {
        input: `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`,
        expected: 40,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`,
        expected: 25272,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
