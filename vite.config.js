import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        }),
      ],
      imports: ['vue', { 'vue-router': ['createRouter', 'createWebHistory', 'createWebHashHistory', 'useRoute', 'useRouter'], 'v-card': ['default'] }],
      eslintrc: {
        enabled: true,
        filepath: fileURLToPath(new URL('./.eslintrc-auto-import.json', import.meta.url)),
        globalsPropValue: true
      }
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    }),
    VitePluginSvgSpritemap('./src/assets/icons/*.svg')
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "@/styles/element/index.scss" as *; 
        @use "@/styles/_base.scss" as *;`
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue': ['vue'],
          'vue-router': ['vue-router'],
          'element-plus': ['element-plus'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['element-plus/es/components/**/*']
  }
})
