import path from "path";

/**
 * @typedef { import("taro-plugin-style-resource").PluginOptions } PluginOptions
 * @type {PluginOptions}
 */
const lessPluginOptions = {
    less: {
        patterns: [path.resolve(__dirname, "..", "src/assets/common.less")],
    },
};
const config = {
    projectName: 'shareBook',
    date: '2022-7-12',
    designWidth: 375,
    deviceRatio: {
        '640': 2.34 / 2,
        '750': 1,
        '828': 1.81 / 2,
        '375': 2 / 1
    },
    env: {
        URL: '"https://images-1300238189.cos.ap-shanghai.myqcloud.com/"'
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [
        ["taro-plugin-style-resource", lessPluginOptions],
    ],
    defineConstants: {},
    // 压缩 JS 代码
    terser: {
        enable: true,
        config: {
            // 配置项同 https://github.com/terser/terser#minify-options
        }
    },
    // 压缩 css 代码
    csso: {
        enable: true,
        config: {
            // 配置项同 https://github.com/css/csso#minifysource-options
        }
    },
    copy: {
        patterns: [],
        options: {}
    },
    framework: 'react',
    /** 别名 */
    alias: {
        '@/components': path.resolve(__dirname, '..', 'src/components'),
        '@/utils': path.resolve(__dirname, '..', 'src/utils'),
        '@/service': path.resolve(__dirname, '..', 'src/service'),
        '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    },
    mini: {
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
        }
    },
    h5: {
        publicPath: '/',
        devServer: {
            hot: true
        },
        staticDirectory: 'static',
        // esnextModules: ['taro-ui', /@antmjs[\\/]vantui/],
        esnextModules: ['taro-ui'],
        postcss: {
            autoprefixer: {
                enable: true,
                config: {}
            },
            cssModules: {
                enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            },
            "postcss-px-scale": {
                "enable": true,
                "config": {
                    "scale": 0.5, //缩放为1/2
                    "units": "rem",
                    "includes": ["taro-ui"]
                }
            },
        }
    }
}

module.exports = function(merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }
    return merge({}, config, require('./prod'))
}