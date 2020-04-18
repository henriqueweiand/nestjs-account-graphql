module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    testPathIgnorePatterns: [],
    collectCoverageFrom: [
        '**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!**/interfaces/**',
        '!**/strategies/**',
        '!**/mock/**',
        '!**/migrations/**',
        '!**/enum/**',
        '!**/*.module.ts',
        '!**/*.entity.ts',
        '!**/*.validator.ts',
        '!envs.ts',
        '!<rootDir>/main.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 95,
            functions: 95,
            lines: 95,
            statements: 95,
        },
    },
    preset: 'ts-jest',
};
