module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'], // Your TypeScript files extension
            parserOptions: {
                project: ['./tsconfig.json'], // Specify it only for TypeScript files
            },
        },
    ],
    rules: {
        semi: 1,
    },
}
