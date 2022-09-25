module.exports = {
    env: {
        NODE_ENV: '"development"',
        baseUrl: '"http://127.0.0.1:3000"',
    },
    defineConstants: {},
    mini: {},
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