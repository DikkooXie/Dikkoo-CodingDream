---
theme: cyanosis
highlight: vs2015
---
## 0 # 关于 TypeScript

我们知道**JavaScript**是一个弱类型的语言，因此在使用过程中是相当灵活的。但在大型项目开发中，这种灵活会导致代码中藏匿着许多**不经意产生的类型问题**导致代码不易维护——因为发现问题时已经是报错相见了。

**TypeScript**是由微软开发维护的JavaScript的**超集**，它在JavaScript的基础之上添加了**静态类型**的支持。这意味着TypeScript可以在**编译时发现并报告类型错误**，而不是在运行时才发现。

### TypeScript 的优点

-  **类型安全**：TS的类型系统可以帮助开发者在编码阶段就发现并修复潜在的错误,提高代码的可靠性和稳定性。
-  **更好的tooling支持**：TS提供了更好的IDE支持，如代码补全、重构、跳转定义等功能，提高了开发效率。
-  **更好的可维护性**：TS的**类型声明**使得代码的结构和意图更加清晰，增强了可读性和可维护性，特别是在团队协作和**大型项目**中非常有优势。

## 1 # TypeScript 的使用

### 1. 在线学习 TypeScript

新手起步可以**不在本地安装** TypeScript 的环境，而是到 [**官网的 Playground 页面**](https://www.typescriptlang.org/play/) 进行在线练习。

**在线练习**有两个好处：

- **不用安装**，即开即用，懒人必备！
- 会提示报错，同时也会输出**等效的 JavaScript 代码**辅助理解！

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/172711f112414c41af17b74a13d36e31~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=822&h=499&s=61418&e=png&b=1c1c1c)

### 2. 在项目中安装 TypeScript

##### 1) 初始化 *Node.js* 项目（已有项目则跳过）

在项目目录中执行：`npm init -y`

##### 2) 安装 TypeScript

在项目目录中执行：`npm i typescript`

##### 3) 初始化 TypeScript

在项目目录中执行：`npx tsc --init`，根目录会自动创建TS的编译配置的 *tsconfig.json* 文件。

> *tsconfig.json* 文件包含以下**ℹ配置信息**：
> 
> - 目标 ECMAScript 版本
> - 输出目录
> - 模块系统
> - ...
> 
> 更多内容可以自己查阅文件中的**ℹ注释**哦~

##### 4) 创建并编写 TypeScript 文件

在项目中创建 `.ts` 结尾的TypeScript文件。

##### 5) 配置编译命令

-   可以在 *package.json* 的 `scripts` 部分添加一个编译命令，如 `"build": "tsc"`。也可以直接在项目目录中使用 `npx tsc` 命令编译。
-   如设置了编译命令，之后在项目目录下运行 `npm run build` 就可以将项目中所有 TypeScript 代码编译成 JavaScript 代码，输出到 *tsconfig.json* 中 `outDir` 属性指定的目录下（默认在项目根目录）。

> **⚠ 注意：** TypeScript 文件**不可以**在 Node.js 或浏览器中直接运行，因此最后都需要通过**编译转换为 JavaScript 文件**才可以测试和上线。

### 3. VS Code 中编写 TypeScript

##### 1) 安装 TypeScript 语言支持扩展

这款插件是微软开发的官方支持插件，用 VS Code 写 TypeScript 必装无疑！

<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c438068e0304668bb6e912419116fd0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=953&h=549&s=50708&e=png&b=202020" alt="image.png" width="70%" /></p>

##### 2) 安装 TypeScript 报错优化扩展

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e139bd50a2e14126b074ad1ee5c1a2f4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=923&h=452&s=48447&e=png&b=202020" alt="image.png" width="70%" /></p>

> 💁 这是**第三方作者**开发的一款 TypeScript 的**附属插件**，可以优化TypeScript的**报错提示**（如下图）。

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f717a0da9e74384a457eb1745e35f32~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=951&h=951&s=86730&e=png&a=1&b=262627" alt="image.png" width="40%" />
<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/586c85be2e564a358063a19148e9c60f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=926&h=952&s=92744&e=png&a=1&b=202021" alt="image.png" width="40%" />



个人觉得还是非常好用的，而且**开源**，大家可以到 Github 支持这位作者！

