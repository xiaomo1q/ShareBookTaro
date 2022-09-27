'use strict';

const Controller = require('egg').Controller;

class BookController extends Controller {
    /** 添加图书 */
    // async add_book() {
    //     const { ctx, app } = this;
    //     const user = ctx.request.body;
    //     const result = await service.user.create(user);
    //     console.log(result);
    //     ctx.body = result;
    //     if (result.affectedRows === 1) {
    //         ctx.body = {
    //             code: 0,
    //             data: result
    //         }
    //     } else {
    //         ctx.body = {
    //             code: 1,
    //             data: '添加失败'
    //         }
    //     }
    // }
    /** 获取图书分类  */
    async get_book_type() {
            const { ctx, app } = this;
            ctx.body = await app.mysql.select('book_type');
        }
        /** 根据分类图书列表 */
    async get_book_list() {
            const { ctx, app } = this;
            const { title } = ctx.request.query;
            if (title) {
                if (title === 'ALL') {
                    const result = await app.mysql.query('SELECT * FROM book_list');
                    ctx.body = { code: 4, data: result };
                } else {
                    const result = await app.mysql.select('book_list', {
                        where: { book_type: title }, // 查询条件
                    });
                    ctx.body = { code: 0, data: result };
                }
            } else {
                ctx.body = { code: 1, data: '类型必填' };
            }
        }
        /** 获取单本图书信息 */
    async get_only_book_detail() {
            const { ctx, app } = this;
            try {
                const { isbn } = ctx.request.query;
                // 1. 获取请求头 authorization 属性，值为 token
                const token = ctx.request.header.authorization;
                // 2. 用 app.jwt.verify(token， app.config.jwt.secret)，解析出 token 的值
                const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
                if (isbn) {
                    const result = await app.mysql.get('book_list', { isbn });
                    const corr = await app.mysql.query(`SELECT * FROM userinfo us
        WHERE EXISTS(SELECT * FROM favorite fv, book_list bl
        WHERE fv.isbn = bl.isbn and bl.isbn =${JSON.stringify(isbn)} and fv.openid = us.openid)`);
                    result.favorite_state = false;
                    corr.forEach(el => {
                        if (el.openid) {
                            result.favorite_state = (el.openid === decoded.openid);
                        }
                    });
                    result.favorite_num = corr.length;
                    ctx.body = { code: 0, data: result };
                } else {
                    ctx.body = { code: 1, data: 'isbn必填' };
                }
            } catch (error) {
                ctx.body = error;
            }

        }
        /** 获取用户收藏的图书 */
    async get_favorite_book_list() {
        const { ctx, app } = this;
        try {
            // 1. 获取请求头 authorization 属性，值为 token
            const token = ctx.request.header.authorization;
            // 2. 用 app.jwt.verify(token， app.config.jwt.secret)，解析出 token 的值
            const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
            const corr = await app.mysql.query(`SELECT * FROM book_list bl WHERE EXISTS(SELECT * FROM favorite fv, userinfo us
          WHERE fv.openid = us.openid AND us.openid = ${JSON.stringify(decoded.openid)} and fv.isbn = bl.isbn)`);
            ctx.body = corr;
        } catch (error) {
            ctx.body = error;
        }
    }

    /** 收藏此图书 */
    async add_favorite_book() {
            const { ctx, app } = this;
            // 1. 获取请求头 authorization 属性，值为 token
            const token = ctx.request.header.authorization;
            // 2. 用 app.jwt.verify(token， app.config.jwt.secret)，解析出 token 的值
            const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
            const { isbn, state } = ctx.request.query;
            if (state === 'false') {
                await app.mysql.insert('favorite', { update_date: new Date(), isbn, openid: decoded.openid });
                ctx.body = { code: 0, msg: '收藏成功' };
            } else {
                const res = await app.mysql.get('favorite', { isbn, openid: decoded.openid });
                console.log(res);
                await app.mysql.delete('favorite', { fid: res.fid });
                ctx.body = { code: 0, msg: '取消收藏' };
            }

        }
        /** 搜索图书 */
    async search_book_list() {
        const { ctx, app } = this;
        const { title } = ctx.request.query;
        try {
            const corr = await app.mysql.query(`select * from book_list where name REGEXP ${JSON.stringify(title)}`);
            ctx.body = corr;
        } catch (error) {
            ctx.body = error;
        }
    }
}

module.exports = BookController;