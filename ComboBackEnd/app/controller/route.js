'use strict';
/** 控制器 */
const Controller = require('egg').Controller;

class IndexController extends Controller {
  * index() {
    const data = yield this.ctx.model.Route.find();
    // const data = yield this.ctx.model.Route.aggregate([{ $unwind: '$routes' }, { $match: { 'routes.roles': 'test' } }]);
    this.ctx.body = data;
  }
}

module.exports = IndexController;
