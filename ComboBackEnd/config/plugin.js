'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }

    // 跨域
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    mysql: {
        enable: true,
        package: 'egg-mysql',
    },
    // mongodb 数据库
    mongoose: {
        enable: true, // 开启插件
        package: 'egg-mongoose',
    },
    //  鉴权
    jwt: {
        enable: true,
        package: 'egg-jwt',
    },
    // websocket
    io: {
        enable: true,
        package: 'egg-socket.io',
    },
};