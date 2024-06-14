const config = {
  root: true,
  extends: [
    'next',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', 'jsx-a11y'],
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
      },
    ],
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
        ignorePattern: 'className=".*"',
      },
    ],
    'prettier/prettier': ['error', { printWidth: 100 }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
  },
};

module.exports = config;
