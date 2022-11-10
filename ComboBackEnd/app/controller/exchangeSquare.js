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
    // const decoded = await ctx.service.tool.jwtToken();
    // const params = await ctx.request.body;
    const params = {
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      user_name: '小米',
      user_id: 'oHfOA6l93trN6YkpCEhAkKnPGmKo',
      book_title: '《哈利波特》书评',
      book_des: 'xxxxxxxxxxxxxxxxxxxxx',
      book_url: null,
      connect_list: '哈利波特Ⅰ[;]哈利波特Ⅱ',
      like_num: '100',
      update_time: null,
      comment_num: 0,
    };
    const uuid = await ctx.service.tool.uuid();
    const user = await ctx.service.exchangeSquare.add_exchange_square_detail({ id: uuid, ...params });
    ctx.body = user;
  }
  /** 新增only书圈评论 @id 当前书评的id  */
  async add_only_square_review() {
    const { ctx, app } = this;
    // const decoded = await ctx.service.tool.jwtToken();
    const { _id, num } = await ctx.request.body;
    const params = {
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      user_name: '努努力',
      user_id: 'oy_ED6JJGGXgEun0KqBxZIrYmsJk',
      text: 'bbbbbb',
      update_time: new Date(),
      es_id: _id,
    };
    await app.mysql.update('exchange_square', { comment_num: Number(num) + 1 }, { where: { id: _id } });
    const uuid = await ctx.service.tool.uuid();
    await app.mysql.insert('comment_user', { id: uuid, ...params });
    ctx.body = { code: 0 };
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
