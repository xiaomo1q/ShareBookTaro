'use strict';
/** 服务器 */
const Service = require('egg').Service;

class IndexSevice extends Service {
  // 获取
  * getClassList(data) {
    const pageIndex = Number(data.pageIndex);
    const pageCount = Number(data.pageCount);
    const classList = yield this.app.model.Class.find({})
      .skip(pageIndex)
      .limit(pageCount); // 分页
    const total = yield this.app.model.Class.find().count(); // 查询总数

    this.ctx.body = {
      code: '-1',
      pageIndex,
      pageCount,
      total,
      data: classList,
    };
  }

  // 添加
  * create(data) {
    const corr = yield this.ctx.model.Class.findOne({
      name: data.name,
    });
    if (!corr) {
      yield this.app.model.Class.create(data);
      this.ctx.body = {
        code: 0,
        msg: '添加成功',
      };
    } else {
      this.ctx.body = {
        code: -1,
        msg: '该用户名已存在',
      };
    }
  }

  // 修改
  * update(params) {
    yield this.ctx.model.Class.updateOne(
      {
        _id: params.id,
      },
      params,
      {
        multi: true,
      }
    );
    this.ctx.body = 'update';
  }
}

module.exports = IndexSevice;
