'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async add_book() {
        const { ctx, app } = this;
        let user = ctx.request.body;
        let result = await service.user.create(user);
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
        const {
            ctx,
            app
        } = this;
        ctx.body = await app.mysql.get('book_detail', {
            book_type: '热门图书'
        });
    }
    async get_book_list() {
        const {
            ctx,
            app
        } = this;
        ctx.body = await app.mysql.get('book_detail', {
            book_type: '热门图书'
        });
    }
}

module.exports = HomeController;