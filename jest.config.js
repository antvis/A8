module.exports = {
  testTimeout: 100000,
  testMatch: ['<rootDir>/__tests__/**/*/*.spec.+(ts|tsx|js)'],
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  modulePathIgnorePatterns: ['dist'],
  collectCoverageFrom: [
    'src/api/**/*.ts',
    'src/shader/**/*.ts',
    'src/webgl/**/*.ts',
  ],
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: {
          allowJs: true,
          target: 'esnext',
          esModuleInterop: true,
        },
      },
    ],
  },
};
