'use strict';
/** 控制器 */
const Controller = require('egg').Controller;
const await = require('await-stream-ready/lib/await');
const svgCaptcha = require('svg-captcha');

class IndexController extends Controller {
  async overview_data() {
    const { ctx, app } = this;
    // mysql事务
    const conn = await app.mysql.beginTransaction();
    try {
      const visits_today = await conn.query('select COUNT(*) as total from userinfo where to_days(update_date) = to_days(now())');
      const total_books = await conn.query('select COUNT(*) as total from db_book_list');
      const total_book_reviews = await conn.query('select COUNT(*) as total from exchange_square');
      const total_users = await conn.query('select COUNT(*) as total from userinfo');
      const total_users_pie = await conn.query("SELECT COUNT(*) as value, CASE gender WHEN '0' THEN '男'WHEN '1' THEN '女' END AS name FROM userinfo GROUP BY gender");
      const total_users_bar = await conn.query('SELECT book_type as name,COUNT(*) as value  FROM db_book_list GROUP BY book_type');
      const notice = await conn.query('SELECT * FROM notice_list');
      ctx.body = {
        visits_today: visits_today[0].total,
        total_books: total_books[0].total,
        total_users: total_users[0].total,
        total_book_reviews: total_book_reviews[0].total,
        bar: total_users_bar,
        pie: total_users_pie,
        notice,
      };
      await conn.commit();
    } catch (error) {
      await conn.rollback(); // rollback call won't throw err
      throw error;
    }

  }
  /** 登录 */
  async login() {
    const params = await this.ctx.request.query;
    const { ctx, app } = this;
    const corr = await app.mysql.get('admin_user', { username: params.name });
    // 如果不存在：就是该用户的第一次登录，后台数据库新添加一个用户信息
    // 如果存在：就不是该用户的第一次登录，以前登陆过，就更新后台数据库中该用户的第一次登录时间
    // 返回用户信息
    if (corr) {
      if (corr.password === params.password) {
        // 生成Token
        const Token = app.jwt.sign({
          openid: params.password, // 需要存储的Token数据
        }, app.config.jwt.secret, { expiresIn: '3600h' });
        await app.mysql.update('admin_user', { token: Token }, { where: { username: params.name }, });
        ctx.body = { code: 0, role: corr.role, name: corr.username, token: Token };
      } else {
        ctx.body = { code: 2, msg: '账号或密码不正确' };
      }
    } else {
      ctx.body = { code: 2, msg: '账号不存在' };
    }

  }

