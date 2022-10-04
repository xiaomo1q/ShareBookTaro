'use strict';

const Controller = require('egg').Controller;

class HouseController extends Controller {
    async add_messages() {
        const { ctx, app } = this;
        let { id, name } = ctx.request.query;
        const decoded = await ctx.service.tool.jwtToken();
        const uuid = await ctx.service.tool.uuid();
        const result = await app.mysql.get('groups_msg_touser', { gm_toUserid: id, gm_fromUserid: decoded.openid })
        const _result = await app.mysql.get('groups_msg_touser', { gm_toUserid: decoded.openid, gm_fromUserid: id })
        console.log(result);
        if (result.gm_id || _result.gm_id) {
            ctx.body = { msg: '聊天...', m_id: result.userGroupID }
        } else {
            /** 一个房间id 对应 俩个用户id */
            await app.mysql.insert("groups_msg_touser", {
                create_time: new Date(),
                gm_fromUserid: decoded.openid,
                gm_fromUserName: '',
                gm_toUserid: id,
                gm_toUserName: name,
                userGroupID: uuid
            });
            await app.mysql.insert("messages", {
                openid: decoded.openid,
                m_time: new Date(),
                gm_id: uuid
            });
            ctx.body = { m_id: uuid, msg: '创建聊天', }
        }

    }
}

module.exports = HouseController;