'use strict';
/** 服务器 调用数据库 */
const Service = require('egg').Service;

class BookService extends Service {
  /** 添加图书 */
  async add_only_book(params) {
    const { ctx, app } = this;
    const decoded = await ctx.service.tool.jwtToken();
    const corr = await app.mysql.get("db_book_list", { isbn: params.isbn });
    if (!corr) {
      await app.mysql.insert("db_book_list", { params });
    }
    await app.mysql.insert("user_connect_book", {
      update_date: new Date(),
      isbn: params.isbn,
      openid: decoded.openid,
    });
    return {
      code: 0,
      msg: "添加成功",
    };
  }
  /** 根据分类图书列表 */
  async get_book_list(title) {
    const { ctx, app } = this;
    if (title) {
      if (title === "ALL") {
        const result = await app.mysql.query("SELECT * FROM db_book_list");
        return { code: 0, data: result };
      } else {
        const result = await app.mysql.select("db_book_list", {
          where: { book_type: title }, // 查询条件
        });
        return { code: 0, data: result };
      }
    } else {
      return { code: 1, data: "类型必填" };
    }
  }
  /** 获取单本图书信息 */
  async get_only_book_detail(isbn) {
    const { ctx, app } = this;
    const decoded = await ctx.service.tool.jwtToken();
    if (isbn) {
      const result = await app.mysql.get("db_book_list", { isbn });
      // 收藏
      const favorite = await app.mysql.query(`SELECT * FROM userinfo us
        WHERE EXISTS(SELECT * FROM favorite fv, db_book_list bl
        WHERE fv.isbn = bl.isbn and bl.isbn =${JSON.stringify(
        isbn
      )} and fv.openid = us.openid)`);
      result.favorite_num = favorite.length;
      result.favorite_state = false;
      favorite.forEach((el) => {
        if (el.openid) {
          result.favorite_state = el.openid === decoded.openid;
        }
      });
      //  所关联书主
      const ucb_list = await app.mysql.query(`SELECT * FROM userinfo us
      WHERE EXISTS(SELECT * FROM user_connect_book ucb, db_book_list bl
      WHERE ucb.isbn = bl.isbn and bl.isbn =${JSON.stringify(isbn)} and ucb.openid = us.openid)`);
      result.ucb_list = ucb_list;
      return { code: 0, data: result };
    } else {
      return { code: 1, data: "isbn必填" };
    }
  }
}

module.exports = BookService;