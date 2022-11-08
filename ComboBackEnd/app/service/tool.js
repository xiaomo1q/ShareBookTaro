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
            const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
            return decoded;
        } catch (error) {
            return ctx.throw(401, '身份验证失败');
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
        const stream = await ctx.getFileStream(); // egg中获取上传文件的方法
        const filename = stream.filename;
        const target = path.join('app/public/img', filename);
        const _that = this;
        if (!fs.exitsSync('img')) { // 如果路径不存在，则创建
            fs.mkdir('img');
        }
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
            url: 'http://81.68.169.67:3030:3000/public/img/' + filename,
            type: stream.mime,
            fileName: filename,
        };
    }
    async deleteFolderRecursive(url) {
        const files = [];
        //判断给定的路径是否存在
        if (fs.existsSync(url)) {

            //返回文件和子目录的数组
            files = fs.readdirSync(url);

            files.forEach( (file, index)=> {
                // const curPath = url + "/" + file;
                const curPath = path.join(url, file);
                //fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);

                    // 是文件delete file
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            //清除文件夹
            fs.rmdirSync(url);
        } else {
            console.log("给定的路径不存在，请给出正确的路径");
        }
    };
}

module.exports = ToolService;
