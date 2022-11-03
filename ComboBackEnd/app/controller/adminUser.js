'use strict';
/** 控制器 */
const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class IndexController extends Controller {
    // // 登出
    // async logout() {
    //     await this.ctx.model.User.updateOne({
    //         username: this.ctx.state.user.username
    //     }, {
    //         token: ''
    //     }, {
    //         multi: true
    //     });
    //     this.ctx.body = 'out';
    // }

    // // 用户列表
    // async userList() {
    //     const list = await this.ctx.model.User.find({});
    //     this.ctx.body = list;
    // }

    // // 用户身份
    // async userRole() {
    //     const {
    //         ctx
    //     } = this;
    //     const params = await this.ctx.request.body;
    //     await this.ctx.model.User.updateOne({
    //         _id: params.id
    //     }, params, {
    //         multi: true
    //     });
    //     ctx.body = 'update';
    // }

    // // del用户
    // async userDel() {
    //     const {
    //         ctx
    //     } = this;
    //     if (ctx.query.username === ctx.state.user.username) {
    //         ctx.body = '自己无法删除自己！！！！';
    //     } else {
    //         await this.ctx.model.User.remove({
    //             username: ctx.query.username
    //         });
    //         ctx.body = 'del';
    //     }

    // }

    // // 验证码
    // async captcha() {
    //     const captcha = svgCaptcha.create({
    //         size: 4,
    //         fontSize: 40,
    //         ignoreChars: 'Ooli',
    //         width: 80,
    //         height: 30,
    //         noise: 3,
    //         color: true,
    //         background: '#ccc',
    //     });
    //     this.ctx.session.captcha = captcha.text;
    //     this.ctx.response.type = 'image/svg+xml';
    //     this.ctx.body = {
    //         text: captcha.text,
    //         img: captcha.data,
    //     };
    // }
}

module.exports = IndexController;