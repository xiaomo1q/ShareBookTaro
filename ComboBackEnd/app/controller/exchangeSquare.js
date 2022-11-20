'use strict';

const await = require('await-stream-ready/lib/await');

const Controller = require('egg').Controller;

class ExchangeSquareController extends Controller {
  /** 书圈列表 */
  async get_exchange_square_list() {
    const { ctx, app } = this;
    // 用户唯一标识是openid
    const user = await ctx.service.exchangeSquare.get_exchange_square_list();
    ctx.body = user;
  }
  async get_exchange_square_detail() {
    const { ctx } = this;
    const { _id } = await ctx.request.query;
    // 用户唯一标识是openid
    const user = await ctx.service.exchangeSquare.get_exchange_square_detail(_id);
    ctx.body = user;
  }
  /** 新增书圈信息 */
  async add_exchange_square_detail() {
    const { ctx, app } = this;
    const decoded = await ctx.service.tool.jwtToken();
    const corr = await app.mysql.get('userinfo', { openid: decoded.openid });
    const params = await ctx.request.body;
    // const params = {
    //   book_title: '《哈利波特》书评',
    //   book_des: 'xxxxxxxxxxxxxxxxxxxxx',
    //   book_url: null,
    //   connect_list: '哈利波特Ⅰ[;]哈利波特Ⅱ',
    // };
    const obj = {
      ...params, avatar: corr.avatarUrl,
      user_name: corr.nickName,
      user_id: corr.openid,
      like_num: 0, update_time: new Date(), comment_num: 0
    }
    const uuid = await ctx.service.tool.uuid();
    const user = await ctx.service.exchangeSquare.add_exchange_square_detail({ id: uuid, ...obj });
    ctx.body = user;
  }
  /** 新增only书圈评论 @id 当前书评的id  */
  async add_only_square_review() {
    const { ctx, app } = this;
    const { _id, num, text } = await ctx.request.body;
    // try {
    const decoded = await ctx.service.tool.jwtToken();
    const corr = await app.mysql.get('userinfo', { openid: decoded.openid });
    const params = { text, es_id: _id };
    const obj = {
      ...params, avatar: corr.avatarUrl,
      user_name: corr.nickName,
      user_id: corr.openid,
      update_time: new Date()
    }
    await app.mysql.update('exchange_square', { comment_num: Number(num) + 1 }, { where: { id: _id } });
    const uuid = await ctx.service.tool.uuid();
    await app.mysql.insert('comment_user', { id: uuid, ...obj });
    ctx.body = { code: 0 };
    // } catch (error) {
    //   ctx.body = { code: 1, error };
    // }
  }
  /** 新增only书圈点赞 @id 当前书评的id  */
  async add_only_square_fav() {
    const { ctx, app } = this;
    const { _id, num, user_id } = await ctx.request.body;
    try {
      const decoded = await ctx.service.tool.jwtToken();
      await app.mysql.update('exchange_square', { like_num: Number(num) + 1 }, { where: { id: _id } });
      ctx.body = { code: 0 };
    } catch (error) {
      ctx.body = { code: 1, error };
    }
  }
  /** 上传图片 */
  async file_img_upload() {
    this.ctx.body = await this.ctx.service.tool.getUploadFile();
  }
  async file_img_delete() {
    const { ids } = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.tool.deleteImage(ids);
  }
}

module.exports = ExchangeSquareController;
