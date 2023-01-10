"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: [".d.ts", ".js"],
    coveragePathIgnorePatterns: ["<rootDir>/src/services/token.service.ts"],
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map