/**
 * 身份认证
 */
const whiteList = ['/api/login_code', '/api/login_user']

module.exports = (options) => {
    return async function(ctx, next) {
        //判断接口路径是否在白名单（在 “router 中使用中间件”中不需要验证这一步）
        const isInWhiteList = whiteList.some(item => item == ctx.request.url)
        if (!isInWhiteList) {
            // 拿到前端传过来的 token
            const token = ctx.request.header.authorization
            if (token) {
                //解密token
                const secret = ctx.app.config.jwt.secret
                const decoded = ctx.app.jwt.verify(token, secret) || 'false'
                if (decoded !== 'false') {
                    await next()
                } else {
                    ctx.throw(401, '无效Token')
                }
            } else {
                ctx.throw(401, '无Token')
            }
        } else {
            await next()
        }
    }
}