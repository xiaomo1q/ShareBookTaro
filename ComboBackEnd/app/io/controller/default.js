'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  * chat() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    if (ctx.args[0]) {
      const message = ctx.args[0] || {};
      yield app.model.Chatroom.create(message);
    }
    const corr = yield ctx.model.Chatroom.find();
    // 向客户端广播消息， 在客户端监听broadcast事件就可以获取消息了
    nsp.emit('chat', corr);

  }
}

module.exports = DefaultController;
