'use strict';
/** 服务器 调用数据库 */
const Service = require('egg').Service;

class IndexService extends Service {
    /** 注册 */
    async registered(params) {
        const { ctx, app } = this;
        const corr = await app.mysql.get('userinfo', { openid: params.name + params.passward });
        if (corr) {
            return { code: 2, msg: '注册过了请直接登录' }
        } else {
            // 生成Token
            const Token = app.jwt.sign({
                openid: params.name + params.passward, // 需要存储的Token数据
            }, app.config.jwt.secret, { expiresIn: '3600h' });
            // token 存储至数据库中
            await app.mysql.insert('userinfo', {
                openid: params.name + params.passward,
                nickName: params.name,
                session_key: params.passward,
                avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
                token: Token, update_date: new Date()
            })
            // 将生成的Token返回给前端
            return {
                code: 0,
                token: Token
            };
        }
    }
    // 登录
    async loginH5(params) {
        const { ctx, app } = this;
        const corr = await app.mysql.get('userinfo', { nickName: params.name });
        // 如果不存在：就是该用户的第一次登录，后台数据库新添加一个用户信息
        // 如果存在：就不是该用户的第一次登录，以前登陆过，就更新后台数据库中该用户的第一次登录时间
        // 返回用户信息
        if (corr) {
            if(corr.session_key === params.passward){
                await app.mysql.update('userinfo', { update_date: new Date() }, {
                    where: {
                        nickName: params.name
                    }
                })
                return { code: 0, token: corr.token };
            }else{
                return { code: 2, msg: '账号或密码不正确' }
            }
        } else {
            return { code: 2, msg: '账号不存在，请注册' }
        }
    }
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
            // 生成Token
            const Token = app.jwt.sign({
                openid: params.openid, // 需要存储的Token数据
            }, app.config.jwt.secret, { expiresIn: '3600h' });
            // token 存储至数据库中
            await app.mysql.insert('userinfo', { ...params, token: Token, update_date: new Date() })
            // 将生成的Token返回给前端
            return {
                code: 0,
                token: Token
            };
        }
    }
}

module.exports = IndexService;