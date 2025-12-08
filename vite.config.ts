import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    devtools(),
    // this is the plugin that enables path aliases
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
      },
    }),
    viteReact(),
    visualizer({ open: true, gzipSize: true }),
  ],
  ssr: {
    external: ['shiki'],
    // if you want to be extra safe you can also do:
    // external: ['shiki', 'shiki/dist/onig.wasm'],
  },
})

export default config
