'use strict';

const Controller = require('egg').Controller;

class HouseController extends Controller {
    async add_messages() {
        const { ctx, app } = this;
        const params = ctx.request.body;
        const decoded = await ctx.service.tool.jwtToken();
        const uuid = await ctx.service.tool.uuid();
        const result = await app.mysql.get('groups_msg_touser', { gm_toUserid: params.id, gm_fromUserid: decoded.openid })
        const _result = await app.mysql.get('groups_msg_touser', { gm_toUserid: decoded.openid, gm_fromUserid: params.id })
        if (result) {
            ctx.body = { code: 0, msg: '聊天中', m_id: result.userGroupID }
        } else if (_result) {
            ctx.body = { code: 0, msg: '聊天中', m_id: _result.userGroupID }
        } else if (params.id === decoded.openid) {
            ctx.body = { code: -1, msg: '自己不可以和自己对话哦' }
        } else {
            /** 一个房间id 对应 俩个用户id */
            await app.mysql.insert("groups_msg_touser", {
                create_time: new Date(),
                gm_fromUserid: decoded.openid,
                gm_fromUserName: params.form_name,
                gm_fromUserAvatarUrl: params.form_avatarUrl,
                gm_toUserid: params.id,
                gm_toUserName: params.name,
                gm_toUserAvatarUrl: params.to_avatarUrl,
                userGroupID: uuid,
                gm_content: ''
            });
            // await app.mysql.insert("messages", {
            //     openid: decoded.openid,
            //     m_time: new Date(),
            //     gm_id: uuid
            // });
            ctx.body = { m_id: uuid, code: 0, msg: '创建聊天', }
        }

    }
    /** 群聊列表 */
    async msg_list() {
        const { ctx, app } = this;
        const decoded = await ctx.service.tool.jwtToken();
        const toUser = await app.mysql.select("groups_msg_touser", {
            where: { gm_toUserid: decoded.openid }
        });
        const fromUser = await app.mysql.select("groups_msg_touser", {
            where: { gm_fromUserid: decoded.openid }
        });
        const data = toUser.concat(fromUser)
        ctx.body = data
    }
}

module.exports = HouseController;