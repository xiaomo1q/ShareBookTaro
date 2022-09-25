'use strict';

const Service = require('egg').Service;

class ExchangeSquareService extends Service {
  /** 书圈列表 */
  async get_exchange_square_list() {
    const { ctx, app } = this;
    return await app.mysql.select('exchange_square');
  }
  /** 新增书圈信息 */
  async add_exchange_square_detail(params) {
    const { ctx, app } = this;
    await app.mysql.insert('exchange_square', params);
    return {
      code: 0, msg: '添加成功',
    };
  }
}

module.exports = ExchangeSquareService;
