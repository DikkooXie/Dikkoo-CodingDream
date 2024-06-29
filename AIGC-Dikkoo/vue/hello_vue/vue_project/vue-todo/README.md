## watch 与 computed

- watch
    - 默认不会主动执行一次。
    - 监听某一变量的变更，然后执行回调函数。
- computed
    - 默认会主动执行一次。
    - 当computed任一**依赖的变量**发生变化时，会重新计算computed的值。