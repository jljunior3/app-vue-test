module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '<rootDir>/src/**/*.(spec|test).(ts|js)',
    '<rootDir>/tests/**/*.(spec|test).(ts|js)'
  ],
  // testPathIgnorePatterns: ['<rootDir>/src/miragejs/'],
  collectCoverageFrom: [
    '!<rootDir>/src/miragejs/**/*.js',
    '!<rootDir>/src/store/index.js',
    '<rootDir>/src/**/**/*.vue',
    '<rootDir>/src/store/**/*.js'
  ]
}
