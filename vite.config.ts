import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    devtools(),
    // this is the plugin that enables path aliases
    nodePolyfills({
      // Only include what you actually need (smaller bundle)
      globals: {
        Buffer: true,     // ← this is the main one you need
        // process: true, // only if needed later
        // global: true,
      },
      // Optional: protocol imports if any library uses them
      protocolImports: true,
      overrides: {
        // Force modern readable-stream polyfill instead of old browserify one
        stream: 'readable-stream',
      },
    }),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        // you can leave the advanced options at defaults for now
        crawlLinks: false,          // ← this stops following external/internal links
      },
    }),
    viteReact(),
    visualizer({ open: true, gzipSize: true }),
  ],
  resolve: {
    alias: {
      // Optional safety net (prevents old stream-browserify from winning)
      stream: 'readable-stream',
      'node:stream': 'readable-stream',
      'node:stream/web': 'readable-stream/lib/web',
    },
  },
  optimizeDeps: {
    include: [
      '@excalidraw/excalidraw',
      'react-dom/client',
    ],  
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    // If SSR-related code is still leaking, consider:
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      ignoreTryCatch: false,
    },
    rollupOptions: {
      // Optional: externalize SSR-only modules if you see them in client bundle
      external: [/^node:/],
    },
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         // React core
  //         if (id.includes('node_modules/react') || 
  //             id.includes('node_modules/react-dom') ||
  //             id.includes('node_modules/scheduler')) {
  //           return 'vendor-react'
  //         }
          
  //         // TanStack ecosystem
  //         if (id.includes('node_modules/@tanstack')) {
  //           return 'vendor-tanstack'
  //         }
          
  //         // All Radix UI components (your biggest UI dependency)
  //         if (id.includes('node_modules/@radix-ui')) {
  //           return 'vendor-radix'
  //         }
          
  //         // Animation library (Motion is heavy)
  //         if (id.includes('node_modules/motion')) {
  //           return 'vendor-animation'
  //         }
          
  //         // Markdown/syntax highlighting
  //         // if (id.includes('node_modules/react-markdown') ||
  //         //     id.includes('node_modules/remark-') ||
  //         //     id.includes('node_modules/rehype') ||
  //         //     id.includes('node_modules/shiki')) {
  //         //   return 'vendor-markdown'
  //         // }
          
  //         // Charts
  //         if (id.includes('node_modules/recharts')) {
  //           return 'vendor-charts'
  //         }
          
  //         // Forms
  //         if (id.includes('node_modules/react-hook-form') ||
  //             id.includes('node_modules/@hookform') ||
  //             id.includes('node_modules/zod')) {
  //           return 'vendor-forms'
  //         }
          
  //         // Date handling
  //         if (id.includes('node_modules/date-fns') ||
  //             id.includes('node_modules/react-day-picker')) {
  //           return 'vendor-dates'
  //         }
          
  //         // Icons
  //         if (id.includes('node_modules/lucide-react')) {
  //           return 'vendor-icons'
  //         }

  //         // Analytics/tracking
  //         if (id.includes('node_modules/posthog')) {
  //           return 'vendor-analytics'
  //         }
          
  //         // Other vendor code
  //         // if (id.includes('node_modules')) {
  //         //   return 'vendor-misc'
  //         // }
  //       }
  //     }
  //   }
  // },
  // ssr: {
  //   external: ['shiki'],
    // if you want to be extra safe you can also do:
    // external: ['shiki', 'shiki/dist/onig.wasm'],
  // },
})

export default config
