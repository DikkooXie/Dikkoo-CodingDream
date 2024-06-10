---
theme: cyanosis
highlight: vs2015
---

### 关于 OOCSS

OOCSS (Object-Oriented CSS) 是由 Nicole Sullivan 提出的一种 CSS 编写方法论。顾名思义，OOCSS就是面向对象的CSS，其核心思想就是面向对象编程（OPP）的抽象思维，旨在提高 CSS 代码的可维护性和复用性。

> **面向对象编程（OOP)**
> 
> 面向对象编程 (OOP) 是一种编程范式，它将概念表示为具有数据字段（描述对象的属性）和称为方法的相关过程的“对象”。对象是类的实例，用于相互交互以设计应用程序和计算机程序。

在现代前端开发中，许多企业和开发团队都在使用 OOCSS 来优化其 CSS 代码，如 [**Facebook**](https://www.facebook.com/) 和 [**Salesforce**](https://www.salesforce.com/) 等。

而且若使用过 [Bootstrap](https://www.bootcss.com/) 这一框架，那你就已经接触到了这一思想，因为设计 Bootstrap 的理论基础就是 OOCSS。


<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8216aa81a8648d98a2e8ad48fc239a6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=390&h=260&s=97351&e=png&b=f2eff9" alt="image.png"  /></p>

#### OOCSS 解决的问题

很多开发者在编写 CSS 时，经常会遇到以下问题：

- **样式重复：** 同样的样式在不同的地方重复定义，导致代码冗余。
- **代码难以维护：** 随着项目规模的扩大，CSS 代码变得越来越复杂，难以维护。
- **样式冲突：** 不同组件之间的样式容易互相干扰，导致样式冲突。
 
但 OOCSS 则将CSS代码模块化，大量减少了样式重复和冲突的问题，且做到了修改一个模块可以同时修改多个组件，增加了可维护性。

### OOCSS 总体思想

OOCSS 的核心思想是 **通过将 CSS 代码模块化，提高代码的复用性和可维护性**。且各个模块之间不相互影响，模块也可以随时随地使用。

所以 OOCSS 的**代码风格**就可以浓缩为：
- **零件多而散：** 一个DOM元素上可能挂了许多个类名才能拼接出一个效果。
- **不使用继承选择符：** 既然要“随时随地用”，当然不能受到“继承”关系的制约，所以OOCSS几乎不适用继承选择符。

学习 OOCSS 需要了解其**两大基本原则**：
- **分离结构与外观 / Separate structure and skin**
- **分离容器与内容 / Separate container and content**

#### 分离结构与外观

**分离结构与外观**的含义就是：一个组件的**结构**（如宽高、边框、边距等）和**外观**（如背景、颜色等）应该**分开定义**在不同的 CSS 类当中。

这样做的好处就是，当你想给组件换个“**皮肤**”，就不会再受组件结构相关CSS的影响。你只需把**控制外观的类**更换一下即可实现**换肤**。

这样一来，你能构成的组件样式就有**结构样式数 × 外观样式数** 个，感觉是不是比一个个写好多了？这就是增加了代码复用性。

下面举一个遵循**分离结构与外观**思想的例子：

```css
/* 结构 */
.card {
    border: 1px solid #ddd;
    padding: 16px;
    margin: 16px;
}

/* 外观 */
.card--primary
{
    background-color: #007bff;
    color: white;
}

.card--secondary
{ 
    background-color: #6c757d;
    color: white;
}
```

#### 分离容器与内容

**分离容器和内容**实际上就是要求所有样式尽可能脱离它的内容，不管一开始它是为谁而服务的。

比如一开始专门为一个卡片`.card`设计了一个按钮，命名为`.card-btn`。但是也许这个按钮其实非常通用，卡片的前缀反而局限了这个按钮的用途，此时就是“容器”与“内容”深度绑定了。

另外一个更极端的案例，那就是使用**继承选择符**了，例如`.card .btn`。这不仅在命名上局限了按钮的用途，甚至局限了其在DOM结构中的使用。

所以若要遵守**分离容器与内容**，应当做到：
- **不使用继承选择符**（形如`.container li{...}`的结构），以达到子元素即使离开了容器也应该能正确显示的效果。
- **尽量不给样式限定用途** 以让样式具有可复用性。

### OOCSS 实战案例

#### 再会WeUI组件预览页面

还是继用BEM命名规范实现WeUI按钮预览页面的案例，我们用OOCSS实现一遍。

> **前情提要：**[快收藏！4种大厂常用的CSS命名法(Ⅰ)：BEM - 掘金 (juejin.cn)](https://juejin.cn/post/7377683176229224475)

我们先看一下用**BEM实现**的效果：

[jcode](https://code.juejin.cn/pen/7376069697475149862)

接下来我们开始根据 OOCSS 的两个主要思想——**分离结构与外观**、**分离容器与内容**来重新修改CSS类。

#### 分离容器与内容

BEM中非常看重版型的分割，例如`.page__hd`、`.page__bd`、`.page__fd`等等……

而OOCSS提倡不要被**排版版型**所限制，采用开放的通用类，主打一个哪里需要哪里搬。因此在OOCSS的世界里，通常用`.container`就搞定了！没有那么多名义上的容器块。

```css
.container {
    position: absolute;
    /* 原点对齐 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto; /* 页面超出时自动有滚动条 */
    -webkit-overflow-scrolling: touch; /* 滚动触控感知，含滚动加速度、急停等 */
}
```

如果有细节上的差异，或者想使用**语义化**类名说明，就**定义额外的类**添加有差异的属性即可。

```css
.header {
    padding: 40px;
}

.title {
    font-size: 20px; /* 默认16px */
    font-weight: 400;
    text-align: left;
    margin-bottom: 15px;
}

.description {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.55);
    text-align: left;
    margin-top: 4px;
}
```

#### 分离结构与外观

先是分离结构与外观。**BEM**强调将一个组件的所用样式写在一个CSS类中，用类名来区分不同组件的样式。但是**OOCSS**要求CSS类根据**结构类**和**外观类**将其分开。

- **结构类**定义元素的布局和尺寸。
- **外观类**定义颜色、字体等视觉样式。

**结构类**：

```css
.container, body {
    background-color: #ededed;
}

.container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

.header {
    padding: 40px;
}

.button-area {
    margin: 15px auto;
    padding: 15px;
    text-align: center;
}

.btn {
    display: block;
    width: 120px;
    margin: 0 auto;
    padding: 12px 24px;
    border-radius: 8px;
    -webkit-user-select: none;
    user-select: none;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    line-height: 1.4118;
}

.btn + .btn {
    margin-top: 16px;
}
```

**外观类**：

```css
.primary {
    background-color: #07c160;
    color: #fff;
}

.default {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
}

.warn {
    background-color: #e64340;
    color: #fff;
}

.disabled {
    color: rgba(0, 0, 0, 0.15);
    background-color: rgba(0, 0, 0, 0.05);
}
```

通过分离结构与外观，就可以更容易地复用和组合样式。

例如，`.btn`类定义了按钮的基本结构，而 `.primary`、`.default` 等类则定义了不同按钮的外观。这样，我们可以在不同的上下文中复用 `.btn` 类，而无需重复定义结构样式。

```html
<a href="#" class="btn primary">主要操作</a>
<a href="#" class="btn primary disabled">主要操作</a>
<a href="#" class="btn default">次要操作</a>
<a href="#" class="btn default disabled">次要操作</a>
<a href="#" class="btn warn">警示操作</a>
<a href="#" class="btn warn disabled">警示操作</a>
```

最后上一下整体的代码：

[jcode](https://code.juejin.cn/pen/7378705388633325602)

## 参考资料

- [CSS 架构之OOCSS - 掘金 (juejin.cn)](https://juejin.cn/post/7021067874139635726#heading-5)
- [浅谈 CSS 设计模式系列-OOCSS 篇 | 是 Ray 不是 Array (israynotarray.com)](https://israynotarray.com/css/20200517/168089779/)
- [CSS 模块化方案探讨（BEM、OOCSS、CSS Modules、CSS-in-JS ...） - Web 前端开发 - SegmentFault 思否](https://segmentfault.com/a/1190000039772466#item-6)