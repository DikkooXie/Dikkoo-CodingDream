# Vue 的动画

- 要为页面添加动态效果，有哪些方案？
    - CSS3 动画
        - transition css： 过渡动画
        - animation css： 关键帧动画
    - JS 动画
        - styleus + requestAnimationFrame： 逐帧动画
        - v-if / v-show：切换显示隐藏

- Vue 的动画
    - vue提供了一些内置组件
        - transition
        - transition-group

- 良好的编程风格
    - BEM
    - 组件的思维
    - 优质的html/css代码
    - @import 将css 模块化
        - app.css
        - card.css

- 动态效果
    - css transition 切换类名实现
    - css animation 
    - vue transition
        - 如果要更细致的定制效果, 添加一些 内置的 类似生命周期的 **钩子类名**.
        - vue 提供了 transition 类名的钩子.
            - v-enter / v-enter-active / v-enter-to
            - v-leave / v-leave-active / v-leave-to
        - 使开发者可以修改不同时期的动画样式, 使得v-if与v-show的切换动画更加细致.
        - 通过 transition 的 name 属性, 可以为 transition 添加一个名字, 使得不同的 transition 有不同的动画效果.
            - name="fade" -> fade-enter / fade-enter-active / fade-enter-to
        - 通过transition 定义 animation 动画, 只需要定义 .name-enter-active 和 .name-leave-active 即可.

- animate.css 动画库
    - 一个css动画库, 可以直接引入使用
    - demo: http://5kzx.cn/doc.html
    - 使用方法
        - `npm install animate.css`
        - 引入animate.css (在main.js中引入 `import 'animate.css'`)
        - 在元素上添加 animate.css 的类名
            ```vue
            <transition 
                class="animate__tada"
            >
                ...
            </transition>
            ```
        - 通过vue transition 的 enter-active-class 和 leave-active-class 属性, 为动画添加类名
            ```vue
            <transition 
                class="animate__tada"
                enter-active-class="animate__animated animate__tada"
                leave-active-class="animate__animated animate__bounce"
            >
                ...
            </transition>
            ```