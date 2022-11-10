'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, middleware, io } = app;
    // 引入 使用egg-jwt中间件来授权，授权成功才会执行下一个中间件
    const jwt = middleware.jwt(app.config.jwt);
    router.get('/api/registered', controller.user.registered); // 注册
    router.get('/api/loginH5', controller.user.loginH5); // loginH5

    router.post('/api/login_code', controller.user.login_code); // 获取openid
    router.post('/api/login_user', controller.user.login_user); // 登录并生成Token
    router.post('/api/get_userInfo', controller.user.get_userInfo); // 登录并生成Token

    router.post('/api/add_only_book', jwt, controller.book.add_only_book); // 添加图书信息
    router.get('/api/get_connect_book_list', jwt, controller.book.get_connect_book_list); // 拥有书主
    router.get('/api/get_bookuser_userInfo', jwt, controller.user.get_bookuser_userInfo); // 书主个人信息

    router.get('/api/get_book_type', controller.book.get_book_type); // 获取图书类型
    router.get('/api/get_book_list', controller.book.get_book_list); // 获取图书列表
    router.get('/api/get_only_book_detail', jwt, controller.book.get_only_book_detail); // 获取图书详情
    router.get('/api/search_book_list', controller.book.search_book_list); // 搜索
    router.get('/api/get_favorite_book_list', jwt, controller.book.get_favorite_book_list); // 收藏列表
    router.get('/api/add_favorite_book', jwt, controller.book.add_favorite_book); // 收藏

    router.get('/api/get_exchange_square_list', jwt, controller.exchangeSquare.get_exchange_square_list); // 书圈广场
    router.post('/api/add_exchange_square_detail', jwt, controller.exchangeSquare.add_exchange_square_detail); // 填写书评

    // 聊天
    router.post('/api/add_messages', jwt, controller.messages.add_messages); // 创建房间
    router.get('/api/msg_list', jwt, controller.messages.msg_list); // 群聊列表

    /**
     * 平台
     */
    router.get('/api/admin/login', controller.adminUser.login); // 登录
    router.get('/api/admin/captcha', controller.adminUser.captcha); // 验证码
    router.post('/api/admin/get_book_type', jwt, controller.adminUser.get_book_type); // 分类
    router.post('/api/admin/get_book_list', controller.adminUser.get_book_list); // 列表
    //   router.resources('routerName', 'pathMatch', controller.class);
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
    io.of('/').route('chat', io.controller.default.chat);

    /** 路由 */
    // router.get('/api/route', jwt, controller.route.index);
};