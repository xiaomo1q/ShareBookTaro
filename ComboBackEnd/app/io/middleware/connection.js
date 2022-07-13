'use strict';

module.exports = app => {
  return async (ctx, next) => {
    // const { ctx } = this;
    const nsp = app.io.of('/');
    // 向客户端推送online事件
    // nsp.emit('res', '有新成员加入聊天室了');
    // app.io.on('connection', function(socket) {
    //   console.log('客户端连接上了服务器');
    //   console.log(socket);
    //   // 就收客户端发送的消息
    //   socket.on('chat', function(data) {
    //     console.log('服务器接收到客户端的信息：', data);
    //   });
    // });
    await next();
  };
};
