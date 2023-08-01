import { fileURLToPath, URL } from 'node:url'
import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import dts from 'vite-plugin-dts'
import viteCompression from 'vite-plugin-compression'
//按需加载vxe-table
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import'

//按需加载antd-vue
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    dts(),
    vueJsx(),
    createSvgIconsPlugin({ // ========================== 
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'packages/assets/svg')],
      // 指定 symbolId 的格式
      symbolId: 'icon-[name]'
    }),
    createStyleImportPlugin({
      resolves: [
        VxeTableResolve()
      ],
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    viteCompression({
      verbose: true,
      disable: false, // 不禁用压缩
      deleteOriginFile: false, // 压缩后是否删除原文件
      threshold: 10240, // 压缩前最小文件大小
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 文件类型
    }),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./packages', import.meta.url))
      '@': resolve(__dirname, 'packages'),
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
  },
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       modifyVars: { // 或者globalVars
  //         // `themeColor` is global variables fields name
  //         themeColor: '#1890FF'
  //       },
  //       javascriptEnabled: true
  //     },
  //   },
  // },
  // 配置打包入口
  build: {
    outDir: 'lib',
    lib: { // 构建为库。如果指定了 build.lib，build.cssCodeSplit 会默认为 false。
      // __dirname的值是vite.config.ts文件所在目录
      entry: resolve(__dirname, 'packages/index.ts'),  // entry是必需的，因为库不能使用HTML作为入口。
      name: 'VueKakaUi', // 暴露的全局变量
      fileName: 'vue-kaka-ui' // 输出的包文件名，默认是package.json的name选项
    },
    rollupOptions: { // 自定义底层的Rollup打包配置
      // https://rollupjs.org/configuration-options/
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'antd'],
      output: {
        exports: 'named', // https://rollupjs.org/configuration-options/#output-exports
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          antd: 'ant-design-vue'
        }
      }
    },
    /** 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。
        默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。
        注意，在 lib 模式下使用 'es' 时，build.minify 选项不会缩减空格，因为会移除掉 pure 标注，导致破坏 tree-shaking。
        当设置为 'terser' 时必须先安装 Terser。（yarn add terser -D）
    */
    minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
    terserOptions: { // 在打包代码时移除 console、debugger 和 注释
      compress: {
        /* (default: false) -- Pass true to discard calls to console.* functions.
          If you wish to drop a specific function call such as console.info and/or
          retain side effects from function arguments after dropping the function
          call then use pure_funcs instead
        */
        drop_console: true, // 生产环境时移除console
        drop_debugger: true
      },
      format: {
        comments: false // 删除注释comments
      }
    }
  }
})
