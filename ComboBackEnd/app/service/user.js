'use strict';
/** 服务器 调用数据库 */
const Service = require('egg').Service;
const WXBizDataCrypt = require('../public/WXBizDataCrypt');

class IndexService extends Service {
  /** 注册 */
  async registered(params) {
    const { ctx, app } = this;
    const corr = await app.mysql.get('userinfo', { openid: params.name + params.passward });
    if (corr) {
      return { code: 2, msg: '注册过了请直接登录' }
    } else {
      // 生成Token
      const Token = app.jwt.sign({
        openid: params.name, // 需要存储的Token数据
      }, app.config.jwt.secret, { expiresIn: '3600h' });
      // token 存储至数据库中
      await app.mysql.insert('userinfo', {
        openid: params.name,
        nickName: params.name,
        session_key: params.passward,
        avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
        token: Token, update_date: new Date(), create_time: new Date()
      })
      // 将生成的Token返回给前端
      return {
        code: 0,
        token: Token
      };
    }
  }
  // 登录
  async loginH5(params) {
    const { ctx, app } = this;
    const corr = await app.mysql.get('userinfo', { openid: params.name });
    // 如果不存在：就是该用户的第一次登录，后台数据库新添加一个用户信息
    // 如果存在：就不是该用户的第一次登录，以前登陆过，就更新后台数据库中该用户的第一次登录时间
    // 返回用户信息
    if (corr) {
      if (corr.session_key === params.passward) {
        // 生成Token
        const Token = app.jwt.sign({
          openid: params.name // 需要存储的Token数据
        }, app.config.jwt.secret, { expiresIn: '3600h' });
        // token 存储至数据库中
        await app.mysql.update('userinfo', { update_date: new Date(), token: Token }, {
          where: {
            openid: params.name,
          }
        })
        return { code: 0, token: Token };
      } else {
        return { code: 2, msg: '账号或密码不正确' }
      }
    } else {
      return { code: 2, msg: '账号不存在，请注册' }
    }
  }
  // 登录
  async login(params) {
    const { ctx, app } = this;
    const corr = await app.mysql.get('userinfo', { openid: params.openid });
    // 如果不存在：就是该用户的第一次登录，后台数据库新添加一个用户信息
    // 如果存在：就不是该用户的第一次登录，以前登陆过，就更新后台数据库中该用户的第一次登录时间
    // 返回用户信息
    if (corr) {
      // 生成Token
      const Token = app.jwt.sign({
        openid: params.openid, // 需要存储的Token数据
      }, app.config.jwt.secret, { expiresIn: '3600h' });
      await app.mysql.update('userinfo', { update_date: new Date(), token: Token }, {
        where: {
          openid: params.openid
        }
      })
      return { code: 0, token: Token };
    } else {
      // 生成Token
      const Token = app.jwt.sign({
        openid: params.openid, // 需要存储的Token数据
      }, app.config.jwt.secret, { expiresIn: '3600h' });
      // token 存储至数据库中
      const pc = new WXBizDataCrypt(params.appid, params.session_key);
      const data = pc.decryptData(params.encryptedData, params.iv);
      await app.mysql.insert('userinfo', {
        ...params,
        countryCode: data.countryCode,
        phoneNumber: data.phoneNumber,
        purePhoneNumber: data.purePhoneNumber, token: Token, update_date: new Date(),
        create_time: new Date()
      })
      // 将生成的Token返回给前端
      return {
        code: 0,
        token: Token
      };
    }
  }
  /** 粉丝or 关注者 */
  async fans_followers(type, id) {
    const { app } = this;
    // const conn = await app.mysql.beginTransaction();
    try {
      if (type === 'follower') {
        return await app.mysql
          .query(`SELECT DISTINCT * FROM fans fs,userinfo us WHERE us.openid = fs.toUser_id AND fs.formUser_id = ${JSON.stringify(id)}`);
      } else if (type === 'fans') {
        return await app.mysql
          .query(`SELECT DISTINCT * FROM fans fs,userinfo us WHERE us.openid = fs.formUser_id AND fs.toUser_id = ${JSON.stringify(id)}`);
      }
      // await conn.commit();
    } catch (error) {
      // await conn.rollback(); // rollback call won't throw err
      throw error;
    }
  }
}

module.exports = IndexService;