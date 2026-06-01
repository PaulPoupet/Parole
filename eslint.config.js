// eslint.config.mjs
// @ts-check
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig(
  // 1. Ignores
  {
    ignores: [
      'package.json',
      'package-lock.json',
      'dist/**/*',
      'node_modules/**/*',
      'src/app/api/**/*',
      '.angular/**/*',
    ],
  },

  // 2. Toutes les configs TS scopées explicitement sur **/*.ts
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...tseslint.configs.recommendedTypeChecked,
      ...angular.configs.tsRecommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.app.json', 'tsconfig.spec.json'],
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'cm', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'cm', style: 'kebab-case' },
      ],
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],
    },
  },

  // 3. Prettier TS
  {
    files: ['**/*.ts'],
    ...prettierRecommended,
    rules: {
      ...prettierRecommended.rules,
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },

  // 4. Configs Angular HTML
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },

  // 5. Prettier HTML
  {
    files: ['**/*.html'],
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': ['error', { parser: 'angular', endOfLine: 'auto' }],
    },
  },
);