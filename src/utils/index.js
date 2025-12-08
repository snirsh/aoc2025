/**
 * AOC Utility Functions
 * Common helpers for Advent of Code problems
 */

// ============================================
// ARRAY & NUMBER UTILITIES
// ============================================

/**
 * Parse numbers from a string
 * @param {string} str - Input string
 * @returns {number[]} Array of numbers
 */
export const parseNumbers = (str) => str.match(/-?\d+/g)?.map(Number) || []

/**
 * Sum an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} Sum
 */
export const sum = (arr) => arr.reduce((acc, val) => acc + val, 0)

/**
 * Product of an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} Product
 */
export const product = (arr) => arr.reduce((acc, val) => acc * val, 1)

/**
 * Count occurrences of a value in an array
 * @param {any[]} arr - Array to search
 * @param {any} value - Value to count
 * @returns {number} Count
 */
export const count = (arr, value) => arr.filter((v) => v === value).length

/**
 * Create a range of numbers
 * @param {number} start - Start (inclusive)
 * @param {number} end - End (exclusive)
 * @returns {number[]} Range array
 */
export const range = (start, end) =>
  Array.from({ length: end - start }, (_, i) => start + i)

/**
 * Chunk an array into groups of size n
 * @param {any[]} arr - Array to chunk
 * @param {number} size - Chunk size
 * @returns {any[][]} Chunked array
 */
export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  )
/**
 * Proper modulo operation that handles negative numbers correctly
 * JavaScript's % operator returns negative results for negative dividends,
 * but mathematical modulo should always return non-negative values.
 * Example: -5 % 3 = -2, but modulo(-5, 3) = 1
 * @param {number} n - The dividend (number to divide)
 * @param {number} m - The divisor (modulo base)
 * @returns {number} The modulo result (always in range [0, m))
 */
export const modulo = (n, m) => ((n % m) + m) % m

// ============================================
// GRID/MATRIX UTILITIES
// ============================================

/**
 * Parse input into a 2D grid/matrix
 * @param {string} input - Raw input
 * @returns {string[][]} 2D grid
 */
export const toGrid = (input) => input.split("\n").map((row) => row.split(""))

/**
 * Get all 4 orthogonal neighbors (up, down, left, right)
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @returns {Array<[number, number]>} Array of [row, col] coordinates
 */
export const get4Neighbors = (row, col) => [
  [row - 1, col], // up
  [row + 1, col], // down
  [row, col - 1], // left
  [row, col + 1], // right
]

/**
 * Get all 8 neighbors (including diagonals)
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @returns {Array<[number, number]>} Array of [row, col] coordinates
 */
export const get8Neighbors = (row, col) => [
  [row - 1, col], // up
  [row + 1, col], // down
  [row, col - 1], // left
  [row, col + 1], // right
  [row - 1, col - 1], // up-left
  [row - 1, col + 1], // up-right
  [row + 1, col - 1], // down-left
  [row + 1, col + 1], // down-right
]

/**
 * Check if coordinates are within grid bounds
 * @param {any[][]} grid - The grid
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @returns {boolean} True if in bounds
 */
export const inBounds = (grid, row, col) =>
  row >= 0 && row < grid.length && col >= 0 && col < grid[0].length

/**
 * Get valid neighbors (within bounds)
 * @param {any[][]} grid - The grid
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {boolean} includeDiagonals - Include diagonal neighbors
 * @returns {Array<[number, number]>} Valid neighbor coordinates
 */
export const getValidNeighbors = (
  grid,
  row,
  col,
  includeDiagonals = false,
) => {
  const neighbors = includeDiagonals
    ? get8Neighbors(row, col)
    : get4Neighbors(row, col)
  return neighbors.filter(([r, c]) => inBounds(grid, r, c))
}

/**
 * Find all positions in grid matching a predicate
 * @param {any[][]} grid - The grid
 * @param {(val: any, row: number, col: number) => boolean} predicate - Test function
 * @returns {Array<[number, number]>} Array of [row, col] coordinates
 */
export const findInGrid = (grid, predicate) => {
  const results = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (predicate(grid[i][j], i, j)) {
        results.push([i, j])
      }
    }
  }
  return results
}

/**
 * Find first position in grid matching a value
 * @param {any[][]} grid - The grid
 * @param {any} value - Value to find
 * @returns {[number, number] | null} First [row, col] or null
 */
export const findFirst = (grid, value) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === value) {
        return [i, j]
      }
    }
  }
  return null
}

// ============================================
// DIRECTION UTILITIES
// ============================================

export const DIRECTIONS = {
  UP: "U",
  RIGHT: "R",
  DOWN: "D",
  LEFT: "L",
}

export const DIR_VECTORS = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
}

/**
 * Turn right (clockwise)
 * @param {string} dir - Current direction (U/R/D/L)
 * @returns {string} New direction
 */
export const turnRight = (dir) => {
  const dirs = ["U", "R", "D", "L"]
  const idx = dirs.indexOf(dir)
  return dirs[(idx + 1) % 4]
}

