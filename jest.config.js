module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app-blog/$1',
    '^~/(.*)$': '<rootDir>/app-blog/$1',
    '^~~/(.*)$': '<rootDir>/$1',
    '^@@/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/app-blog/components/**/*.vue',
    '<rootDir>/app-blog/pages/**/*.vue',
    '<rootDir>/app-blog/store/**/*.ts',
  ],
}
