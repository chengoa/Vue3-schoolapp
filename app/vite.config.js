import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import styleImport from 'vite-plugin-style-import'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: '@nutui/nutui',
          libraryNameChangeCase: 'pascalCase',
          resolveStyle: (name) => {
            return `@nutui/nutui/dist/packages/${name}/index.scss`
          }
        }
      ],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 配置 nutui 全局 scss 变量
        additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";`
      }
    }
  },
  base: "./",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  server: {
    host: '127.0.0.1',
    port: 3000,//启动端口
    proxy: {
      '/api': {
        target: 'https://view.inews.qq.com',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/juheapi': {
        target: 'http://apis.juhe.cn/springTravel/risk',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
  
     
    }
  }

})