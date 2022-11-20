'use strict';
/** 控制器 */
const Controller = require('egg').Controller;
const await = require('await-stream-ready/lib/await');
const svgCaptcha = require('svg-captcha');

class IndexController extends Controller {
    /** 注册 */
    async test() {
        this.ctx.body = '测试';
    }
    /** 注册 */
    async registered() {
        const params = await this.ctx.request.query;
        this.ctx.body = await this.ctx.service.user.registered(params);
    }
    /** 登录 h5 */
    async loginH5() {
        const params = await this.ctx.request.query;
        this.ctx.body = await this.ctx.service.user.loginH5(params);
    }

    /** 登录 获取code */
    async login_code() {
        const { ctx, app } = this;
        const { code } = await ctx.request.body;
        // ctx.body= app.mysql.insert('users', {  name: 'Jack',  age: 18 })
        // await this.ctx.service.user.login(params);
        const appid = 'wx36fabba98a5d8b62';
        const secret = 'bcec0057436cc42bf51dfc54d780f7aa';

        const { data } = await ctx.curl('https://api.weixin.qq.com/sns/jscode2session', {
            method: 'GET',
            rejectUnauthorized: false,
            data: {
                appid, // 你的小程序的APPID
                secret, // 你的小程序的secret,
                js_code: code, // wx.login 登录成功后的code
                grant_type: 'authorization_code',
            },
            dataType: 'json',
        })
        this.ctx.body = { ...data, appid };
    }

    /** wx登录 */
    async login_user() {
        const { ctx, app } = this;
        const params = await ctx.request.body;
        ctx.body = await this.ctx.service.user.login(params);
    }


    /** uodate用户信息 */
    async update_userInfo() {
        const { ctx, app } = this;
        const params = await ctx.request.body;
        const decoded = await ctx.service.tool.jwtToken();
        try {
            await app.mysql.update('userinfo', {
                ...params,
                "update_date": new Date()
            }, {
                where: {
                    openid: decoded.openid,
                }
            }) || {};
            ctx.body = { code: 1, msg: '修改成功' };
        } catch (error) {
            throw error;
        }
    }

    /** 用户信息 */
    async get_userInfo() {
        const { ctx, app } = this;
        const decoded = await ctx.service.tool.jwtToken();
        try {
            const corr = await app.mysql.get('userinfo', { openid: decoded.openid }) || {};
            corr.fans = await ctx.service.user.fans_followers('fans', decoded.openid);
            corr.follower = await ctx.service.user.fans_followers('follower', decoded.openid);
            ctx.body = corr;
        } catch (error) {
            throw error;
        }
    }

    /** 书主用户信息 */
    async get_bookuser_userInfo() {
        const { ctx, app } = this;
        const { id } = await ctx.request.query;
        const decoded = await ctx.service.tool.jwtToken();
        // mysql事务
        // const conn = await app.mysql.beginTransaction();

        const conn = await app.mysql

        try {
            const user = await conn.get('userinfo', { openid: id });
            user.is_bookuser = false;
            if (id === decoded.openid) { user.is_bookuser = true };
            user.book_list = await conn.query(`SELECT * FROM db_book_list bl WHERE EXISTS(SELECT * FROM user_connect_book fv, userinfo us
          WHERE fv.openid = us.openid AND us.openid = ${JSON.stringify(id)} and fv.isbn = bl.isbn)`);
            user.fans = await ctx.service.user.fans_followers('fans', id);
            user.follower = await ctx.service.user.fans_followers('follower', id);
            ctx.body = user;
            // await conn.commit();
        } catch (error) {
            // await conn.rollback(); // rollback call won't throw err
            throw error;
        }
    }
    /** 粉丝or 关注者 */
    async add_fans_followers() {
        const { ctx, app } = this;
        const params = await ctx.request.query;
        const corr = await app.mysql.get('fans', params);
        if (!!corr) {
            ctx.body = { code: 1, msg: '正在关注' };
        } else {
            try {
                await app.mysql.insert('fans', params);
                ctx.body = { code: 0, msg: '关注成功' };
            } catch (error) {
                ctx.body = { code: 1, msg: '关注失败' };
            }
        }
    }
    async del_fans_followers() {
        const { ctx, app } = this;
        const params = await ctx.request.body;
        const decoded = await ctx.service.tool.jwtToken();
        try {
            await app.mysql.delete('fans', params);
            ctx.body = { code: 0, msg: '删除成功' };
        } catch (error) {
            ctx.body = { code: 1, msg: '删除失败' };
        }
    }
}

module.exports = IndexController;