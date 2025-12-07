// Type definitions for aocrunner
declare module 'aocrunner' {
  interface TestCase {
    input: string;
    expected: string | number;
  }

  interface PartConfig {
    tests?: TestCase[];
    solution: (rawInput: string) => any;
  }

  interface RunConfig {
    part1: PartConfig;
    part2: PartConfig;
    trimTestInputs?: boolean;
    onlyTests?: boolean;
  }

  export default function run(config: RunConfig): void;
}
