module.exports = {
    env: {
        NODE_ENV: '"development"',
        baseUrl: '"http://127.0.0.1:3000"',
    },
    defineConstants: {},
    mini: {
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
        devServer: {
            proxy: [{
                context: ["/api"],
                target: "http://127.0.0.1:3000", //域名
                pathRewrite: {
                    "^/api": "/api",
                },
                changeOrigin: true,
                secure: false,
            },
                // {
                //     context: ["/api"],
                //     target: "https://api.ituring.com.cn", //域名
                //     pathRewrite: {
                //         "^/api": "/api",
                //     },
                //     changeOrigin: true,
                //     secure: false,
                // },
            ]
        },
    },
}