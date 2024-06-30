## Cookie

### 认识Cookie

- 本质：存储在客户端浏览器的一段字符串；
- 特点：
    - 体积小（4KB）；
    - HTTP请求时会自动携带，解决了HTTP无状态的问题；
    - 不同域名不共享，同一域名不同路径共享；
    - 有过期时间，默认关闭浏览器后失效；
- 用途：登录状态、购物车、广告推广、跟踪用户行为；
- 格式：字符串，以分号分隔，每个键值对之间用等号连接`name=value;expires=...;path=...;`；
- 关键属性：
    - `domain`：cookie所属域名（自动设置）；
    - `expires`：cookie有效期（默认关闭浏览器后失效，时间格式为UTC时间）；
    - `path`：cookie所属路径（默认为当前路径）；
- 作用域：cookie属于域名及其指定路由，不同域名的cookie不共享；
- 生命周期：默认关闭浏览器（会话）后失效，可以设置过期时间；
- 安全性：
    - cookie是明文传输，容易被截获；
    - 隐私

### 封装一个Cookie管理类

- 新建一个`CookieManager`类
    - `setCookie(name, value, expires)`
    - `getCookie(name)`
    - `removeCookie(name)`

#### 新建/设置一个Cookie

```javascript
/**
 * 设置 Cookie
 * @param {*} name Cookie名称
 * @param {*} value Cookie值
 * @param {*} expires 过期时间，默认为7天
 */
setCookie(name, value, expires = 7) {
    // new Date()获取当前时间
    const expiresTime = new Date();
    console.log(expiresTime);
    if(expires){
        // 设置过期时间：当前时间 + 过期时间
        expiresTime.setTime(expiresTime.getTime() + (expires * 24 * 60 * 60 * 1000));
    }
    // 设置Cookie：name=value;expires=过期时间;path=/
    // expiresTime.toUTCString() 将时间转换为UTC时间
    document.cookie = `${name}=${value};expires=${expiresTime.toUTCString()};path=/`;
}
```

> 时间管理
> - `new Date()`：获取当前时间（格林尼治时间毫秒数）
> - `getTime()`：获取时间戳（格林尼治时间毫秒数）
> - `setTime()`：设置时间戳（格林尼治时间毫秒数）
> - `toUTCString()`：将时间戳转换为UTC时间

#### 获取Cookie

```javascript
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
```

#### 删除Cookie

```javascript
/**
 * 删除 Cookie
 * @param {*} name Cookie名称
 */
removeCookie(name) {
    // 设置Cookie过期时间为过去时间，即使Cookie立即失效
    setCookie(name, '', -1);
}
```