export default {
    // Mark this as the root configuration file
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    // Parser options to enable JSX and modern ECMAScript features
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'prettier', // Disables rules that conflict with Prettier
    ],
    plugins: ['react'],
    rules: {
        // Customize rules as desired
        'react/prop-types': 'off',
        'no-console': 'warn',
        'react/react-in-jsx-scope': 'off', // Not needed for React 17+ with new JSX transform
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
