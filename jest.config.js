module.exports = {
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '^@bauble/(.*)$': '<rootDir>/../packages/$1/src'
    },
    collectCoverageFrom: [
      "packages/**/src/**/*.{ts,js}",
      "!tests/**/*",
    ],
    roots: ['./tests', './'],
    globals: {
      'ts-jest': {
        tsConfig: './tests/tsconfig.json'
      }
    }
}