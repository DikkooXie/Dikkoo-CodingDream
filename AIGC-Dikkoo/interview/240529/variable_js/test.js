"use strict";

var myObj = {};

Object.defineProperty(myObj, 'PI', {
    value: 3.1415926,
    writable: false,
    configurable: false
});

myObj.PI = 3.14; // 无效修改

console.log(myObj.PI); // 3.1415926