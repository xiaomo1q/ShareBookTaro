"use strict";

const Controller = require("egg").Controller;
const await = require("await-stream-ready/lib/await");
const { excelNew } = require('../extend/excel');

class BookController extends Controller {
    /** 添加图书 */
    async add_only_book() {
        const params = this.ctx.request.body;
        this.ctx.body = await this.ctx.service.book.add_only_book(params);
    }
    /** update图书 */
    async update_only_book() {
        const params = this.ctx.request.body;
        this.ctx.body = await this.ctx.service.book.update_only_book(params);
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

    async del_connect_book_list() {
        const { ctx, app } = this;
        const { isbn } = this.ctx.request.body;
        try {
            const decoded = await ctx.service.tool.jwtToken();
            const corr = await app.mysql.delete('user_connect_book', {
                openid: decoded.openid, isbn
            });
            ctx.body = { code: 0, msg: '删除成功' };
        } catch (error) {
            ctx.body = { code: 1, msg: '删除失败' };
        }
    }

    /** 获取图书分类  */
    async get_book_type() {
        const { ctx, app } = this;
        ctx.body = await app.mysql.query("select * from book_type");
        // const result = await app.mysql.query("select distinct book_type from db_book_list");
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
    /** del用户收藏的图书 */
    async del_favorite_book_list() {
        const { ctx, app } = this;
        const { isbn } = this.ctx.request.body;
        try {
            const decoded = await ctx.service.tool.jwtToken();
            const corr = await app.mysql.delete('favorite', {
                openid: decoded.openid, isbn
            });
            ctx.body = { code: 0, msg: '删除成功' };
        } catch (error) {
            ctx.body = { code: 1, msg: '删除失败' };
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
            await app.mysql.delete("favorite", { fid: res.fid });
            ctx.body = { code: 0, msg: "取消收藏" };
        }
    }

    async bookDownload() {
        const { ctx, app } = this;
        const dataItem = await app.mysql.query('select * from db_book_list');
        const headers = [[
            { t: 'ISBN', k: 'isbn' },
            { t: '分类', k: 'book_type' },
            { t: '书名', k: 'book_name' },
            { t: '作者', k: 'book_author' },
            { t: '出版', k: 'press' },
            { t: '封面', k: 'imgUrl' },
            { t: '简介', k: 'book_desc' },
        ]];
        const url = 'https://xxx';
        // ctx.body = dataItem;
        ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        ctx.set('Content-Disposition', "attachment;filename*=UTF-8' '" + encodeURIComponent('图书列表') + '.xlsx');
        ctx.body = await excelNew(url, dataItem, headers);
    }
    /** 批量添加 用户关联图书 */
    async add_connect_book() {
        const { ctx, app } = this
        const decoded = await ctx.service.tool.jwtToken();
        const params = this.ctx.request.body;
        if (!!params && params.length > 0) {
            const arr = []
            params.forEach((el) => {
                arr.push({ isbn: el.isbn, openid: decoded.openid, update_date: new Date() })
            });
            let values = [];
            arr.forEach(function (n, i) {
                let _arr = [];
                for (let m in n) {
                    _arr.push(n[m]);
                }
                values.push(_arr);
            })
            const sql = "INSERT INTO user_connect_book(isbn,openid,update_date) VALUES ?";

            await app.mysql.query(sql, [values],  (err, rows, fields) =>{
                callback(err, rows);
            });
            ctx.body = { code: 0, msg: '添加成功' }
        }

        // await app.mysql.insert('user_connect_book', {
        //     update_date: new Date(),
        //     isbn: params.isbn,
        //     openid: decoded.openid,
        //   });
    }
}

module.exports = BookController;