'use strict';

const Service = require('egg').Service;
/**
 * 公共组件
 */
class ToolService extends Service {
    // 请求头 token 揭秘
    async jwtToken() {
            const { ctx } = this;
            // 1. 获取请求头 authorization 属性，值为 token
            const token = ctx.request.header.authorization;
            // 2. 用 app.jwt.verify(token， app.config.jwt.secret)，解析出 token 的值
            const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
            return decoded;
        }
        // 生成唯一uuid值
    async uuid() {
        let guid = '';
        for (let i = 1; i <= 32; i++) {
            const n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) {
                guid += '-';
            }
        }
        return guid;
    }
}

module.exports = ToolService;