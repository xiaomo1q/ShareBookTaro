'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  * chat() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    // const { m_id } = yield ctx.request.query;
    // console.log(ctx.args, '.......*******%%%%%%%%');
    if (ctx.args[1]) {
      const message = ctx.args[1] || {};
      yield app.mysql.insert('messages', message);
    }
    if (ctx.args[0]) {
      const corr = yield app.mysql.select('messages', { where: { gm_id: ctx.args[0].m_id } });
      // // 向客户端广播消息， 在客户端监听broadcast事件就可以获取消息了
      nsp.emit('chat', corr);
    } else {
      nsp.emit('chat', []);
    }
  }
}

module.exports = DefaultController;
