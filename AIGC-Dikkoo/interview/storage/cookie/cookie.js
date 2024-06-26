/**
 * CookieManager
 * Cookie操作难以打理，统一封装操作
 */
class CookieManager {
    constructor() {

    }

    /**
     * 设置 Cookie
     * @param {*} name Cookie名称
     * @param {*} value Cookie值
     * @param {*} expires 过期时间（day），默认为7天
     */
    setCookie(name, value, expires = 7) {
        // new Date()获取当前时间
        const expiresTime = new Date();
        console.log(expiresTime);
        if(expires){ // expires 不为 0 时
            // 设置过期时间：当前时间 + 过期时间
            expiresTime.setTime(expiresTime.getTime() + (expires * 24 * 60 * 60 * 1000));
        }
        // 设置Cookie：name=value;expires=过期时间;
        // expiresTime.toUTCString() 将时间转换为UTC时间
        document.cookie = `${name}=${value};expires=${expiresTime.toUTCString()}`;
    }

    /**
     * 获取 Cookie
     * @param {*} name Cookie名称
     */
    getCookie(name) {
        // 获取所有Cookie
        const cookies = document.cookie.split(';');
        // 遍历Cookie
        for(let i = 0; i < cookies.length; i++){
            // 获取当前Cookie
            const cookie = cookies[i].trim();
            // 判断是否为目标Cookie
            if(cookie.indexOf(name) === 0){
                // 返回目标Cookie的值
                return cookie.substring(name.length + 1);
            }
        }
        // 未找到目标Cookie
        return '';
    }

    /**
     * 删除 Cookie
     * @param {*} name Cookie名称
     */
    removeCookie(name) {
        // 设置Cookie过期时间为过去时间，即使Cookie立即失效
        setCookie(name, '', -1);
    }
}