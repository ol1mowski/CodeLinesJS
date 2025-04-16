import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    exclude: [
      'e2e/**',
      '**/e2e/**',
      'node_modules/**',
      '**/node_modules/**',
    ],
    deps: {
      // Rozwiązuje problemy z importami Framer Motion
      registerNodeLoader: false,
      // Dla ESM/Commonjs
      interopDefault: true,
    }
  },
}) 