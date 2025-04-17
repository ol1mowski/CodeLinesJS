import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-node';
import prettier from 'eslint-plugin-prettier';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly'
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
      
      // Wymagaj obsługi wszystkich błędów w Promise - zmienione z error na warn
      '@typescript-eslint/no-floating-promises': 'warn',
      
      // Wymagaj jawnego definiowania typów zwracanych przez funkcje - zmienione z error na warn
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      }],
      
      // Bezpieczne obsługiwanie wyjątków
      'no-throw-literal': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Uporządkowane importy - zmienione z error na warn
      'import/order': ['warn', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }],
      
      // Ograniczenie złożoności cyklomatycznej
      'sonarjs/cognitive-complexity': ['warn', 15],
      
      // Inne dobre praktyki
      'no-console': 'warn',
      'no-duplicate-imports': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_' 
      }],
      'security/detect-object-injection': 'off',
      'security/detect-non-literal-fs-filename': 'off',

      // Wyłączamy reguły Prettier - formatowanie będzie obsługiwane przez oddzielne wywołanie prettier
      'prettier/prettier': 'off'
    }
  },
  {
    files: ['tests/**/*.ts', 'tests/**/*.test.ts', '**/*.spec.ts', 'vitest.config.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: null,
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        vi: 'readonly'
      }
    },
    rules: {
      'node/no-unpublished-import': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'security/detect-possible-timing-attacks': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'warn',
      'prettier/prettier': 'off'
    }
  }
]; 