import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  json: {
    stringify: true,
  },
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    Components({
      resolvers: [
        IconsResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Progress tracker',
        short_name: 'Tracker',
        theme_color: '#1FB2A5',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('src/assets/icons.json')) {
            return 'icons'
          }

          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    }
  },
})