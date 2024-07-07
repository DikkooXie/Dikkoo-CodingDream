## 回顾React组件

- 页面由组件构成，组件树
- 组件是日常开发与协作的基本单元
- html+css+js可复用功能的组合
- 组件类像html标签一样插入
- 返回jsx的函数就是组件
- 组件包含props（父组件传的参数），自有状态
- 类组件 class

- es6 的功能
    - class 让js成为大型企业级开发语言，传统的面向对象设计模式
        - 原型式面向对象，class只是语法糖，底层还是prototype
    - extends 轻松实现继承，面向对象层次更加细腻
    - 封装 继承 多态
    - 以 react 源码为例，Component组件基类
        - constructor
            1. 基类的构造函数先执行 `super(props)`
            2. 构造自己的状态：初始化state
            3. 必须重写render方法，返回组件的jsx

- react的核心
    - dom编程已经过去，document.getElementById(), innerText()
        - 性能不好，硬编程
    - 组件的动态部分（状态） 隐藏/显示
        ```js
        this.state = {
            isShow: true
        }
        this.setState({
            isShow: !this.state.isShow
        })
        ```
    - 响应式更新
        - 状态变了，界面自动局部刷新
    - 不再使用API编程，而是更好的focus业务

- 组件的生命周期
    <App/>
    - 先实例化
    - componentDidMount JSX渲染完成之后，组件挂载完成才执行