module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/tests/**/*.test.[t]s"],
  watchPathIgnorePatterns: ["<rootDir>/src", "<rootDir>/tests/mocks"]
};