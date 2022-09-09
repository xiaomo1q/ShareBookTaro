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
  // // 导入
  // config.multipart = {
  //     fileSize: '400mb', // 文件大小
  //     mode: "stream", // file
  //     whitelist: [
  //         ".xls",
  //         ".xlsx",
  //         ".png",
  //         ".jpg",
  //         ".svg",
  //         ".pdf",
  //         ".word",
  //         ".txt",
  //         '.mp3', '.mp4', '.avi',
  //     ], // 文件类型白名单;报400错;一般就是你没写这句话;允许接收解析该类型文件;
  //     // 默认内置白名单
  //     // images 支持 '.jpg', '.jpeg','.png', '.gif', '.bmp', '.wbmp', '.webp','.tif','.psd',
  //     // text '.svg','.js', '.jsx', '.json','.css', '.less','.html', '.htm','.xml',
  //     // tar '.zip','.gz', '.tgz', '.gzip',
  //     // video '.mp3','.mp4','.avi',
  // };

  // 中间件配置'errorHandler',
  // config.middleware = ["tokenHandler"];
  // config.tokenHandler = {
  //     ignore: ["/api/registered", "/api/login", "/api/download", '/api/captcha', '/api/downExcel', '/api/video'], // 忽略注册和登陆的接口
  // };
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
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'book',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
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