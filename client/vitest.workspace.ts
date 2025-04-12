import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineWorkspace } from 'vitest/config';
import process from 'process';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineWorkspace([
  {
    test: {
      name: 'unit',
      include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
      exclude: ['src/**/*.story.{js,ts,jsx,tsx}', 'src/**/*.stories.{js,ts,jsx,tsx}'],
      environment: 'jsdom',
    },
  },
  {
    test: {
      name: 'e2e',
      include: ['e2e/**/*.{test,spec}.{js,ts}'],
      environment: 'node',
    },
  },
]);
