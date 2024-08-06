const jwt = require('jsonwebtoken');

const secret = 'ecut20231017';
const setting = {
    algorithm: 'HS256', // 加密算法
    expiresIn: '2h', // 过期时间


}

function sign(option) {
    /**
     * option: 用户信息
     * secret: 私钥，防止用户篡改token
     * 
     */
    return jwt.sign(option, secret, setting);
}

module.exports = {
    sign
};