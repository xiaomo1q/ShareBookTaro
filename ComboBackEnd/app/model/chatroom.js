'use strict';

/**
 * 班级模型
 * 链接数据库
 */

module.exports = app => {
  const mongoose = app.mongoose;
  // 定义数据库的结构
  const Schema = mongoose.Schema;
  // 按照mock的数据，字段：name/password id自动生成
  const UserSchema = new Schema({
    name: {
      type: String,
    },
    value: {
      type: String,
    },
    time: {
      type: String,
    },
    size: {
      type: String,
    },
  });
  // 映射到egg-mongo db 库的user表中（不区分大小写）
  const User = mongoose.model('chatroom', UserSchema);

  return User;
};
