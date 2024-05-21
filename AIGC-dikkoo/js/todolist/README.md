## 数据类型

### Number
```
let n = 123;
n = 12.345;
```

number 类型代表整数和浮点数。

除了常规的数字，还包括所谓的**特殊数值**（special numeric values）也属于这种类型，如：
- `Infinity`：代表数学概念中的 **无穷大（∞）**。是一个比任何数字都大的特殊值。
    - 除0的结果正是这种类型：
        ```
        alert( 1 / 0 ); // Infinity
        ```
    - 代码中也可以直接使用：
        ```
        alert( Infinity ); // Infinity
        ```
- `NaN`：代表一个计算错误。它是一个不正确的或者一个未定义的数学操作所得到的结果。
    ```
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "not a number" / 2 - 1 ); // NaN
    ```
    所以，如果在数学表达式中有一个 NaN，会被传播到最终结果（只有一个例外：NaN ** 0 结果为 1）。


### BigInt

### String

### Boolean

### null

### undefined

### Object与Symbol