- GitHub 链接：[**yoavbls/pretty-ts-errors：**  让 TS 报错信息更适合人们阅读~](https://github.com/yoavbls/pretty-ts-errors)




## 3 # 类型限定

**TypeScript** 让 JavaScript 从弱类型变成了**强类型**，它的一个主要特点就是对变量和表达式进行**类型限定**。通过类型限定，编译器能够在代码**执行前**发现潜在的类型错误，从而提高代码的可靠性和可维护性。

> TypeScript 有 **3种** 方式**确定变量或表达式的类型**：
> - **类型推断**
> - **类型注解**
> - **类型断言**
> 
> 且变量的类型一旦被确定就**不能再被更改**。


### 1. 类型推断

TypeScript 拥有强大的类型推断能力，它可以根据代码的上下文**自动推断出变量的类型**。例如： 

```typescript
let message = "Hello, TypeScript!"; // TypeScript 推断出 message 是 string 类型
message = 10; // 报错：不能将类型“number”分配给类型“string”
```

在上面的例子中，TypeScript 会根据赋值语句自动推断出 `message` 变量的类型是 `string`。如果我们之后试图将非字符串的值赋给 `message`，编译器将会报错。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45f7a3b0e9514e06befa5b080c7d81ae~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=897&h=241&s=33093&e=png&b=202020)

### 2. 类型注解

虽然 TypeScript 能够进行类型推断，但这并不直观，会影响对代码的阅读。而**明确的类型注解**可以提高代码的可读性和明确性。类型注解允许我们**显式**地声明变量的类型。例如：

```typescript
let count: number;
count = 42; // 正确
count = "Hello"; // 错误：不能将类型“string”分配给类型“number”
```

类型注解的基本格式就是在**变量名后**添加 `: 类型名`。

通过类型注解，我们可以清晰地定义 `count` 变量的类型为 `number`，并在编译时捕获**类型不匹配**的错误。

### 3. 类型断言

在某些情况下，我们可能已经知道某个值的确切类型，但 TypeScript 编译器**无法通过类型推断得出**。此时，可以使用**类型断言**告诉编译器我们对类型的**假设**。

类型断言有**两种**语法：

```typescript
let someValue: any = "this is a string";
```
- **方式1**：变量名**后**加 `as 类型名`
    ```typescript
    let strLength: number = (someValue as string).length;
    ```
- **方式2**：变量名**前**加 `<类型名>`
    ```typescript
    let strLength: number = (<string>someValue).length;
    ```
在上面的例子中，`someValue` 被声明为 `any` 类型，通过类型断言，我们明确地告诉编译器 `someValue` 是 `string` 类型，并获取它的长度。

类型断言确实有一些使用场景,但是**并不是必须的**。就像上面的例子中，即使没有类型断言，编译器也不会有任何报错。

但是使用**类型断言**可以让 TypeScript 更好地理解你的代码意图，它的**常用用途**一般有以下 **2 种**:

-  **处理 `any` 类型**  
    当一个变量被声明为 `any` 类型时，TypeScript 无法对它进行类型检查。此时使用类型断言可以告诉编译器这个变量的实际类型,从而可以访问该类型的属性和方法。
-  **处理联合类型**  
    > ✋联合类型将会在 **4 # 基础类型和联合类型** 中介绍。建议**阅读完全文后**返回看此部分。

    当一个变量是**联合类型**时，TypeScript 无法确定它的具体类型。使用类型断言可以将它转换成更具体的类型,从而可以访问该类型特有的属性和方法。
    
    ```typescript
    interface Circle {
      kind: 'circle';
      radius: number;
    }

    interface Square {
      kind: 'square';
      side: number;
    }

    type Shape = Circle | Square;

    function getArea(shape: Shape) {
      if ((shape as Circle).radius !== undefined) {
        return Math.PI * (shape as Circle).radius ** 2;
      } else {
        return (shape as Square).side * (shape as Square).side;
      }
    }
    ```
    
    这里我们定义了一个联合类型`Shape`，它可以是`Circle`或`Square`。在`getArea`函数中，我们使用**类型断言**将`shape`参数**转换为**具体的`Circle`或`Square`类型，从而可以访问对应的属性。


> ⚠ 使用类型断言时**要谨慎**，因为**错误的断言**可能会导致**☠运行时错误**。
> 
> ✔ 类型断言仅在我们**非常确定**变量的**实际类型**时使用。

## 4 # 基础类型和联合类型

### 1. 基础类型

前面提到 TS 可以使用**类型注解**的方式声明变量类型，这些 JS 的基础类型都可以声明：

- `string`
- `number`
- `boolean`
- `null`
- `undefined`

当然也有比较特殊的 `any` 代表所有类型都可以。

### 2. 联合类型

**联合类型**允许一个变量可以是**多种类型之一**。使用管道符 (`|`) 分隔每个类型。例如：

```typescript
let value: string | number;
value = "Hello"; // 正确
value = 123;     // 也正确
value = true;    // 错误：不能将类型“boolean”分配给类型“string | number”
```

联合类型**常用于函数参数**，以便允许多种输入类型。例如：

```typescript
function printId(id: string | number) {
  console.log("Your ID is: " + id);
}

printId("ABC123"); // 正确
printId(789);      // 也正确
```

