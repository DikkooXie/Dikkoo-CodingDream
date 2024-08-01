/**
 * 与用户相关的接口
 */

const router = require('@koa/router')(); // 直接获得实例对象
const { userLogin } = require('../controllers/index.js');

router.prefix('/user');

/**
 * 登录接口
 * @param {String} username 用户名
 * @param {String} password 密码
 * @return {Object} 返回登录结果
 */
router.post('/login', async (ctx) => {
    try {
        // 获取请求体中的用户名和密码
        const { username, password } = ctx.request.body;
        // 判断用户名和密码是否正确
        const result = await userLogin(username, password);
        // console.log(result);
        // 返回结果
        if(result.length) {
            const data = {
                id: result[0].id,
                username: result[0].username,
                nickname: result[0].nickname,
                avatar: result[0].avatar
            }

            ctx.body = {
                code: '800',
                data,
                msg: '登录成功'
            }
        } else {
            ctx.body = {
                code: '8004',
                msg: '账号或密码错误',
                data: 'error'
            }
        }
    } catch (error) {
        ctx.body = {
            code: '8005',
            msg: '服务器异常，请稍后再试',
            data: error
        }
    }
});

module.exports = router;