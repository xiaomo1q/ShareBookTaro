/* eslint-disable quotes */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path');

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_f2dwsq2e32`;
  // 导入
  config.multipart = {
    fileSize: '400mb', // 文件大小
    mode: "stream", // file
    whitelist: [
      ".xls",
      ".xlsx",
      ".png",
      ".jpg",
      ".svg",
      ".pdf",
      ".word",
      ".txt",
      '.mp3', '.mp4', '.avi',
    ], // 文件类型白名单;报400错;一般就是你没写这句话;允许接收解析该类型文件;
    // 默认内置白名单
    // images 支持 '.jpg', '.jpeg','.png', '.gif', '.bmp', '.wbmp', '.webp','.tif','.psd',
    // text '.svg','.js', '.jsx', '.json','.css', '.less','.html', '.htm','.xml',
    // tar '.zip','.gz', '.tgz', '.gzip',
    // video '.mp3','.mp4','.avi',
  };

  // 中间件配置'errorHandler',
  config.middleware = ["tokenHandler"];
  config.tokenHandler = {
    ignore: ["/api/registered", "/api/login", "/api/download", '/api/captcha', '/api/downExcel', '/api/video'], // 忽略注册和登陆的接口
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // domainWhiteList: [ '*' ], // []中放放出的白名单，*代表所有
  };
  // 白名单 domainWhiteList: ['127.0.0.1:8080']
  // 配置跨域 config.cors = { origin: 'http:127.0.0.1:8080'
  // 匹配规则 域名+端口 *则为全匹配 allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', credentials: true };
  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH",
    credentials: true,
  };
  // 配置访问地址
  config.cluster = {
    listen: {
      path: '',
      port: 3000,
      // hostname: '172.30.176.1',
    },
  };
  // // Gzip 压缩阈值
  // config.compress = {
  //   threshold: 1000
  // };
  // 鉴权 生成token
  config.jwt = {
    secret: "123456", // 自定义token的加密条件字符串，可按各自的需求填写
    ignore: ["/api/registered", "/api/login", "/api/download", '/api/captcha', '/api/downExcel', '/api/video'], // 哪些请求不需要认证
    // enable: true, // default is false
    // match: '/jwt', // optional
    expiresIn: "24h",
  };
  // config中配置mongoose连接mongodb数据库
  // Mongodb://eggadmin:123456@localhost:27017 //有用户名密码的情况
  // user 数据库名称
  config.mongoose = {
    client: {
      url: "mongodb://127.0.0.1:27017/user",
      options: {
        useNewUrlParser: true,
      },
    },
  };
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      "/": {
        // 预处理器中间件, 我们这里配置了一个auth, 进行权限判断, 它对应的文件是/app/io/middleware/connection.js, 这里可以配置多个文件, 用逗号隔开
        connectionMiddleware: ["connection"], // 在连接或者断开连接时起作用的中间件 权限校验之类的操作connection
        packetMiddleware: [], // 通常用于对消息做预处理，又或者是对加密消息的解密等操作
      },
      // '/chat': {
      //   connectionMiddleware: [ 'connection' ],
      //   packetMiddleware: [],
      // },
    },
    // generateId: req => { // 自定义 socket.id 生成函数
    //   return Math.round(Math.random(10000) * 10000, 4)
    //   // const data = qs.parse(req.url.split('?')[1]);
    //   // return data.userId; // custom id must be unique
    // },
    // 配置redis, 非必须, 不需要的可以不配置这块, egg-socket.io内置了socket-io-redis， 在cluster模式下, 使用redis可以较为简单的实现clients/rooms等信息共享
    // redis: {
    // host: '192.168.31.162',
    // prot: 6379,
    // auth_pass: 123456,
    // db: 0,
    // },
  };
  // 静态资源
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public/'),
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
