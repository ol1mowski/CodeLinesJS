import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'
import compression from 'vite-plugin-compression'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(() => {
  
  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        babel: {
          plugins: []
        }
      }),
      splitVendorChunkPlugin(),
      compression({ algorithm: 'gzip' }),
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
      historyApiFallback: true
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      cssCodeSplit: true,
      sourcemap: false,
      minify: 'esbuild',
      cssMinify: true,
      commonjsOptions: {
        transformMixedEsModules: true
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
            
            // API i usługi
            if (id.includes('/api/') || id.includes('/services/')) {
              return 'app-services';
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
    }
  }
})
