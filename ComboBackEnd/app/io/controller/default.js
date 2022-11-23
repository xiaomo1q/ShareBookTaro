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
      const corr = yield app.mysql.select('messages', { where: { gm_id: ctx.args[0].m_id } });
      console.log(!!message.isSend);
      const objMsg = !!message.isSend ? JSON.parse(message.isSend) : {}
      const filter = corr.filter(i => {
        const obj = !!i.isSend && i.isSend.isbn ? i.isSend : JSON.parse(i.isSend)
        if (!!obj) {
          console.log(obj.isbn, objMsg.isbn, '....', obj.status);
          return obj.isbn === objMsg.isbn && !!obj.status && obj.status === objMsg.status
        }
      })
      console.log(!!filter, filter.length > 0);
      if (!!filter && filter.length > 0) { } else { yield app.mysql.insert('messages', message); }

    }
    if (ctx.args[0]) {
      const corr = yield app.mysql.select('messages', { where: { gm_id: ctx.args[0].m_id } });
      for (let i = 0; i < corr.length; i++) {
        const el = corr[i];
        if (!!el.isSend) {
          el.isSend = JSON.parse(el.isSend)
        }
      }
      // // 向客户端广播消息， 在客户端监听broadcast事件就可以获取消息了
      nsp.emit('chat', corr);
    } else {
      nsp.emit('chat', []);
    }
  }
}

module.exports = DefaultController;
