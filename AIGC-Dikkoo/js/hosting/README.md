# 前言

JavaScript的这些行为与许多其他编程语言大不相同。大多数编程语言在处理变量和函数时，都是采用更直观的声明和作用域规则。然而，JavaScript的**灵活性**和**宽容性**意味着开发者必须对其内部机制有更深入的了解，才能避免这些容易中招的坑。

这里提供几个非常典型的**反直觉**案例：

- **在声明之前调用变量**

```javascript
console.log(a); // 输出: undefined
var a = 10;
console.log(a); // 输出: 10
```

这种行为在其他许多编程语言中是不可想象的，因为变量通常在声明之前是无法访问的。但这段程序却没有任何报错，正常运行且有输出值。

- **函数传参、内部声明、赋值调用到底谁先谁后**

```javascript
function fn(a) {
    console.log(a);
    var a = 123;
    console.log(a);
    function a() {}
    console.log(a);
    var b = function() {};
    console.log(b);
    function d() {}
    var d = a;
    console.log(d);
}

fn(1);
```

这到底是什么人才才能写出来的代码啊……这样的程序，你能立刻判断出输出的结果吗？


- **同事写的全局变量到处乱飞**

```javascript
global = 100;
function fn() {
  console.log(global);
  global = 200;
  console.log(global);
  var global = 300;
}
fn();
var global;
```

有时候，全局变量和函数内部的变量又混杂在一起，且声明顺序和调用顺序也相当复杂，debug时到底看谁呢？

这些反直觉的行为背后，是JavaScript的预编译特性在起作用。**预编译**是指在代码执行之前，V8引擎会先对代码进行一次扫描，并处理所有的变量和函数声明。这一过程包括变量和函数的提升，以及执行上下文的创建和初始化。

了解V8引擎的**预编译**过程，可以帮助开发者更好地理解和预测代码的行为，避免在编写和调试代码时遇到意外的结果。在接下来的文章中，我们将深入探讨JavaScript的**预编译**特性，揭开这些反直觉行为背后的秘密。

# Javascript的预编译

## 声明提升（Hosting）

JavaScript的**声明提升**机制（Hoisting）是指在执行代码之前，V8引擎会首先扫描代码中的所有变量声明和函数声明，并将它们“提升”到其**所在作用域的顶部**。这一过程使得变量和函数**在其定义之前就可以被访问**。

声明提升主要遵循两个原则：
- **变量声明，声明提升；**
- **函数声明，整体提升；**

### 变量提升

在预编译阶段，所有使用 `var` 声明的变量都会被提升到函数或全局作用域的顶部，但仅提升声明部分，不提升赋值部分。例如：

```javascript
console.log(a); // 输出: undefined
var a = 10;
console.log(a); // 输出: 10
```

上述代码在预编译阶段相当于被解释为：

```javascript
var a;
console.log(a); // 输出: undefined
a = 10;
console.log(a); // 输出: 10
```

使用 `let` 和 `const` 声明的变量也会被提升，但它们在提升时不会初始化为 `undefined`，而是保持在**暂时性死区**（Temporal Dead Zone，TDZ）中，直到变量声明被实际执行：

```
javascript
复制代码
console.log(b); // 抛出ReferenceError: Cannot access 'b' before initialization
let b = 20;
console.log(b); // 输出: 20
```

### 函数提升

函数声明会被整个提升，包括函数体，因此可以在声明之前调用函数：

```javascript
console.log(myFunc()); // 输出: Hello, World!
function myFunc() {
    return 'Hello, World!';
}
```

在预编译阶段相当于：

```javascript
function myFunc() {
    return 'Hello, World!';
}
console.log(myFunc()); // 输出: Hello, World!
```

但是，函数表达式（包括箭头函数）则不会被提升，**仅变量名会被提升**：

```javascript
console.log(myFuncExp); // 输出: undefined
var myFuncExp = function() {
    return 'Hello, World!';
};
console.log(myFuncExp()); // 输出: Hello, World!
```

预编译阶段相当于：

```javascript
var myFuncExp;
console.log(myFuncExp); // 输出: undefined
myFuncExp = function() {
    return 'Hello, World!';
};
console.log(myFuncExp()); // 输出: Hello, World!
```

## 函数的预编译（AO对象）

### 示例程序

```javascript
function fn(a) {
    console.log(a);
    var a = 123;
    console.log(a);
    function a() {}
    console.log(a);
    var b = function() {};
    console.log(b);
    function d() {}
    var d = a;
    console.log(d);
}

fn(1);
```

> 提问：最终程序的输出结果是什么？为什么？

### 函数预编译步骤解读

1. **创建函数的执行上下文对象（激活对象）`AO`。**
    - 当一个函数被调用时，V8引擎会为这个函数创建一个执行上下文，并初始化一个对象`AO`(Activation Object)。这个对象会包含该函数**执行时所需的变量和函数声明**。
