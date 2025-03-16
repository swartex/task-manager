import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})
const eslintConfig = [
  ...compat.config({
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'next',
      'prettier',
      'next/typescript',
      'next/core-web-vitals'
    ],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      // '@typescript-eslint/no-unused-vars': ['error']
    }
  }),
]
export default eslintConfig
