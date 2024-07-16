## 做一个“评分”组件

- 第一部分：实现一个评分组件，传入分数显示对应的星星数量
    - 使用`defineProps`传入分数
    - 使用`computed`计算星星数量
        - 小巧思：`"★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value)`

- 第二部分：用`theme`属性实现不同主题
    - 使用`defineProps`传入主题
    - 用`themeObj`对象存储不同主题的样式
    - 使用`computed`计算当前主题的样式
        - 小巧思：`themeObj[props.theme]`
    - 使用`:style`绑定样式

- 第三部分：动态修改分数
    - 使用`defineEmits`定义事件
    - 使用`$emit`触发事件

- 第四部分：父子通信
    - 组件通信原则：数据状态及修改归父组件管理，通过props和自定义事件传递给子组件。
    - 子组件不可以直接修改状态，只能通过`$emit`触发事件，由父组件修改状态。
    - 父组件声明自定义事件
        - `@update-rate="updateRate()"` 自定义事件的名字、函数体。
    - 子组件触发自定义事件
        - `defineEmits(['update-rate'])` 声明自定义事件，可能有多个，用数组传递。
        - `this.$emit('update-rate', rate)` 触发自定义事件，传递参数。

## 打分业务的实现

- 组件的私有状态：
    - width初始值为props.value，mouseOut时恢复为props.value。
    - 定位
        - 把实心星星定位到空心星星上
        - 数据值满足了
        - 空心星星可以交互
        - 每颗星星 @mouseover @mouseout @click