const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig')

module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  testRegex: "(/__tests__/.*\\.(test|spec))\\.ts$",
  collectCoverageFrom: [
    "src/**/*.ts"
  ],
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/src'}),
}
