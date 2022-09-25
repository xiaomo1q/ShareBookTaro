'use strict';

const Service = require('egg').Service;
/**
 * 公共组件
 */
class ToolService extends Service {
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
}

module.exports = ToolService;
