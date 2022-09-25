'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async add_book() {
        const { ctx, app } = this;
        const user = ctx.request.body;
        const result = await service.user.create(user);
        console.log(result);
        ctx.body = result;
        if (result.affectedRows === 1) {
            ctx.body = {
                code: 0,
                data: result
            }
        } else {
            ctx.body = {
                code: 1,
                data: '用户添加失败'
            }
        }
    }
    async get_book_type() {
        const { ctx, app } = this;
        ctx.body = await app.mysql.select('book_type');
    }
    async get_book_list() {
        const { ctx, app } = this;
        const { title } = ctx.request.query;
        if (title) {
            const result = await app.mysql.select('book_list', {
                where: { book_type: title }, //查询条件
            })
            ctx.body = { code: 0, data: result }
        } else {
            ctx.body = { code: 1, data: '类型必填' }
        }
    }
    async get_only_book_detail() {
        const { ctx, app } = this;
        const { isbn } = ctx.request.query;
        if (isbn) {
            const result = await app.mysql.get('book_list', { isbn: isbn })
            ctx.body = { code: 0, data: result }
        } else {
            ctx.body = { code: 1, data: 'isbn必填' }
        }
    }
}

module.exports = HomeController;