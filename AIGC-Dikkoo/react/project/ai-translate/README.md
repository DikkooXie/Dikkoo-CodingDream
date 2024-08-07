# 智核 AI 翻译

## 项目介绍



### 项目亮点

- NLP（自然语言处理） + 翻译

## 技术栈

### Transformer.js
- 属于前端的 AI 库
- AI 端模型，直接在浏览器端运行，短小精悍
- 来自全球最大AI社区，huggingFace（LLM开源社区）

### React
- 组件
    - 返回JSX的函数就是组件 -> .jsx
        - 不同于Vue的template/script/style三段式写法 -> .vue
    - 函数就是对象
    - React（函数式组件） / Vue（函数式编程setup）
- MVVM（函数） + 组件化思想 + 函数式编程
    - M-V-VM：Model-View-ViewModel
        - Model：数据（状态，redux/pinia/vuex等管理）
        - View：视图（JSX、template，不做DOM）
        - ViewModel：视图模型（逻辑处理，函数式编程）
        - 数据驱动视图
    - 组件化思想：组件是一个独立的功能单元，可以重复使用
    - 函数式编程：函数是一等公民，函数可以作为参数传递，函数可以作为返回值返回
- 对比Vue
    - Vue 优势是API简洁好上手，学习成本低
        - setup
        - ref, reactive, defineProps
        - v-for/v-if
        - v-model 双向绑定
    - React 优势是灵活，可扩展性强，语法偏JS原生风格
        - 函数参数解构props
        - map
        - 认为双向绑定性能不好，坚持使用单向数据流
- 语法理解
    - `<> </>`
        - React.Fragment（文档碎片组件）
        - 占位符，不会生成多余的DOM节点，与div等容器不同
        - 文档碎片组件
    - React Hooks
        - React 16.8 新增的特性，Vue 也借鉴了这一特性；
        - 作用：
            - 在函数组件中使用状态
            - 在函数组件中使用生命周期函数
        - `useState()`
            - 引入一个响应式状态（类似于Vue中的ref）
            - 返回一个数组，第一个元素是状态值，第二个元素是设置状态的函数：`const [count, setCount] = useState(0);`
    - `{ }`
        - JSX 语法中，使用大括号包裹的内容是JS表达式，类似于Vue中的`{{ }}`插值语法。
    - 父子组件通信
        - 父传子：props
        - 子传父：回调函数
        - 兄弟组件通信：状态提升（将共享状态提升到最近的父组件中）
    - JSX
        - JSX 是一种 JavaScript 语法糖，长得像 HTML，但其实是 JavaScript
        - JSX 会被 Babel 编译为 `React.createElement()` 调用
        - JSX 中的属性名采用驼峰命名法，如 `className`、`htmlFor`
        - JSX 中的属性值可以是字符串、表达式、对象、数组等
        - JSX 中的注释：`{/* 注释内容 */}`