function Duck(nickname) {
    console.log(this);
    this.nickname = nickname;
}

// ...[name]是ES6的rest参数，表示剩余的参数，它是一个数组
// 若在ES5中，可以使用arguments来获取剩余的参数
function myNew(constructor, ...args) {
    let a = 1; // 简单数据类型，内存在栈内存
    let b = a; // 值的拷贝
    let obj = {}; // 对象，内存在堆内存 地址引用

    // .apply()方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数
    constructor.apply(obj, args); // 将构造函数的this指向新对象，并传入参数(如果有的话

    // 1. 将构造函数的原型对象赋值给新对象的原型对象
    obj.__proto__ = constructor.prototype;

    // 2. 返回新对象
    return obj;
}

// let duck = new Duck('Donald');
let duck = myNew(Duck, 'Donald', 18, "猛男");