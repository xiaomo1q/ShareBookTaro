'use strict';
/** 控制器 */
const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class IndexController extends Controller {
    /** 注册 */
    async registered() {
        const params = await this.ctx.request.body;
        await this.ctx.service.user.registered(params);
    }

    /** 登录 获取code */
    async login_code() {
        const { ctx, app } = this;
        const { code } = await ctx.request.body;
        // ctx.body= app.mysql.insert('users', {  name: 'Jack',  age: 18 })
        // await this.ctx.service.user.login(params);
        const { data } = await ctx.curl('https://api.weixin.qq.com/sns/jscode2session', {
            method: 'GET',
            rejectUnauthorized: false,
            data: {
                appid: 'wx36fabba98a5d8b62', // 你的小程序的APPID
                secret: 'bcec0057436cc42bf51dfc54d780f7aa', // 你的小程序的secret,
                js_code: code, // wx.login 登录成功后的code
                grant_type: 'authorization_code'
            },
            dataType: 'json',
        })
        this.ctx.body = {...data, appid: 'wx36fabba98a5d8b62' };
    }

    /** 添加用户 */
    async login_user() {
        const { ctx, app } = this;
        const params = await ctx.request.body;
        ctx.body = await this.ctx.service.user.login(params);
    }

    /** 用户信息 */
    async get_userInfo() {
        const { ctx, app } = this;
        // 1. 获取请求头 authorization 属性，值为 token
        const token = ctx.request.header.authorization;
        // 2. 用 app.jwt.verify(token， app.config.jwt.secret)，解析出 token 的值
        const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
        const corr = await app.mysql.get('userinfo', { openid: decoded.openid });
        ctx.body = corr;
    }

    // 登出
    async logout() {
        await this.ctx.model.User.updateOne({
            username: this.ctx.state.user.username
        }, {
            token: ''
        }, {
            multi: true
        });
        this.ctx.body = 'out';
    }

    // 用户列表
    async userList() {
        const list = await this.ctx.model.User.find({});
        this.ctx.body = list;
    }

    // 用户身份
    async userRole() {
        const {
            ctx
        } = this;
        const params = await this.ctx.request.body;
        await this.ctx.model.User.updateOne({
            _id: params.id
        }, params, {
            multi: true
        });
        ctx.body = 'update';
    }

    // del用户
    async userDel() {
        const {
            ctx
        } = this;
        if (ctx.query.username === ctx.state.user.username) {
            ctx.body = '自己无法删除自己！！！！';
        } else {
            await this.ctx.model.User.remove({
                username: ctx.query.username
            });
            ctx.body = 'del';
        }

    }

    // 验证码
    async captcha() {
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