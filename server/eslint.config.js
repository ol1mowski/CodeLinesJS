import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-node';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'logs/**',
      'docs/**',
      'public/**',
      '**/*.js.map',
      '**/*.d.ts',
      '**/gen/**',
      'build/**'
    ]
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        // Dodaj globalne zmienne, jeśli są potrzebne
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'security': securityPlugin,
      'sonarjs': sonarjsPlugin,
      'import': importPlugin,
      'node': nodePlugin,
      'prettier': prettier
    },
    rules: {
      // Wyłączenie reguły node/no-unsupported-features/es-syntax ponieważ używamy ESM
      'node/no-unsupported-features/es-syntax': 'off',
      'node/no-missing-import': 'off',
      'node/no-unpublished-import': 'off',
      
      // Wymagaj obsługi wszystkich błędów w Promise
      '@typescript-eslint/no-floating-promises': 'error',
      
      // Wymagaj jawnego definiowania typów zwracanych przez funkcje
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      }],
      
      // Bezpieczne obsługiwanie wyjątków
      'no-throw-literal': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Uporządkowane importy
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }],
      
      // Ograniczenie złożoności cyklomatycznej
      'sonarjs/cognitive-complexity': ['error', 15],
      
      // Inne dobre praktyki
      'no-console': 'warn',
      'no-duplicate-imports': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_' 
      }],
      'security/detect-object-injection': 'off',
      'security/detect-non-literal-fs-filename': 'off',

      // Prettier
      'prettier/prettier': 'error'
    }
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts', 'tests/**/*'],
    rules: {
      'node/no-unpublished-import': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'security/detect-possible-timing-attacks': 'off',
    }
  }
]; 