  /** 获取图书分类  */
  async get_book_type() {
    const { ctx, app } = this;
    const result = await app.mysql.query('select * from book_type');
    ctx.body = result;
  }
  /** 根据分类图书列表 */
  async get_book_list() {
    const { pageCount, pageIndex, search } = this.ctx.request.body;
    const query = !!search ? search : {}; // 查询条件
    const result = await this.app.mysql.select('db_book_list', {
      where: query,
      orders: [["create_time", 'desc']],    // 排列
      limit: Number(pageCount), // 返回数据量
      offset: (pageCount * pageIndex) - pageCount, // 数据偏移量
    });
    const totalCount = await this.app.mysql.count('db_book_list', query);
    this.ctx.body = {
      code: 0,
      list: result,
      pageCount,
      pageIndex,
      total: totalCount,
    };
  }
  /** 添加图书 */
  async add_only_book() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    try {
      const corr = await app.mysql.get('db_book_list', { isbn: params.isbn });
      if (!!corr) {
        ctx.body = { code: 1, msg: '图书已存在' }
      } else {
        await app.mysql.insert('db_book_list', { ...params, create_time: new Date() });
        ctx.body = { code: 0, msg: '添加成功' }
      }
    } catch (error) {
      ctx.body = { code: 1, msg: '添加失败' }
    }
  }
  /** update图书 */
  async update_only_book() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    try {
      await app.mysql.update('db_book_list', params, { where: { isbn: params.isbn } });
      ctx.body = { code: 0, msg: '修改成功' }
    } catch (error) {
      ctx.body = { code: 1, msg: '修改失败' }
    }
  }
  /** del */
  async del_only_book() {
    const { ctx, app } = this;
    const { isbn } = ctx.request.query;
    try {
      await app.mysql.delete('db_book_list', { isbn });
      ctx.body = { code: 0, msg: '删除成功' }
    } catch (error) {
      ctx.body = { code: 1, msg: '删除失败' }
    }
  }
  /** 根据用户列表 */
  async get_userinfo_list() {
    const { pageCount, pageIndex, search } = this.ctx.request.body;
    const query = !!search ? search : {}; // 查询条件
    const result = await this.app.mysql.select('userinfo', {
      where: query,
      orders: [["create_time", 'desc']],    // 排列
      limit: Number(pageCount), // 返回数据量
      offset: (pageCount * pageIndex) - pageCount, // 数据偏移量
    });
    const totalCount = await this.app.mysql.count('userinfo', query);
    this.ctx.body = {
      code: 0,
      list: result,
      pageCount,
      pageIndex,
      total: totalCount,
    };
  }
  /** update图书 */
  async update_only_userinfo() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    try {
      await app.mysql.update('userinfo', params, { where: { openid: params.openid } });
      ctx.body = { code: 0, msg: '修改成功' }
    } catch (error) {
      ctx.body = { code: 1, msg: '修改失败' }
    }
  }
  /** del */
  async del_only_userinfo() {
    const { ctx, app } = this;
    const { openid } = ctx.request.query;
    try {
      await app.mysql.delete('userinfo', { openid });
      ctx.body = { code: 0, msg: '删除成功' }
    } catch (error) {
      ctx.body = { code: 1, msg: '删除失败' }
    }
  }

  async notice_list() {
    const { ctx, app } = this;
    const { type, params } = ctx.request.body;
    try {
      switch (type) {
        case 'add':
          await app.mysql.insert('notice_list', { ...params, create_time: new Date() });
          ctx.body = { code: 0, msg: '添加成功' }
          break;
        case 'update':
          await app.mysql.update('notice_list', { ...params, create_time: new Date() }, { where: { id: params.id } });
          ctx.body = { code: 0, msg: '修改成功' }
          break;
        case 'delete':
          await app.mysql.delete('notice_list', { id: params.id });
          ctx.body = { code: 0, msg: '修改成功' }
          break;
        default:
          break;
      }
    } catch (error) {
      ctx.body = { code: 0, msg: '失败' }
    }
  }
  // // 用户列表
  // async userList() {
  //     const list = await this.ctx.model.User.find({});
  //     this.ctx.body = list;
  // }

  // // 用户身份
  // async userRole() {
  //     const {
  //         ctx
  //     } = this;
  //     const params = await this.ctx.request.body;
  //     await this.ctx.model.User.updateOne({
  //         _id: params.id
  //     }, params, {
  //         multi: true
  //     });
  //     ctx.body = 'update';
  // }

  // // del用户
  // async userDel() {
  //     const {
  //         ctx
  //     } = this;
  //     if (ctx.query.username === ctx.state.user.username) {
  //         ctx.body = '自己无法删除自己！！！！';
  //     } else {
  //         await this.ctx.model.User.remove({
  //             username: ctx.query.username
  //         });
  //         ctx.body = 'del';
  //     }

  // }

  // 验证码
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 40,
      ignoreChars: 'Ooli',
      width: 80,
      height: 30,
      noise: 3,
      color: true,
      background: '#ccc',
    });
    this.ctx.session.captcha = captcha.text;
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = {
      text: captcha.text,
      img: captcha.data,
    };
  }

  /** 查询订单记录 */
  async get_order_information() {
    const { ctx, app } = this;
    const { pageCount, pageIndex, search } = ctx.request.body;
    const query = !!search ? search : {}; // 查询条件
    const result = await app.mysql.select('order_information', {
      where: query,
      orders: [["create_time", 'desc']],    // 排列
      limit: Number(pageCount), // 返回数据量
      offset: (pageCount * pageIndex) - pageCount, // 数据偏移量
    });
    const totalCount = await app.mysql.count('order_information', query);
    ctx.body = {
      code: 0,
      list: result,
      pageCount,
      pageIndex,
      total: totalCount,
    };
  }
}

module.exports = IndexController;