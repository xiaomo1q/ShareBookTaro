'use strict';
/** 控制器 */
const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class IndexController extends Controller {
  // async index() {
  //   const ctx = this.ctx
  //   const authorization = ctx.get('Authorization');
  //   if (authorization === '') { // 判断请求头有没有携带 token ,没有直接返回 401
  //     ctx.throw(401, 'no token detected in http header "Authorization"');
  //   }
  //   const token = authorization.split(' ')[1];
  //   // console.log(token)
  //   let tokenContent;
  //   try {
  //     tokenContent = await jwt.verify(token, 'shenzhouhaotian');     //如果 token 过期或验证失败，将返回401
  //     console.log(tokenContent)
  //     ctx.body = tokenContent     // token有效，返回 userInfo ;同理，其它接口在这里处理对应逻辑并返回
  //   } catch (err) {
  //     ctx.throw(401, 'invalid token');
  //   }
  // }
  /** 注册 */
  * registered() {
    const params = yield this.ctx.request.body;
    yield this.ctx.service.user.registered(params);
  }

  /** 登录 */
  * login() {
    const params = yield this.ctx.request.body;
    yield this.ctx.service.user.login(params);
  }

  // 登出
  * logout() {
    yield this.ctx.model.User.updateOne({ username: this.ctx.state.user.username }, { token: '' }, { multi: true });
    this.ctx.body = 'out';
  }

  // 用户列表
  * userList() {
    const list = yield this.ctx.model.User.find({});
    this.ctx.body = list;
  }

  // 用户身份
  * userRole() {
    const { ctx } = this;
    const params = yield this.ctx.request.body;
    yield this.ctx.model.User.updateOne({ _id: params.id }, params, { multi: true });
    ctx.body = 'update';
  }

  // del用户
  * userDel() {
    const { ctx } = this;
    if (ctx.query.username === ctx.state.user.username) {
      ctx.body = '自己无法删除自己！！！！';
    } else {
      yield this.ctx.model.User.remove({ username: ctx.query.username });
      ctx.body = 'del';
    }

  }

  // 验证码
  * captcha() {
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
