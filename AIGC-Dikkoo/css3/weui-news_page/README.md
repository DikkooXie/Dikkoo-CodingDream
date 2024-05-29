# 基于weui，快速搭建新闻列表页

- 组件
    - tabbar 导航栏
    - searchbar 搜索栏
    - list 新闻列表

- WeUI 组件库
    - 微信生态
    - 引入CSS文件
        - 使用"weui.min.css"，这个版本删去了换行、注释等内容以减小文件大小，使得传输更快，更利于项目上线。
        - 非压缩版本保留了所有换行与注释，便于开发者在开发阶段阅读。
        - 引入文件一般使用CDN加速的链接。CDN是内容分发网络，自动分配对用户来说最优的的节点服务器下载资源，提高用户体验。

- tab 切换
    - 事件监听在dom元素上，而不是集合上。
    - 要在循环事件监听中拿到下标
        - for循环同步
        - event监听异步
        - 需要用作用域锁住下标值
            - es5 var 立即执行闭包i
            - es6 let 块级作用域 + for{...}
    - this 事件元素
    - classList add contains remove等方法
    - 点击当前已选中的直接return，不做操作

- searchbar

- 无障碍浏览
    - label可以被读屏器读取
    - input被visibility hidden
    - weui-search-bar_focusing