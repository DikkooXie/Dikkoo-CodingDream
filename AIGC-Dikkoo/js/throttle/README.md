## 节流

- 思想
    - 在一定时间内，一定执行一次且只执行一次；
    - 闭包
        - 变量
            - last：记录最后一次执行的时间
            - deferTimer：保证每隔一段时间，一定执行一次
        - return一个函数
            - `let now =  +new Date();` 获取当前时间
            - `if(last && now < last + delay)` 间隔过短
                - `clearTimeout(deferTimer);` 清除定时器
                - `deferTimer = setTimeout(() => {` 重新设置定时器，保证每隔一段时间，一定执行一次
                    - `last = now;` 更新最后一次执行的时间
                    - `fn.apply(this, args);` 执行函数
            - `else` 超过预设间隔时间执行 / 第一次执行
                - `last = now;` 更新最后一次执行的时间
                - `fn.apply(this, args);` 执行函数

## 浏览器底层原理

- 浏览器内核
    - 每家厂商的浏览器内核不同
        - webkit：safari、chrome -> 移动端统一，没啥兼容性难度
            - 绝大多数浏览器…… 大多都是webkit的套壳
        - blink：chrome已升级到blink内核，是webkit的升级版
        - gecko：firefox
        - trident：IE
    - 内核组成分为两部分
        - 渲染引擎
            - 负责解析HTML、CSS，构建DOM树、CSS树，布局和绘制等
        - JS引擎（V8）
            - 负责解析和执行JS代码
    - 前端：两个引擎协同工作
    - 后端：只用JS引擎

- 渲染引擎怎么工作的？
    1. parseHTML 解析HTML
        - 将HTML解析成DOM树
    2. style compute 计算CSS
        - 将CSS解析成CSS OM树
    3. layout 计算图层布局
        - 将DOM树和CSS OM树合并成Render树
    4. paint 绘制图层
    5. composite 整合图层成页面

- JS引擎介入
    - JS引擎会阻塞渲染引擎的工作
    - JS引擎会将JS代码解析成抽象语法树
    - JS引擎会将抽象语法树解析成字节码
    - JS引擎会将字节码解析成机器码
    - JS引擎会执行机器码
    - JS引擎会将执行结果返回给渲染引擎

- 为什么CSS要在 head 中引入，JS要放在底部？
    - CSS会阻塞吗？
        - 在下载过程中不阻塞渲染引擎，但在解析过程中会阻塞渲染引擎

### 性能优化

- CSS选择器的性能
    - 从右往左匹配
    - 避免使用通配符
    - 避免使用标签选择器
    - 避免使用后代选择器
    - 避免使用子选择器
    - 避免使用属性选择器
    - 避免使用ID选择器
    - 避免使用!important
