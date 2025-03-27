import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { splitVendorChunkPlugin } from 'vite'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    compression({ algorithm: 'gzip' }),
    visualizer({
      open: false,
      gzipSize: true,
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer-motion';
            }
            if (id.includes('recharts') || id.includes('d3')) {
              return 'vendor-charts';
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query';
            }
            if (id.includes('monaco-editor')) {
              return 'vendor-monaco';
            }
            return 'vendor-other';
          }
          
          // App chunks
          if (id.includes('/components/')) {
            if (id.includes('/Dashboard/')) {
              return 'app-dashboard';
            }
            if (id.includes('/Community/')) {
              return 'app-community';
            }
            if (id.includes('/Auth/')) {
              return 'app-auth';
            }
            return 'app-components';
          }
          
          // Lazy-loaded pages
          if (id.includes('/pages/')) {
            const pageName = id.split('/pages/')[1].split('/')[0];
            return `page-${pageName.toLowerCase()}`;
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
})
