'use strict';

const Controller = require('egg').Controller;

class ExchangeSquareController extends Controller {
  /** 书圈列表 */
  async get_exchange_square_list() {
    const { ctx, app } = this;
    // 用户唯一标识是openid
    const user = await ctx.service.exchangeSquare.get_exchange_square_list();
    ctx.body = user;
  }
  /** 新增书圈信息 */
  async add_exchange_square_detail() {
    const { ctx, app } = this;
    const params = await ctx.request.body;
    const uuid = await ctx.service.tool.uuid();
    const user = await ctx.service.exchangeSquare.add_exchange_square_detail({ id: uuid, ...params });
    ctx.body = user;
  }
}

module.exports = ExchangeSquareController;
