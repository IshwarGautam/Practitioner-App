import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [".d.ts", ".js"],
  coveragePathIgnorePatterns: ["<rootDir>/src/services/token.service.ts"],
};

export default config;
