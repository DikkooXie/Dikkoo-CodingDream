## 手风琴效果

### 布局方式

- 文档流：盒子用块级元素，从上到下，从左到右
- ul：使用了弹性布局，开辟一个全新的格式化上下文
    - ul父元素和子元素们之间关系的一种布局（手机大小不一）
    - 子元素默认在一行，不会换行，不是inline

### stylus
    css超集，支持预编译
    - 省事，`{}`、`:`、`;`都不需要，取而代之的是`tab`缩进。
    - 选择器也可以缩进
        自动加上限定前缀
        即缩进又表示是同一级别，&:checked :nth-child
    - 模块性 stylus给css引入了编程特性

    使用编译后的css文件
    `stylus common.styl -o common.css output`
    `stylus common.styl -w common.css output` 一直监听

