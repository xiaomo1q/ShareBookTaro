'use strict';

const Service = require('egg').Service;
// 文件存储
const fs = require('fs');
const path = require('path');
// const md5 = require('md5');
// 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
// const dayjs = require('dayjs');
/**
 * 公共组件
 */
class ToolService extends Service {
    // 请求头 token 揭秘
    async jwtToken() {
        const { ctx } = this;
        // 1. 获取请求头 authorization 属性，值为 token
        const token = ctx.request.header.authorization;
        // 2. 用 app.jwt.verify(token， app.config.jwt.secret)，解析出 token 的值
        try {
            return ctx.app.jwt.verify(token, ctx.app.config.jwt.secret)
        } catch (error) {
            return ctx.throw(401, '无效Token')
        }   
    }
    // 生成唯一uuid值
    async uuid() {
        let guid = '';
        for (let i = 1; i <= 32; i++) {
            const n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) {
                guid += '-';
            }
        }
        return guid;
    }

  /**
    * 获取文件上传目录
    */
  async getUploadFile() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    // 基础的目录
    const uploadBasePath = 'app/public/img';
    // 生成唯一文件名
    const filename = `${Date.now()}${Number.parseInt(
      Math.random() * 1000
    )}${path.extname(stream.filename).toLocaleLowerCase()}`;
    // 生成文件夹
    // const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
    // mkdirsSync(path.join(uploadBasePath, dirname));
    // 生成写入路径
    const target = path.join(uploadBasePath, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      ctx.throw(500, err);
    }

    const url = path.join('/public/img', filename).replace(/\\|\//g, '/');
    // await this.app.model.Image.create({ url, name: url, path: url });
    const row = { host: `http://${ctx.request.ip}:3030`, url };
    // ctx.apiSuccess(row);
    return row;
  }
  async deleteImage(url) {
    const filepath = path.join('app', url);
    // 删除文件
    fs.unlink(filepath, err => {
      if (err) { console.log(err); }
    });
    return { code: 0, msg: '删除成功' };
  }
}

module.exports = ToolService;
