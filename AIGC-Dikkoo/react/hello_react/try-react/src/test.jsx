/**
 * ES6 module 引入方式
 * 解构的方式引入：add.js中含多种方法/对象，此处只引入add.js中的add方法
 */
import { add } from './public/js/add.js';

console.log(add(1, 2)); // 3