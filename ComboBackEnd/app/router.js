'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, middleware, io } = app;
    // 引入 使用egg-jwt中间件来授权，授权成功才会执行下一个中间件
    const jwt = middleware.jwt(app.config.jwt);
    // router.get('/', controller.user.test); // 注册
    router.get('/api/registered', controller.user.registered); // 注册
    router.get('/api/loginH5', controller.user.loginH5); // loginH5

    router.post('/api/login_code', controller.user.login_code); // 获取openid
    router.post('/api/login_user', controller.user.login_user); // 登录并生成Token
    router.post('/api/get_userInfo', controller.user.get_userInfo); // 登录并生成Token

    router.post('/api/add_only_book', jwt, controller.book.add_only_book); // 添加图书信息
    router.post('/api/update_only_book', jwt, controller.book.update_only_book); // update图书信息
    router.get('/api/get_connect_book_list', jwt, controller.book.get_connect_book_list); // 拥有书主
    router.delete('/api/del_connect_book_list', jwt, controller.book.del_connect_book_list); // 拥有书主
    router.get('/api/get_bookuser_userInfo', jwt, controller.user.get_bookuser_userInfo); // 书主个人信息
    router.post('/api/update_userInfo', jwt, controller.user.update_userInfo); // 修改书主个人信息

    router.get('/api/get_book_type', controller.book.get_book_type); // 获取图书类型
    router.get('/api/get_book_list', controller.book.get_book_list); // 获取图书列表
    router.get('/api/get_only_book_detail', jwt, controller.book.get_only_book_detail); // 获取图书详情
    router.get('/api/search_book_list', controller.book.search_book_list); // 搜索
    router.get('/api/get_favorite_book_list', jwt, controller.book.get_favorite_book_list); // 收藏列表
    router.delete('/api/del_favorite_book_list', jwt, controller.book.del_favorite_book_list); // 收藏列表
    router.get('/api/add_favorite_book', jwt, controller.book.add_favorite_book); // 收藏

    router.get('/api/get_exchange_square_list', controller.exchangeSquare.get_exchange_square_list); // 书圈广场
    router.get('/api/get_exchange_square_detail', jwt, controller.exchangeSquare.get_exchange_square_detail); // 书圈广场详情
    router.post('/api/add_exchange_square_detail', jwt, controller.exchangeSquare.add_exchange_square_detail); // 填写书评
    router.post('/api/add_only_square_review', jwt, controller.exchangeSquare.add_only_square_review); // 评论
    router.post('/api/add_only_square_fav', jwt, controller.exchangeSquare.add_only_square_fav); // 书圈点赞
    router.post('/api/file/img/upload/', jwt, controller.exchangeSquare.file_img_upload); // 上传图片
    router.post('/api/file/img/delete/', jwt, controller.exchangeSquare.file_img_delete); // del图片

    router.get('/api/add_fans_followers', jwt, controller.user.add_fans_followers); // 
    router.delete('/api/del_fans_followers', jwt, controller.user.del_fans_followers); // 


    // 聊天
    router.post('/api/add_messages', jwt, controller.messages.add_messages); // 创建房间
    router.get('/api/msg_list', jwt, controller.messages.msg_list); // 群聊列表
    router.get('/api/get_toUser_book_list', jwt, controller.messages.get_toUser_book_list); // 查询卖家的书库
    router.post('/api/add_order_information', jwt, controller.messages.add_order_information); // 生成订单记录
    router.post('/api/get_order_information', jwt, controller.messages.get_order_information); // 查询订单记录

    /**
     * 平台
     */
    router.get('/api/admin/login', controller.adminUser.login); // 登录
    router.get('/api/admin/captcha', controller.adminUser.captcha); // 验证码
    router.post('/api/admin/get_book_type', controller.adminUser.get_book_type); // 分类
    router.post('/api/admin/get_book_list', controller.adminUser.get_book_list); // 列表
    router.post('/api/admin/add_only_book', controller.adminUser.add_only_book); // 列表
    router.post('/api/admin/update_only_book', controller.adminUser.update_only_book); // 列表
    router.delete('/api/admin/del_only_book', controller.adminUser.del_only_book); // 列表

    router.post('/api/admin/get_userinfo_list', controller.adminUser.get_userinfo_list); // 列表
    router.post('/api/admin/update_only_userinfo', controller.adminUser.update_only_userinfo); // 列表
    router.delete('/api/admin/del_only_userinfo', controller.adminUser.del_only_userinfo); // 列表



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