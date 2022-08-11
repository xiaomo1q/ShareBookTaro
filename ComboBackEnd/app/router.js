'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt, io } = app;
    router.get('/', controller.home.index);
    // router.post('/api/registered', controller.user.registered); // 注册
    // router.post('/api/login', controller.user.login); // 登录并生成Token
    // router.get('/api/captcha', controller.user.captcha); // 登录并生成Token

    // 使用egg-jwt中间件来授权，授权成功才会执行下一个中间件
    //   router.resources('routerName', 'pathMatch', controller.class);
    // router.get('/api/logout', jwt, controller.user.logout); // 登出并清除token
    // router.resources('list', '/api/list', jwt, controller.class);	// 需要验证Token的路由
    // router.put('/api/list', jwt, controller.class.update);	// update
    // router.delete('/api/list', jwt, controller.class.destroy);	// del
    // router.post('/api/excel/import', jwt, controller.class.importExcel);	// 导入
    // router.post('/api/uploadImg', jwt, controller.class.uploadImg);	// 导入文件流
    // router.get('/api/download', controller.class.downloadFile);	// 导出excel
    // router.get('/api/downExcel', controller.class.downExcel); // 导出excel
    // router.post('/api/video', controller.class.video); // 导入video

    /** 用户列表 */
    // router.get('/api/userList', jwt, controller.user.userList);
    // router.post('/api/userRole', jwt, controller.user.userRole);
    // router.delete('/api/userDel', jwt, controller.user.userDel);

    /** ws */
    // io.of('/').route('chat', io.controller.default.chat);

    /** 路由 */
    // router.get('/api/route', jwt, controller.route.index);
};