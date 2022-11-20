'use strict';
/**
 * @description: token错误处理
 * @return
 */

module.exports = (options, app) => {
  return async (ctx, next) => {

    const { authorization } = ctx.header;
    if (authorization) {
      try {
        const authorizationSplit = authorization.split(' ')[1];
        // 解码token，需传加密时的 secret
        const decode = app.jwt.verify(authorizationSplit, app.config.jwt.secret);
        ctx.state.user = decode; // 信息存一下，这步很重要，业务里要用
        await next();
      } catch (err) {
        // ctx.throw(500, err.message);

        // 所有的异常都在 app 上触发一个 error 事件，egg会记录一条错误日志
        ctx.app.emit('error', err, ctx);
        const status = err.status || 500;
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const error = status === 500 && ctx.app.config.env === 'prod' ?
          'Internal Server Error' :
          err.message;
        if (err.message === 'jwt expired') {
          // ctx.throw(401, 'token过期');
          ctx.body = 'token过期';
          ctx.status = 401;
        } else if (status === 422) {
          // 422:请求格式正确，但是由于含有语义错误
          ctx.body.detail = err.errors;
        } else {
          // 从 error 对象上读出各个属性,设置到响应中
          ctx.body = { error };
          ctx.status = status;
        }
        return;
      }
    } else {
      // ctx.throw(401, '没有权限');
      ctx.body = '没有权限';
      ctx.status = 401;
      return;
    }
    // await next();
  };
};
