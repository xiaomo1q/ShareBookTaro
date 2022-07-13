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
  const UserSchema = new Schema({
    // _id: {
    //   type: Number,
    // },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    lastTime: {
      type: Number,
    },
    token: {
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
  const User = mongoose.model('users', UserSchema);

  // 方法放到这里
  initUserData(User);

  return User;
};
// Entity 可以绑定具体数据对Model实例化
function initUserData(User) {
  // 查询数据库
  User.find({}, (err, doc) => {
    if (err) {
      console.log(err);
      console.log('创建用户失败');
    } else if (!doc.length) {
      new User({
        username: 'admin',
        password: '123456',
        role: 'admin',
        dsc: '拥有系统内所有菜单和路由权限',
        lastTime: Date.now(),
      }).save();
    } else {
      console.log('-------------创建用户成功--------------');
    }
  });
  // conditions：查询条件；projection：控制返回的字段；options：控制选项；callback：回调函数。
  // Model.create(doc(s), [callback]) 增加数据
  // Model#save([options], [options.safe], [options.validateBeforeSave], [fn]) 保存数据
  // Model.insertMany(doc(s), [options], [callback]) 多条数据插入
  // Model.update(conditions, doc, [options], [callback]) 修改数据
  // Model.remove(conditions, [callback]) 删除数据
  // Model.find(conditions, [projection], [options], [callback]) 查询数据
  // Model.findOne([conditions], [projection], [options], [callback]) 单个查询数据
}
