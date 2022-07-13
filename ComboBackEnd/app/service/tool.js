'use strict';

/**  */
const Service = require('egg').Service;
const XLSX = require('xlsx');
// 文件存储
const fs = require('fs');
const path = require('path');
// const md5 = require('md5');
// 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');

const Excel = require('exceljs');
class IndexService extends Service {
  /**
    * 获取文件上传目录
    */
  async getUploadFile() {
    const { ctx } = this;
    const stream = await ctx.getFileStream(); // egg中获取上传文件的方法
    const filename = stream.filename;
    const target = path.join('app/public/img', filename);
    console.log('.rc..');
    const _that = this;
    // if (!fs.exitsSync('img')) { // 如果路径不存在，则创建
    //   fs.mkdir('img');
    // }
    const writeStream = fs.createWriteStream(target); // 创建文件流
    try {
      await awaitWriteStream(stream.pipe(writeStream)); // 异步写入文件
    } catch (err) {
      await sendToWormhole(stream); // 如果失败，关闭文件流
      // 其他操作
      // return ...
      _that.error(err);
    }
    ctx.body = {
      url: 'http://192.168.31.162:3000/public/img/' + filename,
      type: stream.mime,
      fileName: filename,
    };
  }
  // 文件导出 一级表头
  async excelNew(url, param, headers, name, func) {
    const columns = [];// exceljs要求的columns
    const titleRows = headers.length;// 标题栏行数

    // 处理表头
    for (let i = 0; i < titleRows; i++) {
      const row = headers[i];
      for (let j = 0, rlen = row.length; j < rlen; j++) {
        const col = row[j];
        const { k, t, w = 15 } = col;
        if (!k) continue;// 不存在k则跳过
        console.log(k);
        col.style = { alignment: { vertical: 'middle', horizontal: 'center' } };
        col.header = t;
        col.key = k;
        col.width = w;
        columns.push(col);
      }
    }

    // 请求并处理数据
    // const result = await this.ctx.curl(url, param);
    //   if(func) result = func(result);
    // const result = { data: [{ userName: 'ss', deptName: '4586', selfRate: 'fd', leaderRate: 'sss', rateResult: 'saw' }] };
    const result = await this.ctx.model.Class.find({});

    // 生成excel  这一部门语法需看下exceljs
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('统计表', { views: [{ xSplit: 1, ySplit: 1 }] });
    sheet.columns = columns;
    sheet.addRows(result);

    // 处理样式、日期、字典项
    const that = this;
    sheet.eachRow((row, rowNumber) => {
      // 设置行高
      row.height = 25;

      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {

        // 设置标题部分为粗体
        if (rowNumber <= titleRows) { cell.font = { bold: true }; return; }

        // 处理数据项里面的日期和字典
        const { type, dict } = columns[colNumber - 1];
        if (type && (cell.value || cell.value === 0)) return;// 非日期、字典或值为空的直接返回
        switch (type) {
          case 'date': cell.value = that.parseDate(cell.value); break;
          case 'dict': cell.value = that.parseDict(cell.value.toString(), dict); break;
          default: break;
        }

      });
    });
    this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' '" + encodeURIComponent(name) + '.xlsx');
    // this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' 'ss.xlsx");
    this.ctx.body = await workbook.xlsx.writeBuffer();
  }

  /**
   * 请求接口得到数据并生成excel
   *  支持数据自定义 func
   *  支持数据字典
   *  支持日期
   * @param {string} url 接口地址：相对地址或者http开头完整地址
   * @param {object} param 请求数据参数
   * @param {Array} headers excel标题栏
   * @param {string} name 文件名称
   * @param {function} func 数据自定义函数
   */


  /**
  * 请求接口得到数据并生成excel
  *  支持复杂表头（m1:合并单元格左上坐标；m2:合并单元格右下坐标）
  *  支持合计行  totalRowText totalRow
  *  支持数据自定义 func
  *  支持数据字典
  *  支持日期
  *  https://github.com/exceljs/exceljs/blob/master/README_zh.md
  */

  async excelCommon(url, req, headers, name, func) {
    const columns = []; // exceljs要求的columns
    const hjRow = {}; // 合并行
    const titleRows = headers.length; // 标题栏 行数

    // 处理表头
    for (let i = 0; i < titleRows; i++) {
      const row = headers[i];
      for (let j = 0; j < row.length; j++) {
        const col = row[j];
        const { f, t, w = 15 } = col;
        if (!f) continue; // 不存在f跳过
        if (col.totalRow) hjRow[f] = true;
        if (col.totalRowText) hjRow[f] = col.totalRowText;
        col.style = { alignment: { vertical: 'middle', horizontal: 'center' } };
        col.header = t;
        col.key = f;
        col.width = w;
        columns.push(col);
      }
    }

    // const result = yield this.post(url, req);//请求数据
    // let result = yield this.ctx.curl(url);
    // let data = result.data;
    // if (func) data = func(data);
    const data = { data: [{ 异地人数: 50 }] };// 需要在这边自己适配数据，这边为空
    // 处理合计行
    if (JSON.stringify(hjRow) !== '{}') {
      const tr = {};
      for (let i = 0; i < data.data.length; i++) {
        const item = data.data[i];
        for (const key in item) {
          if (hjRow[key] === true) {
            tr[key] = (tr[key] || 0) + item[key];
            continue;
          }
          tr[key] = hjRow[key] || '';
        }
      }
      data.data.push(tr);
    }
    const workbook = new Excel.Workbook(); // 创建工作簿
    const sheet = workbook.addWorksheet('My sheet', { views: [{ xSplit: 1, ySplit: 1 }] }); // 添加工作簿 创建一个第一行和列冻结的工作表
    sheet.columns = columns;
    sheet.addRows(data.data);
    // 处理复杂表头
    if (titleRows > 1) {
      for (let i = 0; i < titleRows; i++) sheet.spliceRows(1, 0, []); // 头部插入空行

      for (let i = 0; i < titleRows; i++) {
        const row = headers[i];
        for (let j = 0, rlen = row.length; j < rlen; j++) {
          const col = row[j];
          if (!col.m1) continue;

          sheet.getCell(col.m1).value = col.t;
          sheet.mergeCells(col.m1 + ':' + col.m2);
        }
      }
    }


    // 处理样式、日期、字典项
    const that = this;
    sheet.eachRow((row, rowNumber) => {
      // 设置行高
      row.height = 25;
      // 遍历此列中的所有当前单元格，包括空单元格
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        // 设置边框 黑色 细实线
        // const top = left = bottom = right = { style: 'thin', color: { argb: '000000' } };
        // cell.border = { top, left, bottom, right };

        // 设置标题部分为粗体
        if (rowNumber <= titleRows) { cell.font = { bold: true }; return; }

        // 处理数据项里面的日期和字典
        const { type, dict } = columns[colNumber - 1];
        if (type && (cell.value || cell.value === 0)) return;// 非日期、字典或值为空的直接返回
        switch (type) {
          case 'date': cell.value = that.parseDate(cell.value); break;
          case 'dict': cell.value = that.parseDict(cell.value.toString(), dict); break;
          default: break;
        }
      });
    });

    this.ctx.set('Content-Type', 'application/vnd.openxmlformats');
    this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' '" + encodeURIComponent(name) + '.xlsx');
    this.ctx.body = await workbook.xlsx.writeBuffer();

  }
}

module.exports = IndexService;