/**
 * Turn left (counter-clockwise)
 * @param {string} dir - Current direction (U/R/D/L)
 * @returns {string} New direction
 */
export const turnLeft = (dir) => {
  const dirs = ["U", "R", "D", "L"]
  const idx = dirs.indexOf(dir)
  return dirs[(idx + 3) % 4]
}

/**
 * Move in a direction
 * @param {[number, number]} pos - Current position [row, col]
 * @param {string} dir - Direction (U/R/D/L)
 * @returns {[number, number]} New position
 */
export const move = (pos, dir) => {
  const [dr, dc] = DIR_VECTORS[dir]
  return [pos[0] + dr, pos[1] + dc]
}

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Split input into lines
 * @param {string} input - Raw input
 * @returns {string[]} Array of lines
 */
export const lines = (input) => input.split("\n")

/**
 * Split input into blocks separated by blank lines
 * @param {string} input - Raw input
 * @returns {string[]} Array of blocks
 */
export const blocks = (input) => input.split("\n\n")

/**
 * Transpose a grid of strings
 * @param {string[]} arr - Array of strings
 * @returns {string[]} Transposed array
 */
export const transpose = (arr) =>
  arr[0].split("").map((_, i) => arr.map((row) => row[i]).join(""))

// ============================================
// MATH UTILITIES
// ============================================

/**
 * Greatest Common Divisor
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} GCD
 */
export const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))

/**
 * Least Common Multiple
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} LCM
 */
export const lcm = (a, b) => (a * b) / gcd(a, b)

/**
 * Manhattan distance between two points
 * @param {[number, number]} p1 - First point [row, col]
 * @param {[number, number]} p2 - Second point [row, col]
 * @returns {number} Manhattan distance
 */
export const manhattan = (p1, p2) => Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1])

// ============================================
// GRAPH/SEARCH UTILITIES
// ============================================

/**
 * BFS - Breadth First Search
 * @param {any} start - Starting state
 * @param {(state: any) => any[]} getNeighbors - Function to get neighbors
 * @param {(state: any) => boolean} isGoal - Function to check if goal
 * @param {(state: any) => string} stateKey - Function to serialize state for visited tracking
 * @returns {any | null} Goal state or null
 */
export const bfs = (start, getNeighbors, isGoal, stateKey = (s) => JSON.stringify(s)) => {
  const queue = [start]
  const visited = new Set([stateKey(start)])

  while (queue.length > 0) {
    const current = queue.shift()

    if (isGoal(current)) {
      return current
    }

    for (const neighbor of getNeighbors(current)) {
      const key = stateKey(neighbor)
      if (!visited.has(key)) {
        visited.add(key)
        queue.push(neighbor)
      }
    }
  }

  return null
}

/**
 * DFS - Depth First Search
 * @param {any} start - Starting state
 * @param {(state: any) => any[]} getNeighbors - Function to get neighbors
 * @param {(state: any) => boolean} isGoal - Function to check if goal
 * @param {(state: any) => string} stateKey - Function to serialize state for visited tracking
 * @returns {any | null} Goal state or null
 */
export const dfs = (start, getNeighbors, isGoal, stateKey = (s) => JSON.stringify(s)) => {
  const stack = [start]
  const visited = new Set([stateKey(start)])

  while (stack.length > 0) {
    const current = stack.pop()

    if (isGoal(current)) {
      return current
    }

    for (const neighbor of getNeighbors(current)) {
      const key = stateKey(neighbor)
      if (!visited.has(key)) {
        visited.add(key)
        stack.push(neighbor)
      }
    }
  }

  return null
}

// ============================================
// FREQUENCY/COUNTING
// ============================================

/**
 * Count frequency of elements
 * @param {any[]} arr - Array of elements
 * @returns {Map<any, number>} Frequency map
 */
export const frequencies = (arr) => {
  const map = new Map()
  for (const item of arr) {
    map.set(item, (map.get(item) || 0) + 1)
  }
  return map
}

/**
 * Group array elements by a key function
 * @param {any[]} arr - Array of elements
 * @param {(item: any) => any} keyFn - Function to get grouping key
 * @returns {Map<any, any[]>} Map of groups
 */
export const groupBy = (arr, keyFn) => {
  const map = new Map()
  for (const item of arr) {
    const key = keyFn(item)
    if (!map.has(key)) {
      map.set(key, [])
    }
    map.get(key).push(item)
  }
  return map
}

// ============================================
// COMBINATORICS
// ============================================

/**
 * Generate all permutations of an array
 * @param {any[]} arr - Array to permute
 * @returns {any[][]} All permutations
 */
export const permutations = (arr) => {
  if (arr.length <= 1) return [arr]
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
    const perms = permutations(rest)
    for (const perm of perms) {
      result.push([arr[i], ...perm])
    }
  }
  return result
}

/**
 * Generate all combinations of size k from array
 * @param {any[]} arr - Array to choose from
 * @param {number} k - Size of combinations
 * @returns {any[][]} All k-sized combinations
 */
