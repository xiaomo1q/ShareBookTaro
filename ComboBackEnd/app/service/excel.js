'use strict';
/** 文件导出 */
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const officegen = require('officegen');

const xlsx = officegen('xlsx');
class IndexSevice extends Service {
  async excel() {
    // xlsx.on('finalize', written => {
    //   console.log('Finish to create an Excel file.\nTotal bytes created: ' + written + '\n');
    // });

    // xlsx.on('error', err => {
    //   console.log(err);
    // });
    const sheet = xlsx.makeNewSheet();
    sheet.name = 'Excel Test';

    // The direct option - two-dimensional array:
    sheet.data[0] = [];
    sheet.data[0][0] = 1;
    sheet.data[1] = [];
    sheet.data[1][3] = 'abc';
    sheet.data[1][4] = 'More';
    sheet.data[1][5] = 'Text';
    sheet.data[1][6] = 'Here';
    sheet.data[2] = [];
    sheet.data[2][5] = 'abc';
    sheet.data[2][6] = 900;
    sheet.data[6] = [];
    sheet.data[6][2] = 1972;

    // Using setCell:
    sheet.setCell('E7', 340);
    sheet.setCell('I1', -3);
    sheet.setCell('I2', 31.12);
    sheet.setCell('G102', 'Hello World!');

    // const out = fs.createWriteStream('example.xlsx');
    const out = fs.createWriteStream(path.join('app/public/img', 'example.xlsx'));
    // out.on('error',  err=> {
    //   console.log(err)
    // })
    // console.log(out);

    // return xlsx.generate(out);
    this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' 'example.xlsx");
    // this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' 'ss.xlsx");
    this.ctx.body = xlsx.generate(out);
  }

  async world() {
    const docx = officegen('docx');
    const tObj = docx.createP({ align: 'center' }); // 居中
    tObj.addText('title', { bold: true, font_face: 'Arial', font_size: 18 }); // 标题样式
    tObj.addLineBreak(); // 换行
    // 定义内容
    const pObj = docx.createP();
    pObj.addText('办案进展：', { font_size: 14, font_face: '方正仿宋简体' });
    pObj.addText('list.title', { font_size: 14, font_face: '方正仿宋简体' });
    pObj.addLineBreak();
    // 如果写入的是列表，直接循环就好
    // 生成文档，存放文档的路径要先创建好
    const out = await fs.createWriteStream('out.docx');
    out.on('error', err => {
      console.log(err + '111111111111111');
    });

    // docx.generate(out);
    const result = docx.generate(out);// 服务端生成word
    // result.writeHead(200, {
    //   // 注意这里的type设置，导出不同文件type值不同application/vnd.openxmlformats-officedocument.presentationml.presentation
    //   'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    //   'Content-disposition': 'attachment; filename=out.docx',
    // });
    this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' 'filename=out.docx'");
    // docx.generate(result);
    this.ctx.body = docx.generate(result);
  }
}

module.exports = IndexSevice;
