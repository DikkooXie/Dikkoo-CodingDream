---
theme: cyanosis
highlight: vs2015
---
# JavaScript备忘录 —— 创建数组的3种方式

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/279d4914e3ff4f31b16a8a0fc45dfb9b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=463&h=295&s=88925&e=png&b=facf57" alt="image.png" width="70%" /></p>

## 1 # 直接声明

JavaScript是**弱类型语言**，因此你可以直接将一个数组赋值给一个变量，即创建了一个数组：

```javascript
let arr = [1, 2, 3];
```

**绝大多数情况下**使用的都会使用这种语法创建/声明数组。其中数组使用中括号 `[...]` 包裹，元素之间用逗号 `,` 分隔。

有时为了代码优雅，遇到数组元素很长很多时，也可以采用换行方式编写：

```javascript
let fruit - [
    "apple",
    "banana",
    "orange",
    "..."
]
```

## 2 # 以对象方式创建数组

这是创建数组的另一种语法，即使用构造函数 `Arrary()`：

```javascript
let arr = new Array();
let arr = Array();
```

> **备注：**  调用 `Array()` 时可以使用或不使用 `new`。两者都会创建一个新的 `Array` 实例。但出于编程规范，建议使用 `new` 关键字。

用这种方式创建数组是，里面的参数有两种使用情况：

### 1. 仅一个Number类型参数

```javascript
let arr = new Array(6);
```

当只传入一个 `Number`类型 的参数时，传入的参数则会被认定为是所**创建数组的长度**，而非**元素**。且这个数组**仅有长度没有任何元素**，若访问则是`undefined`。

> **补充知识：** 
> 
> 含空槽的数组又被称作为**稀疏数组**。稀疏数组在使用**数组迭代方法**时，空槽元素都将被跳过。如果访问空槽元素，结果会是 `undefine`。

```javascript
let arr = new Array(6);
console.log(arr); // [ <6 empty items> ]
console.log(arr[0]); // undefined
console.log(arr.length); // 6
```

### 2. 有一个非Number类型参数 或 有多个参数

续上回，如**只有一个参数**但不是 `Number`类型，则参数会被正常认定为是**数组的一个元素**。

```javascript
let arr = new Array("hello");
console.log(arr); // [ 'hello' ]
console.log(arr[0]); // hello
console.log(arr.length); // 1
```

有多个参数，则效果就如同使用`[...]`声明数组一样，所有参数都被视作数组的元素。

```javascript
let arr = new Array("hello", "world", "!");
console.log(arr); // [ 'hello', 'world', '!' ]
console.log(arr.length); // 3
```

此种方式**一般不会使用**，不但有可能会引起一些误会，也没有中括号`[...]`方式简洁。

## 3 # 使用 `Array.from()` 方法创建

上面两种创建数组的基础方式都无法创建一个**初始化的数组**，这在一些情况下无法满足我们的需求，例如创建**哈希数组**等等。这便是 `Array.from()` 能解决的第一个问题。

