'use strict';
/** 服务器 */
const Service = require('egg').Service;
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun } = require('docx');
class IndexSevice extends Service {
  async index() {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun('Hello World'),
              new TextRun({
                text: 'Foo Bar',
                bold: true,
              }),
              new TextRun({
                text: '\tGithub is the best',
                bold: true,
              }),
            ],
          }),
        ],
      }],
    });
    // this.ctx.body = Packer.toBuffer(doc).then(buffer => {
    //   try {
    //     fs.writeFileSync('My Document.docx', buffer);
    //   } catch (err) {
    //     console.log('err****', err);
    //     throw err;
    //   }
    // });
    // this.ctx.body = Packer.toBuffer(doc).then(buffer => { return buffer; });
    // this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' '" + encodeURIComponent(name) + '.xlsx');
    // this.ctx.body = await workbook.xlsx.writeBuffer();
  }
}

module.exports = IndexSevice;
