module.exports = {
  env: {
    NODE_ENV: '"development"',
    baseUrl: '"http://xxxx:8000"',
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      proxy: [
        // {
        //   context: ["/api"],
        //   target: "http://xxx.xxx.xxx.xxx:8000", //域名
        //   pathRewrite: {
        //     "^/api": "/api",
        //   },
        //   changeOrigin: true,
        //   secure: false,
        // },
        {
          context: ["/api"],
          target: "https://api.ituring.com.cn", //域名
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
