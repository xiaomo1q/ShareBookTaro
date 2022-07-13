/* eslint-disable object-shorthand */
'use strict';

const Controller = require('egg').Controller;
const XLSX = require('xlsx');
// const _ = require('lodash/object');
// conditions：查询条件；projection：控制返回的字段；options：控制选项；callback：回调函数。
// Model.create(doc(s), [callback]) 增加数据
// Model#save([options], [options.safe], [options.validateBeforeSave], [fn]) 保存数据
// Model.insertMany(doc(s), [options], [callback]) 多条数据插入
// Model.update(conditions, doc, [options], [callback]) 修改数据
// Model.remove(conditions, [callback]) 删除数据
// Model.find(conditions, [projection], [options], [callback]) 查询数据
// Model.findOne([conditions], [projection], [options], [callback]) 单个查询数据
class UserController extends Controller {

  // 获取 get
  * index() {
    const data = yield this.ctx.query;
    yield this.ctx.service.class.getClassList(data);
  }

  // 添加 post
  * create() {
    const data = this.ctx.request.body;
    yield this.ctx.service.class.create(data);
  }
  // 修改 update
  * update() {
    const params = this.ctx.request.body;
    yield this.ctx.service.class.create(params);
  }
  // 删除 delete
  * destroy() {
    const { name } = this.ctx.request.body;
    yield this.app.model.Class.remove({ name: name });
    this.ctx.body = 'del';
  }

  // excel
  async importExcel() {
    const { ctx } = this;
    const stream = await ctx.getFileStream(); // 单文件读取方法
    stream.on('data', chunk => {
      // 读取内容流的方式stream.on方法读取内容;该方法不会的可以查查;
      const workbook = XLSX.read(chunk, { type: 'buffer' }); // 读取excel表
      // 将stream读取的内容chunk给xlsx以buffer形式读取;
      // 这里可以尝试打印console.log(workbook);
      const sheetNames = workbook.SheetNames; // 工作表名称集合;也就是excel里面有几张表
      sheetNames.forEach(name => {
        const worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
        const headers = {};
        const data = [];
        const keys = Object.keys(worksheet);
        keys
          // 过滤以!开头的key
          .filter(k => k[0] !== '!')
          // 遍历所有单元格
          .forEach(k => {
            // 如A11中的A
            const col = k.substring(0, 1);
            // 如A11中的11
            const row = parseInt(k.substring(1));
            // 当前单元格的值
            const value = worksheet[k].v;
            // 保存字段名
            if (row === 1) {
              headers[col] = value;
              return;
            }
            // 解析成JSON
            if (!data[row]) {
              data[row] = {};
            }
            data[row][headers[col]] = value;
          });
        this.text(data);
      });
    });
    this.ctx.body = '导入成功';
  }

  async text(data) {
    const List = data.filter(i => i !== undefined);
    await this.ctx.model.Class.insertMany(List);
  }

  /**
   * 文件导出
   */
  * downloadFile() {
    // 请求数据地址
    const url = 'https://xxx';
    // 请求数据参数
    const param = {
      dataType: 'json',
      // data: {
      // }
    };

    // t:title k:key w:width  ==>表头
    const headers = [[
      { t: 'id', k: 'id', w: 20 },
      { t: '姓名', k: 'name' },
      { t: '年龄', k: 'age' },
      { t: '地区', k: 'city' },
      { t: '时间', k: 'date' },
    ]];

    yield this.ctx.service.tool.excelNew(url, param, headers, '绩效考核统计表', res => { });
  }

  async downExcel() {
    const { ctx } = this;
    // const req = ctx.helper.data(['strBeginTime', 'strEndTime', 'deptId']);
    // req.deptId = req.deptId || ctx.session.user.deptId;
    // const headers = [[
    //   { t: '单位名称', f: 'deptName', w: 20, m1: 'A1', m2: 'A3', totalRowText: '合计' },
    //   { t: '办理身份证证件', m1: 'B1', m2: 'M1' },
    //   { t: '临时身份证证件', m1: 'N1', m2: 'O1' },
    //   { t: '总计', m1: 'P1', m2: 'R2' },
    // ], [
    //   { t: '申领', m1: 'B2', m2: 'D2' },
    //   { t: '换领', m1: 'E2', m2: 'G2' },
    //   { t: '补领', m1: 'H2', m2: 'J2' },
    //   { t: '小计', m1: 'K2', m2: 'M2' },
    //   { t: '临时身份证', m1: 'N2', m2: 'O2' },
    // ], [
    //   { t: '本地人数', f: 'slbdCount', totalRow: true },
    //   { t: '异地人数', f: 'slydCount', totalRow: true },
    //   { t: '金额', f: 'slJe', totalRow: true },
    //   { t: '本地人数', f: 'hlbdCount', totalRow: true },
    //   { t: '异地人数', f: 'hlydCount', totalRow: true },
    //   { t: '金额', f: 'hlJe', totalRow: true },
    //   { t: '本地人数', f: 'blbdCount', totalRow: true },
    //   { t: '异地人数', f: 'blydCount', totalRow: true },
    //   { t: '金额', f: 'blJe', totalRow: true },
    //   { t: '本地人数', f: 'xj_bdrs', totalRow: true },
    //   { t: '异地人数', f: 'xj_ydrs', totalRow: true },
    //   { t: '金额', f: 'xj_je', totalRow: true },
    //   { t: '人数', f: 'lsCount', totalRow: true },
    //   { t: '金额', f: 'lsJe', totalRow: true },
    //   { t: '本地人数', f: 'hj_bdrs', totalRow: true },
    //   { t: '异地人数', f: 'hj_ydrs', totalRow: true },
    //   { t: '金额', f: 'hj_je', totalRow: true },
    // ]];
    // await ctx.service.tool.excelCommon('https://www.xx.com', 'req', headers, '身份证受理统计', res => { return res; });
    await ctx.service.excel.excel();
    // await ctx.service.word.index();
  }

  // 上传图片
  * uploadImg() {
    // 前端使用：服务器地址+文件名
    // http://localhost:7001/public/img/filename
    yield this.ctx.service.tool.getUploadFile();
  }
  // 视频
  * video() {
    yield this.ctx.service.tool.getUploadFile();
  }
}
module.exports = UserController;
