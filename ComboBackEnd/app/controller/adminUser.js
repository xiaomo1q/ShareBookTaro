'use strict';
/** 控制器 */
const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class IndexController extends Controller {
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
    const result = await app.mysql.query('select distinct book_type from db_book_list');
    ctx.body = result;
  }
  /** 根据分类图书列表 */
  async get_book_list() {
    const { pageCount, pageIndex, title } = this.ctx.request.body;
    const query = title ? { book_type: title } : {}; // 查询条件
    const result = await this.app.mysql.select('db_book_list', {
      where: query,
      limit: Number(pageCount), // 返回数据量
      offset: (pageCount - 1) * pageIndex, // 数据偏移量
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
}

module.exports = IndexController;