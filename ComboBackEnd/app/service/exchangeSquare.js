'use strict';

const Service = require('egg').Service;

class ExchangeSquareService extends Service {
  /** 书圈列表 */
  async get_exchange_square_list() {
    const { ctx, app } = this;
    return await app.mysql.select('exchange_square');
  }
  /** 书圈详情 */
  async get_exchange_square_detail(id) {
    const ucb_list = await this.app.mysql.query(`SELECT * FROM exchange_square es ,comment_user cu WHERE es.id = cu.es_id and es.id=${JSON.stringify(id)}`);
    return ucb_list;
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
