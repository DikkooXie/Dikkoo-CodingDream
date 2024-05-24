# Javascript的预编译

## 声明提升（hosting）

JavaScript的预编译（Hoisting）是指在执行代码之前，JavaScript引擎会首先扫描代码中的所有变量声明和函数声明，并将它们“提升”到其所在作用域的顶部。这一过程使得变量和函数在其定义之前就可以被访问。

声明提升主要遵循两个原则：
- 变量声明，声明提升；
- 函数声明，整体提升；

## 函数的预编译

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

### 函数预编译步骤解读

1. 创建函数的执行上下文对象（激活对象）`AO`。
    - 当一个函数被调用时，JavaScript引擎会为这个函数创建一个执行上下文，并初始化一个对象`AO`(Activation Object)。这个对象会包含该函数**执行时所需的变量和函数声明**。
1. 找形参和变量声明，将形参和变量名作为`AO`的属性，值为`undefined`。
    - 以示例程序为例，函数`fn(1)`编译时会产生`AO`对象如下：
    ```javascript
    AO = {
        a = undefined;
        b = undefined;
        d = undefined;
    };
    ```
1. 将实参与形参统一。
    - 读入形参，此时`AO`对象变为：
    ```javascript
    AO = {
        a: 1,
        b: undefined,
        d: undefined
    };
    ```
1. 在函数体内找函数声明，将函数名作为`AO`的属性名，值赋予函数体。
    - 接下来，V8引擎会扫描函数体中的所有函数声明，并将它们的引用赋给对应的属性名。函数声明会覆盖之前的变量声明或参数名。
    ```javascript
    AO = {
        a: function a() {},
        b: undefined,
        d: function d() {}
    };
    ```
1. 进入代码执行阶段，V8引擎逐行执行代码，将变量赋值实际的值。

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

## 全局的预编译

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

1. 创建全局执行上下文对象`GO`(Global Object)。
    - 全局执行上下文创建时，V8引擎会初始化一个全局对象`GO`（在浏览器环境中即`window`对象）。
1. 找变量声明，变量名作为`GO`的属性名，值为`undefined`。
    - V8引擎会扫描全局代码中的所有变量声明，将它们添加到`GO`对象中，并将值初始化为`undefined`。
    ```javascript
    GO = {
        global: undefined;
        fn: undefined;
    }
    ```
1. 在全局找函数声明，函数名作为`GO`的属性名，值为函数体。
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
1. 代码执行阶段。

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


    
    