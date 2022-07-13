'use strict';
/** 服务器 调用数据库 */
const Service = require('egg').Service;

class IndexService extends Service {
  // 注册
  * registered(params) {
    // 注册判断是否存在
    const corr = yield this.ctx.model.User.findOne({ username: params.username });
    params.role = 'user';
    if (!corr) {
      yield this.ctx.model.User.insertMany([params]);
      this.ctx.body = '注册成功';
    } else {
      this.ctx.body = '该用户名已注册';
    }
  }

  // 登录
  * login(params) {
    const { ctx, app } = this;
    const corr = yield ctx.model.User.findOne({ username: params.username });
    // 用户是否存在
    if (!corr) {
      this.ctx.body = '用户名错误';
    } else {
      if (params.password === corr.password) {
        // 生成Token
        const Token = app.jwt.sign({
          username: params.username,	// 需要存储的Token数据
        }, app.config.jwt.secret, { expiresIn: '24h' });
        // token 存储至数据库中
        yield ctx.model.User.updateOne({ username: params.username }, { token: Token }, { multi: true });
        const user = yield ctx.model.User.findOne({ username: params.username });
        // 将生成的Token返回给前端
        ctx.body = user;
      } else {
        this.ctx.body = '密码错误,请重新输入!';
      }
    }
  }
}

module.exports = IndexService;
