'use strict';

/**
 * 用户模型
 * 链接数据库
 */

module.exports = app => {

  const mongoose = app.mongoose;
  // 定义数据库的结构
  const Schema = mongoose.Schema;
  // 按照mock的数据，字段：name/password id自动生成
  const RoleSchema = new Schema({
    name: {
      type: String,
    },
    role: {
      type: String,
    },
    dsc: {
      type: String,
    },
  });
  // 映射到egg-mongo db 库的user表中（不区分大小写）
  const Role = mongoose.model('role', RoleSchema);
  return Role;
};