**`Array.from()`**  是一个全局下的静态方法，其作用是从[可迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE)或[类数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#%E4%BD%BF%E7%94%A8%E7%B1%BB%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1)对象创建一个新的浅拷贝的数组实例。不仅如此，还可以附带一个**映射函数**为数组内部的元素进行**初始化**操作。

首先我们先搞明白`Array.from()`要求传入的**第一个参数** —— 一个 **类数组对象** 或 **可迭代对象**。

### 1. 由*类数组*对象创建数组

该方法会根据**类数组对象**创建一个长度为`length`的数组，其中的元素`key`是**合理下标值**的元素。

> **什么是类数组对象？**
> 
> 顾名思义，就是形似数组的对象。对象的属性都含有`key`与`value`，而这个关系也可以看作是数组的**下标**与**值**的关系——`key`为**下标**，`value`**为值**。此外还有一个特别的`key`是`length`，用于表示数组长度。
> 
> 类数组对象还有个别名叫`arguments`对象。
> 
> 所以一个形似数组的对象是：
> ```javascript
> let arguments = {
>     0: 1,
>     1: 2,
>     2: 3,
>     3: 4,
>     length: 4
> }
> ```

同时，这里举几个用**不符合规则**的类数组对象创建数组的样例：

- #### 长度与元素数量不符

元素数量会严格按照`length`的值执行。如果没有`length`，则默认为`0`——即一个空数组。

```javascript
let arguments = {
    0: 1,
    1: 2,
    2: 3,
    length: 4
}

let arr = Array.from(arguments);
console.log(arr); // [1, 2, 3, undefined]
```

```javascript
let arguments = {
    0: 1,
    1: 2,
    2: 3,
    length: 0
}

let arr = Array.from(arguments);
console.log(arr); // []
```

- #### 键值不符合下标规范

如键值不符合下标规范，则这个键值对会被直接忽略。其它符合规则的键值对则被当作数组元素。

```javascript
let arguments = {
    0: 1,
    1: 2,
    3: 3,
    length: 4
}

let arr = Array.from(arguments);
console.log(arr); // [1, 2, undefined]
```

### 2. 由*可迭代*对象创建数组

除了从类数组对象创建数组，`Array.from()`也可以从任何可迭代对象创建数组。

> **什么是可迭代对象？**
> 
> 可迭代对象是实现了`[Symbol.iterator]`方法的对象，这个方法返回一个迭代器。这个迭代器对象又具有`next()`方法，每次调用`next()`方法就会返回一个包含`value`和`done`属性的对象，用于遍历该可迭代对象。
> 
> 常见的内置可迭代对象有:
> 
> -   `String`
> -   `Array`
> -   `TypedArray`（例如 `Uint8Array`）
> -   `NodeList`
> -   `HTMLCollection`
> -   `arguments`对象
> -   用户自定义的可迭代对象

比如从`String`创建数组:

```javascript
let str = 'hello';
let arr = Array.from(str);
console.log(arr); // ["h", "e", "l", "l", "o"]
```

再比如从`Set`创建数组:

```javascript
let set = new Set([1, 2, 3]);
let arr = Array.from(set);
console.log(arr); // [1, 2, 3]
```

### 3. 映射函数

除此之外，`Array.from()`还可以接受**第二个参数**，作为一个**映射函数**，用于对每个元素进行处理后再放入新数组，达到**初始化**的效果：

```javascript
let set = new Set([1, 2, 3]);
let arr = Array.from(set, x => x * x);
console.log(arr); // [1, 4, 9]
```
这个**映射函数**类似于数组的 `map()` 方法：

> **关于 `map()` 方法**
> 
> `map()`的作用是创建一个**新数组**，其中**每个元素**都由**原数组**中的每个元素都调用一次**提供的函数**后的**返回值**组成。
> 
> `map()`包含两个参数：
> 
> 1. `callbackFn`：为数组中的每个元素执行的函数。它的返回值作为一个元素被添加为新数组中。
> 
> 1. `thisArg`*（可选）*：执行 `callbackFn` 时用作 `this` 的值。
> 
> 其中的`callbackFn`被调用时将传入 **3 个参数**:
> 
> 1.  `currentValue`： 正在处理的当前元素。
> 1.  `index`*（可选）*： 正在处理的当前元素的索引。
> 1.  `array`*（可选）*： 调用了 `map()` 的数组本身。

但是`Array.from()`中的**映射函数**被调用时只传入 **2 个参数**（`element`、`index`），**不接受** `map()` 中`callbackFn`的第三个参数`array`。因为`Array.from()`的执行过程中**数组仍然在构建**。

除此之外，`Array.from()` 方法还接受第三个可选参数,这个参数被称为"this 值"，与`map()`的`thisArg`参数一致。

```js
let person = {
  name: 'John',
  sayHello: function() {
    return `Hello, my name is ${this.name}`;
  }
};

let nameArr = Array.from([1, 2, 3], function() {
  return this.sayHello();
}, person);

console.log(nameArr); // ["Hello, my name is John", "Hello, my name is John", "Hello, my name is John"]
```

所以可以说`Array.from(obj, mapFn, thisArg)` 和 `Array.from(obj).map(mapFn, thisArg)` 会具有相同的结果。只是`Array.from()`**不会创建中间数组**，而是直接构建一个新数组。

#### `Array.from()` 映射函数使用案例

- ##### 初始化哈希函数

```js
let hash = Array.from({length: 26}, (item) => item = 0);
```
- ##### 将字符串转换为大写

```js
let str = 'hello';
let arr = Array.from(str, (char) => char.toUpperCase());
console.log(arr); // ["H", "E", "L", "L", "O"]
```

- ##### 平方数组元素

```js
let numbers = [1, 2, 3, 4, 5];
let squaredNumbers = Array.from(numbers, (x) => x * x);
console.log(squaredNumbers); // [1, 4, 9, 16, 25]
```

- ##### 获取元素及其索引

```js
let colors = ['red', 'green', 'blue'];
let colorDetails = Array.from(colors, (color, index) => `${index}. ${color}`);
console.log(colorDetails); // ["0. red", "1. green", "2. blue"]
```

- ##### 使用箭头函数作为映射函数

```js
let set = new Set([1, 2, 3]);
let doubledSet = Array.from(set, x => x * 2);
console.log(doubledSet); // [2, 4, 6]
```

## 总结

在JavaScript中，**创建数组**有 **3 种主要方式**，每种方式都有其独特的特点和适用场景，选择合适的数组创建方式可以提高代码的可读性和性能。

####  **直接声明**

-   **特点**：语法简洁、直观，适用于大部分场景。

-   **使用场景**：适合绝大多数的数组创建需求，尤其是需要创建包含已知元素的数组。

-   **案例**：

    ```javascript
    let arr = [1, 2, 3];
    let fruits = [
        "apple",
        "banana",
        "orange",
        "..."
    ];
    ```

####  **以对象方式创建数组**

-   **特点**：使用`Array()`构造函数，可以创建空数组或指定长度的数组。适用于一些特殊情况。

-   **使用场景**：适合需要创建特定长度的空数组或从单个非数字参数创建数组的情况。

-   **案例**：

    ```javascript
    let arr = new Array(6); // 创建一个长度为6的空数组
    let singleElementArray = new Array("hello"); // 创建一个包含单个元素的数组
    let multipleElementsArray = new Array("hello", "world", "!"); // 创建一个包含多个元素的数组
    ```

####  **使用`Array.from()`方法创建**：

-   **特点**：从类数组对象或可迭代对象创建数组，同时可以使用映射函数对数组元素进行初始化操作。

-   **使用场景**：适合从类数组对象（如`arguments`对象）、可迭代对象（如`Set`、`String`）创建数组，或需要对元素进行初始化操作时使用。

-   **案例**：

    ```javascript
    // 从类数组对象创建数组
    let arguments = {
        0: 1,
        1: 2,
        2: 3,
        length: 4
    };
    let arr = Array.from(arguments);
    console.log(arr); // [1, 2, 3, undefined]

    // 从字符串创建数组
    let str = 'hello';
    let strArray = Array.from(str);
    console.log(strArray); // ["h", "e", "l", "l", "o"]

    // 使用映射函数
    let numbers = [1, 2, 3, 4, 5];
    let squaredNumbers = Array.from(numbers, x => x * x);
    console.log(squaredNumbers); // [1, 4, 9, 16, 25]
    ```



## 参考资料

- [数组 (javascript.info)](https://zh.javascript.info/array#new-array)
- [数组方法 (javascript.info)](https://zh.javascript.info/array-methods#zhuan-huan-shu-zu)
- [Array() 构造函数 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)