export const combinations = (arr, k) => {
  if (k === 0) return [[]]
  if (k > arr.length) return []

  const result = []
  for (let i = 0; i <= arr.length - k; i++) {
    const rest = combinations(arr.slice(i + 1), k - 1)
    for (const combo of rest) {
      result.push([arr[i], ...combo])
    }
  }
  return result
}

/**
 * Generate all pairs from an array
 * @param {any[]} arr - Array to pair
 * @returns {Array<[any, any]>} All pairs
 */
export const pairs = (arr) => {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      result.push([arr[i], arr[j]])
    }
  }
  return result
}

/**
 * Generate cartesian product of arrays
 * @param {...any[]} arrays - Arrays to combine
 * @returns {any[][]} Cartesian product
 */
export const cartesianProduct = (...arrays) => {
  if (arrays.length === 0) return [[]]
  const [first, ...rest] = arrays
  const restProduct = cartesianProduct(...rest)
  return first.flatMap((item) => restProduct.map((items) => [item, ...items]))
}

/**
 * Generate all operator combinations for n positions
 * @param {string[]} operators - Available operators
 * @param {number} count - Number of positions
 * @returns {string[][]} All combinations
 */
export const operatorCombinations = (operators, count) => {
  if (count === 0) return [[]]
  const result = []

  function backtrack(current) {
    if (current.length === count) {
      result.push([...current])
      return
    }
    for (const op of operators) {
      current.push(op)
      backtrack(current)
      current.pop()
    }
  }

  backtrack([])
  return result
}

// ============================================
// SET OPERATIONS
// ============================================

/**
 * Set intersection
 * @param {Set} a - First set
 * @param {Set} b - Second set
 * @returns {Set} Intersection
 */
export const intersection = (a, b) => new Set([...a].filter((x) => b.has(x)))

/**
 * Set union
 * @param {Set} a - First set
 * @param {Set} b - Second set
 * @returns {Set} Union
 */
export const union = (a, b) => new Set([...a, ...b])

/**
 * Set difference (a - b)
 * @param {Set} a - First set
 * @param {Set} b - Second set
 * @returns {Set} Difference
 */
export const difference = (a, b) => new Set([...a].filter((x) => !b.has(x)))

// ============================================
// COORDINATE HELPERS
// ============================================

/**
 * Serialize coordinates for use in Set/Map
 * @param {number} row - Row coordinate
 * @param {number} col - Column coordinate
 * @returns {string} Serialized coordinate
 */
export const coordKey = (row, col) => `${row},${col}`

/**
 * Parse coordinate key back to [row, col]
 * @param {string} key - Coordinate key
 * @returns {number[]} Parsed coordinates as [row, col]
 */
export const parseCoordKey = (key) => key.split(",").map(Number)

/**
 * Create coordinate object
 * @param {number} r - Row
 * @param {number} c - Column
 * @returns {{r: number, c: number}} Coordinate object
 */
export const coord = (r, c) => ({ r, c })

// ============================================
// MEMOIZATION
// ============================================

/**
 * Memoize a function (cache results)
 * @param {Function} fn - Function to memoize
 * @returns {Function} Memoized function
 */
export const memoize = (fn) => {
  const cache = new Map()
  return (...args) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

// ============================================
// ARRAY HELPERS
// ============================================

/**
 * Get min value from array
 * @param {number[]} arr - Array of numbers
 * @returns {number} Minimum value
 */
export const min = (arr) => Math.min(...arr)

/**
 * Get max value from array
 * @param {number[]} arr - Array of numbers
 * @returns {number} Maximum value
 */
export const max = (arr) => Math.max(...arr)

/**
 * Get unique values from array
 * @param {any[]} arr - Array
 * @returns {any[]} Unique values
 */
export const unique = (arr) => [...new Set(arr)]

/**
 * Flatten nested array
 * @param {any[]} arr - Nested array
 * @returns {any[]} Flattened array
 */
export const flatten = (arr) => arr.flat(Infinity)

/**
 * Zip multiple arrays together
 * @param {...any[]} arrays - Arrays to zip
 * @returns {any[][]} Zipped arrays
 */
export const zip = (...arrays) => {
  const length = Math.min(...arrays.map((a) => a.length))
  return Array.from({ length }, (_, i) => arrays.map((arr) => arr[i]))
}

// ============================================
// NUMBER HELPERS
// ============================================

/**
 * Check if number is between min and max (inclusive)
 * @param {number} num - Number to check
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} True if in range
 */
export const inRange = (num, min, max) => num >= min && num <= max

/**
 * Clamp number between min and max
 * @param {number} num - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

/**
 * Check if number is even
 * @param {number} n - Number to check
 * @returns {boolean} True if even
 */
export const isEven = (n) => n % 2 === 0

/**
 * Check if number is odd
 * @param {number} n - Number to check
 * @returns {boolean} True if odd
 */
export const isOdd = (n) => n % 2 !== 0
