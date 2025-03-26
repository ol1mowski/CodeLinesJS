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
  },
}) 