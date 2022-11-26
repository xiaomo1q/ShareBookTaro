'use strict';

const await = require('await-stream-ready/lib/await');

const Controller = require('egg').Controller;

class HouseController extends Controller {
    /** 创建聊天 */
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
    /** 查询卖家的书库 */
    async get_toUser_book_list() {
        const { ctx, app } = this;
        try {
            const decoded = await ctx.service.tool.jwtToken();
            const { id } = ctx.request.query;
            const cor = await app.mysql.select("groups_msg_touser", {
                where: { userGroupID: id }
            }) || [];
            if (!!cor && cor.length > 0) {
                const findId = decoded.openid === cor[0].gm_toUserid ? cor[0].gm_fromUserid : cor[0].gm_toUserid
                const corr = await app.mysql
                    .query(`SELECT * FROM db_book_list bl WHERE EXISTS(SELECT * FROM user_connect_book fv, userinfo us
                      WHERE fv.openid = us.openid AND us.openid = ${JSON.stringify(findId)} and fv.isbn = bl.isbn)`);
                ctx.body = corr;
            }
        } catch (error) {
            ctx.body = error;
        }
    }
    /** 生成订单记录 */
    async add_order_information() {
        const { ctx, app } = this;
        const params = ctx.request.body;
        const uuid = await ctx.service.tool.uuid();
        // const decoded = await ctx.service.tool.jwtToken();

        try {
            // {
            //     "oid": "111",
            //     "create_time": null,
            //     "isbn": "9787020090297",
            //     "book_name": null,
            //     "book_url": null,
            //     "toUser_id": null,
            //     "toUser_name": null,
            //     "formUser_id": null,
            //     "formUser_name": null
            //   }
            const result = await app.mysql.get('order_information', params)
            if (!!result) {
                ctx.body = { code: 1, msg: '请勿重复操作' }
            } else {
                const obj = { oid: uuid, create_time: new Date(), ...params }
                await app.mysql.insert("order_information", obj);
                ctx.body = { code: 0, msg: '生成交易记录' }
            }

        } catch (error) {

        }
    }
    /** 查询订单记录 */
    async get_order_information() {
        const { ctx, app } = this;
        const decoded = await ctx.service.tool.jwtToken();
        let obj = {}
        obj.inData = await app.mysql.select("order_information", {
            where: {
                formUser_id: decoded.openid
            }
        }) || [];
        obj.outData = await app.mysql.select("order_information", {
            where: {
                toUser_id: decoded.openid
            }
        }) || [];
        ctx.body = obj
    }
    /**公告通知 */
    async get_notice_list() {
        const { ctx, app } = this;
        try {
            const result = await app.mysql.select('notice_list', { where: { status: 1 } })
            ctx.body = result;
        } catch (error) {
            ctx.body = { code: 0, msg: '失败' }
        }
    }
}

module.exports = HouseController;