module.exports = {
  env: {
    NODE_ENV: '"production"',
    baseUrl: '"http://www.piscesxiaopan.com"',
  },
  defineConstants: {
  },
  mini: {
    plugins: ['taro-plugin-compiler-optimization'],
    optimizeMainPackage: {
      enable: true
    },
    // esnextModules: [/@antmjs[\\/]vantui/, 'taro-ui'],
    // esnextModules: ['taro-ui'],
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/van-/]
        }
      },
      "postcss-px-scale": {
        "enable": true,
        "config": {
          "scale": 0.5, //缩放为1/2
          "units": "rpx",
          "includes": ["taro-ui"]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    // webpackChain: (chain, webpack) => {
    //     chain.merge({
    //         plugin: {
    //             install: {
    //                 plugin: require('terser-webpack-plugin'),
    //                 args: [{
    //                     terserOptions: {
    //                         compress: true, // 默认使用terser压缩
    //                         // mangle: false,
    //                         keep_classnames: true, // 不改变class名称
    //                         keep_fnames: true // 不改变函数名称
    //                     }
    //                 }]
    //             }
    //         }
    //     })
    // }
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 10240 // 文件大小限制
          }
        }
      }
    }
  },
  h5: {
    devServer: {
      proxy: [{
        context: ["/api"],
        target: "http://www.piscesxiaopan.com", //域名
        pathRewrite: {
          '^/api': '/api'
        },
        changeOrigin: true,
        secure: false,
      },]
    },
    /**
     * WebpackChain 插件配置
     * @docs https://github.com/neutrinojs/webpack-chain
     */
    // webpackChain (chain) {
    //   /**
    //    * 如果 h5 端编译后体积过大，可以使用 webpack-bundle-analyzer 插件对打包体积进行分析。
    //    * @docs https://github.com/webpack-contrib/webpack-bundle-analyzer
    //    */
    //   chain.plugin('analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])

    //   /**
    //    * 如果 h5 端首屏加载时间过长，可以使用 prerender-spa-plugin 插件预加载首页。
    //    * @docs https://github.com/chrisvfritz/prerender-spa-plugin
    //    */
    //   const path = require('path')
    //   const Prerender = require('prerender-spa-plugin')
    //   const staticDir = path.join(__dirname, '..', 'dist')
    //   chain
    //     .plugin('prerender')
    //     .use(new Prerender({
    //       staticDir,
    //       routes: [ '/pages/index/index' ],
    //       postProcess: (context) => ({ ...context, outputPath: path.join(staticDir, 'index.html') })
    //     }))
    // }
  },
  uglify: {
    enable: true,
    config: {
      // 配置项同 https://github.com/mishoo/UglifyJS2#minify-options
    }
  }
}
