'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx, app } = this;
        ctx.body = await app.mysql.get('book_detail', { book_type: '热门图书' });
    }
}

module.exports = HomeController;