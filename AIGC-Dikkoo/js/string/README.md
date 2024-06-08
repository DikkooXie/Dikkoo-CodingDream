## 删除字符串中的字符

```js
let str = "abcd";
let arr = str.split("");
console.log(arr); // [ 'a', 'b', 'c', 'd' ]
arr.splice(2, 1);
console.log(arr); // [ 'a', 'b', 'd' ]
let newStr = arr.join("");
console.log(newStr); // abd
```

## 查找子字符串/字符

`str.indexOf(subStr, pos)` / `str.lastIndexOf(subStr, pos)`
- `subStr`：要查找的子字符串；
- `pos`（*可选*）：从哪个位置开始查找。

```js
const str = 'hello world';
console.log(str.indexOf('o')); // 4
console.log(str.lastIndexOf('o')); // 7
```

## 反转字符串

`arr.reverse()`

```js
const string = 'abcd';
const newStr = str.split('').reverse().join('');
console.log(newStr); // dcba
```

## 比较字符串


## 判断字符串是否是回文

### 方法1：使用JS自带API

```js
const string = 'yesey';
const newStr = str.split('').reverse().join('');
console.log(str === newStr); // true
```

### 方法2：判断字符串的对称性

```js
/**
 * 
 * @param {string} str 
 * @returns {boolean}
 */
function isPalindrome(str) {
    const len = str.length;
    for(let i = 0; i < len / 2; i++) {
        if(str[i] !== str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}
```