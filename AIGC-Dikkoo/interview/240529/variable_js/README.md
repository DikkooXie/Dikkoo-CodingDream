## 前言

Javascript的分水岭在2015年ES2015（ES6）的诞生。其中非常重要的标志就是 `let` 与 `const` 关键字的引入。

在此之前，JS只有 `var` 一种变量声明方式，它的问题也在 `let` 与 `const` 面前暴露的一览无遗。

另外在ES6之前，JS还支持直接**使用未声明的变量**（如同Python一样），JS会自动帮你将这个变量挂载在**全局**（即时在函数内部，函数外部也能访问）。但这个特性的存在使得开发相当不安全，一般都建议使用 `"use strict";` 以启用[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)来禁用这一特性。

## 问题1：用合适的方式声明变量

```javascript
var PI = 3.1415926;
```

- 提问1：这段代码有何问题？
    - 答：`PI` 应该使用 `const` 定义常量，以避免被修改；

    > 使用 `var` 存在的问题：
    > - 全局变量会污染全局作用域，哪怕是定义变量也应该尽量用 `let` ；
    > - 容易被其他代码修改，导致不可预知的错误。

- 提问2：什么情况下，这段代码没有问题？
    - 答：在 **ES2015（ES6）** 之前，JS只有 `var` 一种方式定义变量，这种情况下这段代码没有任何问题。而且若该程序要支持在老旧设备上运行，使用 `var` 也是更加保守的选择。

- 提问3：那在没有 `const` 时，一般怎么处理**常量**？
    - 答：在以前，一般只通过编程习惯约定**只读变量**的变量名为**全大写**，以提醒自己和其他程序员避免对它进行修改。

## 问题2：变量作用域

```javascript
fuction() {
    var a = 1;
}

console.log(a);
```

- 提问1：

## 问题3：“手搓”常量

在ES6之前只有`var`的情况下，我如何定义一个**常量**呢？

### 方式一：使用 `Obejct.defineProperty()`

```javascript
// "use strict"; 启用严格模式

var myObj = {};

Object.defineProperty(myObj, 'PI', {
    value: 3.1415926,
    writable: false,
    configurable: false
});

myObj.PI = 3.14; // 在严格模式下会报错，普通模式下没有效果。

console.log(myObj.PI); // 3.1415926
```

将常量作为对象的属性来使用，用`Object.defineProperty()` 定义对象上不可修改的属性。

> 详细信息：[MDN - Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

### 方式二：使用 `Object.freeze()`

```javascript
// "use strict"; 启用严格模式

const obj = {
  prop: 42,
};

Object.freeze(obj);

obj.prop = 33; // 在严格模式下会报错，普通模式下没有效果。

console.log(obj.prop); // 期望输出: 42
```

将常量作为对象的属性来使用，用`Object.freeze()`使一个对象被冻结，使现有的属性不可写入和不可配置。

> 详细信息：[MDN - Object.freeze()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

