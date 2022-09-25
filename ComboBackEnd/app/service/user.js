'use strict';
/** 服务器 调用数据库 */
const Service = require('egg').Service;

class IndexService extends Service {

    // 登录
    async login(params) {
        const { ctx, app } = this;
        const corr = await app.mysql.get('userinfo', { openid: params.openid });
        // 如果不存在：就是该用户的第一次登录，后台数据库新添加一个用户信息
        // 如果存在：就不是该用户的第一次登录，以前登陆过，就更新后台数据库中该用户的第一次登录时间
        // 返回用户信息
        if (corr) {
            await app.mysql.update('userinfo', { update_date: new Date() }, {
                where: {
                    openid: params.openid
                }
            })
            return { code: 0, token: corr.token };
        } else {
            console.log(params, '.params');
            if (params.openid === params.openid) {
                // 生成Token
                const Token = app.jwt.sign({
                    openid: params.openid, // 需要存储的Token数据
                }, app.config.jwt.secret, { expiresIn: '3600h' });
                // token 存储至数据库中
                await app.mysql.insert('userinfo', {...params, token: Token, update_date: new Date() })
                    // 将生成的Token返回给前端
                return {
                    code: 0,
                    token: Token
                };
            } else {
                return { code: 1 };
            }
        }
    }
}

module.exports = IndexService;