## 5 # 数组、元组与枚举

### 1. 数组

数组是**存储同类型数据**的集合。可以使用**两种**方式声明数组类型：

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
let strings: Array<string> = ["one", "two", "three"];
```

如果需要数组存储多种类型数据，则可以使用**联合类型**，甚至简单粗暴用 `any` ：

```typescript
let numbers: (number|string)[] = ["zero", 1, 2, 3, 4, 5];
let strings: Array<string|number> = ["one", "two", "three", 4];
let arr: any = ["one", "two", "three", 4, true, ];
```

### 2. 元组

**元组（Tuple）** 适用于**固定长度**和**已知类型**的数组。声明元组时，需要指定**每个元素的类型**。例如：

```typescript
let person: [string, number] = ["John", 30];
person = ["John", "thirty"]; // 报错：不能将类型"[string，string]"分配给类型"[string，number]"
person = ["John"]; // 报错：不能将类型"[string]"分配给类型"[string，number]”。源具有1个元素，但目标需要2个
```

### 3. 枚举

**枚举（Enum）** 可以用来限定可选值，或者让**数值**更具**语义化**（如返回编码等）。

使用枚举可以使代码**更具可读性**。声明枚举时可以使用 `enum` 关键字。例如：

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}

let move: Direction = Direction.Up;
```

>  👌 枚举类型是一个**类数组**对象，因此也可以用**数组的方式**进行访问。
>  ```typescript
>  console.log(Direction[0]); // Up
>  ```
>  
>  ⚠ 但注意如用数组的方式访问，其类型不是**枚举类型**而是**值原本的类型**。
>  ```typescript
>  let move: Direction = Direction[0]; // 报错：不能将类型"string"分配给类型"Direction
>  ```


也可以**为枚举成员指定具体的值**，也就是让数值语义化：

```typescript
enum Status {
  Success = 200,
  NotFound = 404,
  ServerError = 500
}

let response: Status = Status.Success;
```

**枚举**使代码更具可读性和可维护性，特别是在**处理常量值**时。

## 6 # 函数

### 1. 参数、可选参数、剩余参数

函数的参数可以包含**必需参数**、**可选参数**和**剩余参数**三个部分。

- **必需参数**：默认情况下，TypeScript 中的函数参数都是必需的。例如：

    ```typescript
    function add(x: number, y: number): number { return x + y; }
    add(1); // 报错：应当有2个参数，但只有一个
    ```

- **可选参数**：在参数名的末尾使用 `?` 标记，则可设置为可选参数。例如：
    
    > ⚠ 可选参数必须在**所有必需参数的右侧**，不可以交叉摆放。
    
    ```typescript
    function greet(name: string, greeting?: string): string {
      return greeting ? `${greeting}, ${name}` : `Hello, ${name}`;
    }
    console.log(greet('John', 'Good morning')); // Good morning, John
    console.log(greet('John')); // Hello, John
    ```

-   **剩余参数**：在**最后一个**参数的参数名前使用 `...` 以定义**不定数量的参数**。例如：
    
    > ⚠ 剩余参数必须指定**数组类型**，剩余的多个参数都会保存在一个数组中。
    
    ```typescript
    function sum(...numbers: number[]): number {
      return numbers.reduce((acc, curr) => acc + curr, 0);
    }
    ```

### 2. 返回值

函数的返回值类型可以**显式声明**在参数`()`的后面，或者不声明（默认`any`）。

如果确定函数没有返回值，则可以使用 `void` 类型限定。例如：

```typescript
function sayHello(): void {
  console.log("Hello!");
}

function multiply(a: number, b: number): number {
  return a * b;
}
```

## 7 # 接口

**接口（Interface）** 是一种用于定义对象结构的方式，类似于结构体。它描述了对象的**属性**和**方法**，但不包含具体的实现。接口的主要作用是**确保对象符合特定的形状**。

可以使用 `interface` 关键字来定义接口。例如：

```typescript
interface Person {
  name: string;
  age: number;
  greet(): string;
}

let john: Person = {
  name: "John",
  age: 25,
  greet: () => "Hello!"
};
```

接口还可以使用 `extends` 关键字 **扩展（extend）** 其他接口：

```typescript
interface Employee extends Person {
  employeeId: number;
}

let jane: Employee = {
  name: "Jane",
  age: 30,
  employeeId: 123,
  greet: () => "Hi!"
};
```

## 8 # 类型别名

**类型别名（Type Alias）** 使用 `type` 关键字定义，可以为任何类型创建一个新名称。类型别名可以用于基础类型、联合类型、元组等。例如：

```typescript
type StringOrNumber = string | number;

let value: StringOrNumber;
value = "Hello"; // 正确
value = 123;     // 也正确
```

