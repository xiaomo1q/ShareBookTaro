"use strict";

const Controller = require("egg").Controller;

class BookController extends Controller {
    /** 添加图书 */
    async add_only_book() {
        const params = this.ctx.request.body;
        this.ctx.body = await this.ctx.service.book.add_only_book(params);
    }

    /** 获取用户已拥有的图书 */
    async get_connect_book_list() {
        const { ctx, app } = this;
        try {
            const decoded = await ctx.service.tool.jwtToken();
            const corr = await app.mysql
                .query(`SELECT * FROM db_book_list bl WHERE EXISTS(SELECT * FROM user_connect_book fv, userinfo us
                  WHERE fv.openid = us.openid AND us.openid = ${JSON.stringify(decoded.openid)} and fv.isbn = bl.isbn)`);
            ctx.body = corr;
        } catch (error) {
            ctx.body = error;
        }
    }

    /** 获取图书分类  */
    async get_book_type() {
        const { ctx, app } = this;
        // ctx.body = await app.mysql.select('book_type');
        const result = await app.mysql.query("select distinct book_type from db_book_list");
        let type = [];
        for (let i = 0; i < result.length; i++) {
            type.push({ title: result[i].book_type, id: i + 1 });
        }
        ctx.body = type;
    }
    /** 根据分类图书列表 */
    async get_book_list() {
        const { title } = this.ctx.request.query;
        this.ctx.body = await this.ctx.service.book.get_book_list(title)
    }
    /** 获取单本图书信息 */
    async get_only_book_detail() {
        const { ctx, app } = this;
        try {
            const { isbn } = ctx.request.query;
            ctx.body = await ctx.service.book.get_only_book_detail(isbn);
        } catch (error) {
            ctx.body = error;
        }
    }
    /** 搜索图书 */
    async search_book_list() {
        const { ctx, app } = this;
        const { title } = ctx.request.query;
        try {
            const corr = await app.mysql.query(`select * from db_book_list where book_name REGEXP ${JSON.stringify(title)}`);
            ctx.body = corr;
        } catch (error) {
            ctx.body = error;
        }
    }
    /** 获取用户收藏的图书 */
    async get_favorite_book_list() {
        const { ctx, app } = this;
        try {
            const decoded = await ctx.service.tool.jwtToken();
            const corr = await app.mysql
                .query(`SELECT * FROM db_book_list bl WHERE EXISTS(SELECT * FROM favorite fv, userinfo us
          WHERE fv.openid = us.openid AND us.openid = ${JSON.stringify(
                    decoded.openid
                )} and fv.isbn = bl.isbn)`);
            ctx.body = corr;
        } catch (error) {
            ctx.body = error;
        }
    }

    /** 收藏此图书 */
    async add_favorite_book() {
        const { ctx, app } = this;
        const decoded = await ctx.service.tool.jwtToken();
        const { isbn, state } = ctx.request.query;
        if (state === "false") {
            await app.mysql.insert("favorite", {
                update_date: new Date(),
                isbn,
                openid: decoded.openid,
            });
            ctx.body = { code: 0, msg: "收藏成功" };
        } else {
            const res = await app.mysql.get("favorite", {
                isbn,
                openid: decoded.openid,
            });
            console.log(res);
            await app.mysql.delete("favorite", { fid: res.fid });
            ctx.body = { code: 0, msg: "取消收藏" };
        }
    }

}

module.exports = BookController;