1. 找形参和变量声明，将形参和变量名作为`AO`的属性，值为`undefined`。
    - 以示例程序为例，函数`fn(1)`编译时会产生`AO`对象如下：
    ```javascript
    AO = {
        a = undefined;
        b = undefined;
        d = undefined;
    };
    ```
1. **将实参与形参统一。**
    - 读入形参，此时`AO`对象变为：
    ```javascript
    AO = {
        a: 1,
        b: undefined,
        d: undefined
    };
    ```
1. **在函数体内找函数声明，将函数名作为`AO`的属性名，值赋予函数体。**
    - 接下来，V8引擎会扫描函数体中的所有函数声明，并将它们的引用赋给对应的属性名。函数声明会覆盖之前的变量声明或参数名。
    ```javascript
    AO = {
        a: function a() {},
        b: undefined,
        d: function d() {}
    };
    ```
1. **进入代码执行阶段，V8引擎逐行执行代码，将变量赋值实际的值。**

    ```javascript
    function fn(a) {
        console.log(a); // 打印[Function: a]
        var a = 123; // a从[Function: a]变为123
        console.log(a); // 打印123
        function a() {} // 虽然再次声明了函数 a，但在预编译阶段已经处理过，当前 a 的值保持不变。
        console.log(a); // 打印123
        var b = function() {}; // b从undefined变为[Function: b]
        console.log(b); // 打印[Function: b]
        function d() {} // 函数 d 已经在预编译阶段声明并赋值，此时不变。
        var d = a; // d从[Function: d]变为123
        console.log(d); // 打印123
    }
    ```

    最终输出结果为：

    ```
    [Function: a]
    123
    123
    [Function: b]
    123
    ```

## 全局的预编译（GO对象）

### 示例程序

```javascript
global = 100;
function fn() {
  console.log(global);
  global = 200;
  console.log(global);
  var global = 300;
}
fn();
var global;
```

> 提问：程序的输出结果是什么？运行过程是怎样的？

### 全局预编译步骤解读

1. **创建全局执行上下文对象`GO`(Global Object)。**
    - 全局执行上下文创建时，V8引擎会初始化一个全局对象`GO`（在浏览器环境中即`window`对象）。
1. **找变量声明，变量名作为`GO`的属性名，值为`undefined`。**
    - V8引擎会扫描全局代码中的所有变量声明，将它们添加到`GO`对象中，并将值初始化为`undefined`。
    ```javascript
    GO = {
        global: undefined;
        fn: undefined;
    }
    ```
1. **在全局找函数声明，函数名作为`GO`的属性名，值为函数体。**
    - 然后，V8引擎会扫描全局代码中的所有函数声明，将它们的引用添加到`GO`对象中，函数声明会覆盖同名的变量声明。
    ```javascript
    GO = {
        global: undefined,
        fn: function fn() {
            console.log(global);
            global = 200;
            console.log(global);
            var global = 300;
        }
    };
    ```
1. **代码执行阶段。**

    ```javascript
    global = 100; // GO中global从undefined变为100

    function fn() { // 函数声明已经在预编译阶段处理过，这里不做任何变化。
        ... // 函数内容省略
    }

    fn(); // 调用函数 fn，创建函数执行上下文，并初始化 AO。

    var global; // 等待函数执行完成后执行，但已经在预编译阶段声明过，所以不会有任何变化。
    ```

    此时`AO`对象为：
    ```javascript
    AO = {
        global: undefined // var global = 300; 声明的变量提升
    };
    ```

    函数执行情况：
    ```javascript
    function fn() {
        console.log(global); // 调取AO内部global，输出undefined
        global = 200; // 修改AO内global，从undefined变为200
        console.log(global); // 输出200
        var global = 300; // 修改AO内global，从200变为300
    }
    ```

    函数执行完成，局部上下文`AO`销毁，返回全局上下文。

### 变式程序
    
将先前的示例程序中`fn()`函数中`var global = 300;`删除，再探究程序运行结果。

### 变式程序运行步骤解读

#### 全局运行阶段

```javascript
global = 100; // GO中global从undefined变为100

function fn() { // 函数声明已经在预编译阶段处理过，这里不做任何变化。
    ... // 函数内容省略
}

fn(); // 调用函数 fn，创建函数执行上下文，并初始化 AO。

var global; // 等待函数执行完成后执行，但已经在预编译阶段声明过，所以不会有任何变化。
```

`GO`对象当前如下：

```javascript
GO = {
    global: 100,
    fn: function fn() {
        console.log(global);
        global = 200;
        console.log(global);
    }
};
```

#### 函数执行阶段

关于`AO`预编译：在 `fn` 函数的执行上下文中，这次没有局部变量声明 `global`，所以不会有局部变量提升。函数内部会直接访问全局变量 `global`。
```javascript
function fn() {
    console.log(global); // AO内部没有global属性，调用GO中的global，输出 100
    global = 200; // 修改GO中的global，从100变为200
    console.log(global); // 输出200
}
```

#### 输出结果

```bash
100
200
```