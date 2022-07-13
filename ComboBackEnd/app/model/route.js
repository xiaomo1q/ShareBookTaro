'use strict';

/**
 * 路由模型
 * 链接数据库
 */

module.exports = app => {

  const mongoose = app.mongoose;
  // 定义数据库的结构
  const Schema = mongoose.Schema;
  // 按照mock的数据，字段：name/password id自动生成
  const UserSchema = new Schema({
    icon: { type: String },
    title: { type: String },
    path: { type: String },
    redirect: { type: String },
    routes: [
      {
        icon: { type: String },
        title: { type: String },
        path: { type: String },
        redirect: { type: String },
        component: { type: String },
        roles: [ String ],
      },
    ],
  });
  // 映射到egg-mongo db 库的user表中（不区分大小写）
  const User = mongoose.model('route', UserSchema);

  return User;
};
