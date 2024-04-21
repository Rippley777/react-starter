export default function wallaby() {
    return {
        files: [
            'src/**/*.tsx',    // Path to source files
            '!src/**/*.test.tsx'  // Exclude test files
        ],
        tests: [
            'src/**/*.test.tsx'  // Path to test files
        ],
        env: {
            type: 'node'  // Environment type (e.g., node, browser)
        },
        testFramework: 'jest'  // Specify test framework
    };
}