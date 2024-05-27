## 问题引入

用编程解决一个泡茶问题：
1. 把水煮沸；
1. 用沸水浸泡茶叶；
1. 把茶水倒进杯子；
1. 加片柠檬。

## 原型模式面向对象

传统的面向对象：
- class constructor
- 方法列表
- get/set/public/private

JavaScript 本身没有“类”的概念，早期版本甚至都没有class关键字。即便 JavaScript 现在也引入了“类”的概念，也只是基于原型模式的语法糖，并不等同于“类”。

### 什么是原型模式？
如果对象的创建成本比较大，而同一个类的不同对象之间差别不大（大部分字段都相同），可以通过拷贝已有对象（原型）的方式来创建新对象，以达到节省创建时间的目的。

这种基于原型来创建对象的方式就叫作原型设计模式，简称**原型模式**。

针对泡茶问题，我们先创建一个**原型对象**`Tea`：
```javascript
function Tea(type) {
    this.type = type;
    console.log('准备泡一杯' + this.type);
}
```

`Tea`是原型对象，也是一个可执行的对象，`this`指向的这些属性即实例的属性模板。

接下来，我们根据泡茶步骤，通过`prototype`为`Tea`添加一些方法：
```javascript
Tea.prototype.boilWater = function() {
    console.log('把水煮沸');
}

Tea.prototype.brew = function() {
    console.log('用沸水浸泡茶叶');
}

Tea.prototype.pourInCup = function() {
    console.log('把茶倒进杯子');
}

Tea.prototype.addLemon = function() {
    console.log('加柠檬');
}
```

然后，再创建两个实例，分别为“绿茶”和“红茶”：
```javascript
var greenTea = new Tea('绿茶');
var redTea = new Tea('红茶');
```

现在，执行实例持有的方法，开始泡一杯绿茶：
```javascript
greenTea.boilWater();
greenTea.brew();
grennTea.pourInCup();
greenTea.addLemon();
......
```

这样，一杯茶就泡好啦！

但是，每次泡茶，都要独立调用四段代码，还有更优雅的方案吗？这时便需要**模板方法接口**。
```javascript
Tea.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addLemon();
}
```

添加了`init()`方法后，我们就可直接使用`greenTea.init()`泡一杯绿茶了。
