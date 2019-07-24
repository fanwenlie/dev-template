module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  extends: ['airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'no-bitwise': 'off',
    semi: ['error', 'never'],
    'arrow-parens': 'off',
    'no-trailing-spaces': 'off',
    'no-new': 'off',
    'func-names': 'off',
    'consistent-return': 'off',
    'object-shorthand': ['warn', 'always', { avoidQuotes: true }],
    'class-methods-use-this': 'off',
    'import/extensions': ['off', 'always'],
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    "react/prop-types": [
      "enabled",
      { "ignore": "ignore", "customValidators": "customValidator" }
    ]
  },
}
