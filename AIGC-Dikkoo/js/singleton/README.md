## 构造函数
- 构造函数 `constructor` 一定要以 `new` 的方式运行，`this`则指向实例。
- 构造函数的运行过程就是实例逐渐添加属性的过程。

## new的过程
1. 先创建一个空对象 `{}`
1. 默认返回对象

```javascript
  function myNew(constructor, ...args) {
        //判断是否为函数
        if(typeof constructor !== 'function') {
            throw 'constructor must be a function';
        }
        // 用new Object() 的方式新建了一个对象obj
        var obj = new Object()
        // 给该对象的__proto__赋值为constructor.prototype，即设置原型链
        obj.__proto__ = fn.prototype.prototype
        // 调用构造函数，将新对象作为上下文
        const result = constructor.apply(obj, args);
        // 如果构造函数返回了一个对象，则返回该对象；否则，返回新对象
        return result instanceof Object ? result : obj;
    }
```

- js 强大的表现力，对象字面量就能搞定
- 一些对象，有共同的行为（每个对象字面量都有自己的函数，开销太大），创建类
- 每个对象肯定要有自己的属性，而且是不一样的，constructor， new Duck()
    this被指定{}
- 方法放到prototype原型对象上，被所有实例共享的方法
- obj.__proto__ = Duck.prototype 如果自身没有，就到原型对象上找。
- js的面向对象不是传统的面向对象，Duck构造函数，没有血缘关系。
- 方法是共享的，性能更好，__proto__原型对象来查找。


- 掘金
    99% 用不到注册，登陆注册弹窗不实例化，网站加载更快
    当点击的时候，实例化一次
    再点其它地方，不再实例化，只是切换`display: none block`