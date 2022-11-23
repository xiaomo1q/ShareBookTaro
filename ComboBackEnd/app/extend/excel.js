'use strict';
const Excel = require('exceljs');

// 文件导出 一级表头
const excelNew = (url, data, headers) => {
  const columns = [];// exceljs要求的columns
  const titleRows = headers.length;// 标题栏行数
  // 处理表头
  for (let i = 0; i < titleRows; i++) {
    const row = headers[i];
    for (let j = 0, rlen = row.length; j < rlen; j++) {
      const col = row[j];
      const { k, t, w = 15 } = col;
      if (!k) continue;// 不存在k则跳过
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
  const result = data;

  // 生成excel  这一部门语法需看下exceljs
  const workbook = new Excel.Workbook();
  const sheet = workbook.addWorksheet('维度雷达表', { views: [{ xSplit: 1, ySplit: 1 }] });
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
  // this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' 'ss.xlsx");
  return workbook.xlsx.writeBuffer();
};

module.exports = { excelNew };
