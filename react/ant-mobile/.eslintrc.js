module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
  extends: ['airbnb'],
  settings: {
    'import/resolver': 'webpack',
  },
  rules: {
    'no-console': 0,
    'no-debugger': 0,
    'no-param-reassign': 0,
    'no-bitwise': 0,
    'no-plusplus': 0,
    semi: [2, 'never'],
    'arrow-parens': 0,
    'no-trailing-spaces': 0,
    'no-new': 0,
    'func-names': 0,
    'consistent-return': 0,
    'object-shorthand': [1, 'always', { avoidQuotes: true }],
    'class-methods-use-this': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'import/extensions': [0, 'always'],
    'import/prefer-default-export': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: ['@/'],
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': ['enabled', { ignore: 'ignore', customValidators: 'customValidator' }],
    'react/jsx-closing-bracket-location': [
      1,
      {
        nonEmpty: 'props-aligned',
        selfClosing: false,
      },
    ],
    'react/destructuring-assignment': [1, 'always', { ignoreClassFields: true }],
  },
}
