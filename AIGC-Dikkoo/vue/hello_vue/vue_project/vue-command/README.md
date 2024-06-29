# Vue组件化

## 1. Vue组件化的概念

Vue组件化是指将一个页面拆分成多个组件，每个组件负责一部分功能，然后组合在一起形成一个完整的页面。Vue组件化的好处是可以提高代码的复用性，降低代码的耦合度，提高开发效率。

## 2. Vue组件的定义

Vue组件的定义有两种方式，一种是全局组件，一种是局部组件。

### 2.1 全局组件

全局组件是在Vue实例化之前定义的组件，可以在任何地方使用。

```javascript
Vue.component('my-component', {
  template: '<div>这是一个全局组件</div>'
})
```

### 2.2 局部组件

局部组件是在Vue实例化之后定义的组件，只能在Vue实例的范围内使用。

```javascript
var vm = new Vue({
  el: '#app',
  components: {
    'my-component': {
      template: '<div>这是一个局部组件</div>'
    }
  }
})
```

## 指令

### 1. v-text 与 v-html

v-text 用于输出纯文本，v-html 用于输出 HTML 代码。

```html
<div v-text="msg"></div>
<div v-html="html"></div>
```

### 2. v-show 与 v-if

v-show 用于控制元素的显示与隐藏，v-if 用于控制元素的存在与否。

```html
<div v-show="isShow"></div>
<div v-if="isShow"></div>
```

二者区别：
- v-show 是通过 CSS 控制元素的显示与隐藏，元素始终存在于 DOM 中，只是通过 CSS 控制其显示与隐藏，所以性能比较好。
- v-if 是通过 DOM 控制元素的存在与否，元素存在于 DOM 中或不存在于 DOM 中，所以性能比较差。

### 3. v-for

v-for 用于循环遍历数组或对象。

```html
<div v-for="item in items"></div>
<div v-for="(value, key) in object"></div>
<div v-for="(value, key, index) in object"></div>
```

v-for 与 :key 的关系：
- v-for 用于循环遍历数组或对象。
- :key 用于指定唯一标识，提高性能。

```html
<div v-for="item in items" :key="item.id"></div>
```

v-for 与 v-if 混用：
> 不建议 v-for 与 v-if 混用，因为 v-for 会优先执行，v-if 会在每次循环中执行。

- v-for 的优先级高于 v-if，所以 v-for 会优先执行。

```html
<div v-for="item in items" v-if="item.show"></div>
```
