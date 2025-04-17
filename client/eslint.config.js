import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { 
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'public/**',
      'coverage/**',
      'dist-analyze/**',
      'playwright-report/**',
      'test-results/**',
      '.cache/**',
      '.temp/**',
      '**/.DS_Store',
      'e2e/**',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/generated/**',
      '**/*.generated.*',
      '*.d.ts',
      'README.md',
      'LICENSE',
      '.gitignore',
      '.prettierignore',
      '.env',
      '.env.*',
      // Ignorujemy pliki konfiguracyjne, które sprawiają problemy
      '*.config.js',
      '*.config.ts',
      'tailwind.config.js',
      'postcss.config.js',
      'vite.config.ts',
      'vitest.config.ts',
      'vitest.workspace.ts',
      'playwright.config.ts'
    ]
  },
  // Podstawowe reguły dla plików TS/TSX w katalogu src
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2022,
        project: ['./tsconfig.app.json']
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Podstawowe reguły
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'log'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
      'curly': ['warn', 'multi-line'],
      'no-unused-vars': 'off', // Wyłączamy na rzecz wersji TypeScript
      
      // Reguły TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_|^e$|^err$|^error$|container',
        varsIgnorePattern: '^_|^e$|^err$|^error$|container',
        caughtErrorsIgnorePattern: '^_|^e$|^err$|^error$|container'
      }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      
      // Hooki React
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
      
      // React Refresh
      'react-refresh/only-export-components': 'off',
    },
  },
  
  // Specyficzne reguły dla testów
  {
    files: ['src/**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    }
  }
)
