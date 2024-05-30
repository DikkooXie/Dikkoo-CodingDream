const arr = [1, [2, [3, 4]]];

// 把数组展开成一维数组

// 方法一：递归
function flatten(arr) {
    let result = [];
    for (let i = 0, len = arr.length; i < len; i++) { // 优化，用len缓存数组长度，避免每次循环都计算数组长度（耗时）
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i])); // 递归: concat() 方法用于连接两个或多个数组。
        } 
        else {
            result.push(arr[i]);
        }
    }
    return result;
}

console.log(flatten(arr)); // [1, 2, 3, 4]

// 方法二：利用数组的flat()方法
console.log(arr.flat(Infinity)); // [1, 2, 3, 4]

// 方法三：利用数组的toString()方法
// 类型转换
// 1. Number()：转换成数字：显式类型转换
// 2. parseInt()：转换成整数
// 3. +：转换成数字（隐式类型转换），前面无字符串时，转换成数字；前面有字符串时，字符串拼接。
function flatten2(arr) {

    let stringArr = arr.toString().split(',');
    stringArr.forEach((item) => {
        item = parseInt(item);
    });
    return stringArr;
}
console.log(flatten2(arr)); // [1, 2, 3, 4]

// .map()方法
// map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
function flatten3(arr) {
    return arr.toString().split(',').map((item) => {
        return parseInt(item);
    });
}

