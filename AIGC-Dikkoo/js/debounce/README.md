# 防抖 - 做一个懂你所想的输入框

## 准备工作

- 工具
    - json-server：模拟后端接口，提供数据
- 把网站需要的各个模块的数据都准备好
    - user：用户信息
    - post：文章信息，外键`id`关联用户（users.id = posts.userId）
    - ...
- 通过`json-server`提供数据接口
    - `json-server --watch db.json`

## restful api

### restful api规范

六大原则
- 一切皆资源
- 定义的资源访问方式 Method+URL
    - GET：获取资源
    - POST：创建资源
    - PUT：更新资源
    - DELETE：删除资源

### restful api接口

#### 查询接口

- 所有用户
    - `http://localhost:3000/users`
    - 某个用户的信息
        - `http://localhost:3000/users/1`
- 所有文章
    - `http://localhost:3000/posts`
    - 某篇文章（文章id）
        - `http://localhost:3000/posts/1`
    - 某个用户的所有文章
        - `http://localhost:3000/posts/?userId=1`

#### 增删改接口

- 新增文章？
    - `http://localhost:3000/posts`
    - `POST`请求
    - 请求体：`{ "title": "标题", "content": "内容", "userId": 1 }`

## 事件

- keyup: 按键抬起就触发
    - 搜索框输入内容，实时搜索，猜你喜欢 -> ajaxSuggest(google提出)
- ajax：异步请求
    - 通过ajax请求后端接口，获取数据，动态修改页面内容
- 服务器压力
    - 并发量大，服务器压力大
    - 总连接数上限
    - CPU / 内存资源有限
- 防抖节流
    - 为事件添加请求频率限制，减少请求次数，减轻服务器压力

## 防抖

- 思想
    - 事件触发后，延迟一段时间再执行
    - 如果在这段时间内再次触发，则清除之前的定时器，重新计时
    - 闭包
        - func 交给 debounce（通用防抖功能函数）处理，返回一个新的函数
        - 抽象 func(要防抖的函数, 延迟时间)
        - 清除未执行的定时器，delay时间内的定时器都被干掉了
        - delay时间内，只有最后一个定时器会执行
