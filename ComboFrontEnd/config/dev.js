import path from 'path'

// eslint-disable-next-line import/no-commonjs
module.exports = {
    env: {
        NODE_ENV: '"development"',
        baseUrl: '"http://127.0.0.1:3030"',
        // baseUrl: '"http://www.piscesxiaopan.com"',
    },
    plugins: [
        path.resolve(__dirname, './minifyMainPackage.js'),
    ],
    defineConstants: {},
    h5: {
        devServer: {
            proxy: [{
                    context: ["/api"],
                    target: "http://127.0.0.1:3030", //域名
                    // target: "http://www.piscesxiaopan.com", //域名
                    pathRewrite: {
                        "^/api": "/api",
                    },
                    changeOrigin: true,
                    secure: false,
                },
            ]
        },
    },
}