类型别名也可以用于**对象类型**，达成和**接口**类似的效果：

```typescript
type Point = {
  x: number;
  y: number;
};

let point: Point = { x: 10, y: 20 };
```

> ⚠ 虽然 `type` 和 `interface` 在定义对象类型时有很多相似之处，并且在大多数情况下**可以互换使用**，但它们在扩展方式、类型组合、复杂类型定义和声明合并等方面存在差异。还是**更加建议使用接口**的方式。

## 9 # 泛型

如果我们想有一个函数的参数可以**接受多种类型**，但多个参数**必须是同一类型**。怎么实现？

```typescript
function test(arg1: string|number, arg2: string|number) {...}
```

上面这个例子就无法实现，因为`arg1`与`arg2`可能存在交叉使用的情况，不能保证参数的类型相同。

而**泛型（Generics）** 允许定义**函数**、**接口**或**类**时使用**类型参数**，使其能够**处理多种类型**。

常用的泛型定义使用尖括号 `<>` 语法。例如：

```typescript
function identity<T>(arg1: T， arg2: T): T {
  return arg;
}

let output1 = identity<string>("Hello", "world!");
let output2 = identity<number>(123, 321);
```

> ⚠ 在调用含泛型的**函数**时，可以不用 `<>` 指定泛型，TS 会进行智能推断。但为了代码更加清晰直观，还是建议用 `<>` 指明泛型类型。

不仅在函数中，泛型也可以应用于**接口**和**类**：

```typescript
interface Box<T> {
  contents: T;
}

let stringBox: Box<string> = { contents: "Hello" };
let numberBox: Box<number> = { contents: 123 };

class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;
```

## END # 总结快查

### 类型限定

**TypeScript** 提供三种方式确定变量或表达式的类型，以提高代码的可靠性和可维护性：

-   **类型推断**：自动推断变量类型，无需显式声明。适用于简单情况。

    -   示例：`let message = "Hello, TypeScript!";`

-   **类型注解**：显式声明变量类型，增强可读性。

    -   使用场景：复杂代码、团队协作。
    -   关键字：`let count: number;`

-   **类型断言**：手动指定类型，适用于编译器无法推断类型的情况。

    -   使用场景：处理 `any` 类型、联合类型。
    -   关键字：`let strLength: number = (someValue as string).length;`

### 基础类型和联合类型

-   **基础类型**：包括 `string`、`number`、`boolean`、`null` 和 `undefined`，用于声明变量的具体类型。

    -   使用场景：明确变量类型，防止类型错误。
    -   关键字：`let username: string;`

-   **联合类型**：允许变量可以是多种类型之一，使用 `|` 分隔。

    -   使用场景：函数参数允许多种类型输入。
    -   关键字：`let value: string | number;`

### 数组、元组与枚举

-   **数组**：存储同类型数据的集合。

    -   使用场景：处理一组同类型数据。
    -   关键字：`let numbers: number[];`

-   **元组**：用于固定长度和已知类型的数组。

    -   使用场景：定义固定结构的数据。
    -   关键字：`let person: [string, number];`

-   **枚举**：为数值类型提供友好名称，增强代码可读性。

    -   使用场景：定义一组相关常量。
    -   关键字：`enum Direction { Up, Down, Left, Right }`

### 函数

-   **参数、可选参数、剩余参数**：定义函数的输入，支持必需参数、可选参数和剩余参数。

    -   使用场景：函数参数管理。
    -   关键字：`function greet(name: string, greeting?: string): string {}`

-   **返回值**：显式声明函数的返回值类型。

    -   使用场景：确保函数返回值类型正确。
    -   关键字：`function multiply(a: number, b: number): number {}`

### 接口

**接口（Interface）** 用于定义对象的结构，包括属性和方法。接口确保对象符合特定的形状。

-   使用场景：定义对象结构，确保类型安全。
-   关键字：`interface Person { name: string; age: number; greet(): string; }`
-   扩展接口：`interface Employee extends Person { employeeId: number; }`

### 类型别名

**类型别名（Type Alias）** 使用 `type` 关键字，为任意类型创建新名称。

-   使用场景：为复杂类型创建简洁名称。
-   关键字：`type StringOrNumber = string | number;`
-   定义对象类型：`type Point = { x: number; y: number; };`

> 建议优先使用接口来定义对象类型，因其扩展性更强。

### 泛型

**泛型（Generics）** 允许定义函数、接口或类时使用类型参数，使其能够处理多种类型。

-   使用场景：定义可重用、灵活和类型安全的代码。
-   关键字：`function identity<T>(arg: T): T { return arg; }`
-   泛型接口和类：`interface Box<T> { contents: T; }`、`class GenericNumber<T> { zeroValue: T; add: (x: T, y: T) => T; }`