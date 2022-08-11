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
        375: 2 / 1,
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2
    },
    env: {
        URL: '"https://xxxx/health"'
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [
        ["taro-plugin-style-resource", lessPluginOptions]
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
        plugins: ['taro-plugin-compiler-optimization'],
        optimizeMainPackage: {
            enable: true
        },
        postcss: {
            pxtransform: {
                enable: true,
                config: {
                    selectorBlackList: [/van-/]
                }
            },
            url: {
                enable: true,
                config: {
                    limit: 1024 // 设定转换尺寸上限
                }
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        },
        webpackChain: (chain, webpack) => {
            chain.merge({
                plugin: {
                    install: {
                        plugin: require('terser-webpack-plugin'),
                        args: [{
                            terserOptions: {
                                compress: true, // 默认使用terser压缩
                                // mangle: false,
                                keep_classnames: true, // 不改变class名称
                                keep_fnames: true // 不改变函数名称
                            }
                        }]
                    }
                }
            })
        }
    },
    h5: {
        publicPath: '/',
        devServer: {
            hot: true
        },
        staticDirectory: 'static',
        // esnextModules: [/@antmjs[\\/]vantui/],
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
            }
        }
    }
}

module.exports = function(merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }
    return merge({}, config, require('./prod'))
}