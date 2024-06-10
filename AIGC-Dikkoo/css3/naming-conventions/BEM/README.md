---
theme: cyanosis
highlight: vs2015
---

## 前言

为了使得CSS开发更加规范，目前有很多流行的[命名方法论](https://github.com/awesome-css-group/awesome-css#naming-conventions--methodologies-bulb)在尝试在**选择器命名**层面上解决这些问题：
- 减少大型项目中 CSS 占用空间；
- 组织程序员之间的合作和维护大型 CSS 代码库；
- 理清 CSS 的继承关系；
- ......

本系列将逐步列举以下 **4 种**当前中大型企业常用的**CSS命名方法论**进行介绍，并用一个实战样例进行剖析：

- [BEM](https://getbem.com/) - 用“Block”、“Element”、“Modifier”三个层级描述组件。
- [OOCSS](http://oocss.org/) — 使用 CSS “objects” 分离容器和内容。
- [SMACSS](http://smacss.com/) — 编写 CSS 的风格指南，其中包含 CSS 规则的五个类别。
- [AtomicCSS](https://acss.io/) — 即原子式CSS，将样式分解为不可分割的部分。

希望能够帮助你解决CSS开发中的命名问题，找到自己喜欢的命名方式~

## BEM (Block, Element, Modifier)

### 关于 BEM

BEM (Block, Element, Modifier)是由俄罗斯重要门户网站[**Yandex**](https://yandex.com/)（类似于百度、谷歌等）的开发团队提出的一种CSS命名方法论。

> **来自[BEM官方网站 (getbem.com)](https://getbem.com/)对BEM的定义：**
> 
> *BEM —— is a methodology that helps you to create reusable components and code sharing in front‑end development.*
> 
> *BEM —— 是一种帮助您在前端开发中创建可重用组件和代码共享的方法。*

现在有许多国际大型企业都在使用BEM开发网页，除了在BEM官网中罗列的[**JetBrains**](https://www.jetbrains.com/)，国内还有[**微信**](https://weixin.qq.com/)也在使用这一CSS命名方法。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ecdeac4f5fd4b32adb17d7e8b0ddc34~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2516&h=928&s=295577&e=png&b=ffffff)




#### BEM解决的问题

新手编写页面时，一定会在命名上纠结半天。我们都知道要遵守“见名思意”的命名规范，但如光是遵守这一个规范，组件层级关系和样式一多，命名撞车、关系不清等问题就层出不穷，新手就又要纠结半天。

BEM就在解决这一问题。使用BEM，你将认识到：

- 我不需要使用各种高大上的单词阐明我的意图；
- **仅用一个选择器**，也能解释清楚组件的关系；
- 选择器可以清晰到**不依赖DOM结构**也可以读懂；
- 竟然有命名规范能让团队**快速学习并接受**，立减沟通成本。
- ……

### BEM 总体思想

BEM的核心思想是 **通过组件名的唯一性来保证选择器的唯一性，从而保证样式不会污染到组件外**。学习它你只需了解它的**命名层级**与**命名约定**。

#### 命名层级

和编写文章一样，我们通常会用大标题、小标题、有序列表等不同层级的标志来划分文章结构。BEM命名规范也是如此，它规定将所有组件分为三个层级：

1. **区块 / Block：** 代表页面中独立且可复用的底层组件。
2. **元素 / Element：** Block 内部的组成元素，通常用于定义块的内部结构和样式。就像是各种家具、装饰品等，它们的存在才让一个空间与众不同。
3. **修饰符 / Modifier：** 用于改变 Block 或 Element 的外观和行为。比如灯有打开和关闭两种状态，“开”和“闭”就是“灯”这个元素的修饰符。

#### 命名约定

了解到BEM定义了三个层级，那么又该怎么命名来体现这种层级关系呢？BEM便约定了一个命名规范：

- 所有命名通常都用**小写字母**，单词之间用 **单个短线（`-`）** 分隔，不用大驼峰、小驼峰等方式。
- Element 名以所属的 Block 名称为前缀，用 **双下划线（`__`）** 分隔；
- Modifier 名以其修饰的 Block 或 Elment 名称为前缀，用 **双连字符（`--`）** 分隔。

但是，你也可以不完全依照BEM的**命名约定**，仅借用它的**命名层级**思想优化你的CSS结构。例如[WeUI组件预览-Button](https://weui.io/#button_default)的源码中，就没有完全依照**双下划线（`__`）**、**双连字符（`--`）** 等约定命名选择器，但大体思路与**BEM**一致。

> **高情商：** BEM是一个开放的命名规范。

### BEM 实战案例

#### WeUI组件预览页面

> 这是一个微信WeUI中Button组件的预览页面，你也可以点击访问 [WeUI组件预览-Button](https://weui.io/#button_default) 一同领略其源码中的**BEM命名法**。
> 
> 但这个页面源码中，只参考了BEM的**命名层级**，其命名约定采用了团队内部的法则，与BEM**不完全相同**。
> 
> 为了大家能够对原始的BEM命名规范有深刻的了解，本文将会重新编写**完全遵守BEM**的代码来完成这个页面。

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d715f6c2f69d4076a0c4d701645e0719~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1602&h=1596&s=121805&e=png&b=ececec" alt="image.png" width="50%" /></p>

这个页面相当简单，首先我们划分好整个页面布局。先定义整个页面为一个*Block*且命名为`page`。

再看整体的**页面结构**可以大致分为两个部分，它们都属于`page`这个*Block*中的一个结构，所以应当BEM层级中的*Element*：
- 预览界面顶部的标题 - 可以将其命名为`page__hd`。
- 所有按钮样式的展示区域 - 可以将其命名为`page_bd`。

<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fc466dc9e0c443db73d1201eaf2c6a2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1602&h=1596&s=148169&e=png&b=ececec" alt="image.png" width="70%" /></p>

整体结构的代码便是：

```html
...
<body>
    <div class="page">
        <div class="page__hd"></div>
        <div class="page__bd"></div>
    </div>
</body>
```

另外我们可以发现`page__hd`之中的“Button”和“按钮”是整个页面的标题和中文描述，里面的**文本内容只跟页面有关**，其实也算作页面`page`的部分之一，尽管它位于`page__hd`内部。因此，我们分别给它命名为`page__title`和`page__desc`。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a080a7754dc4da0a5e9da11f3b7518f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1490&h=218&s=34959&e=png&b=ededed)

```html
<body>
    <div class="page">
        <div class="page__hd">
            <div class="page__title">Button</div>
            <p class="page__desc">按钮</p>
        </div>
        <div class="page__bd"></div>
    </div>
</body>
```

接下来就是各种按钮的展示了。显而易见，不同的按钮都基于一个**共同特征**——大小一致的圆角矩形。这意味着所有不同的按钮的基于一个**独立且可复用**的**基础按钮**，所以要为这个**基类**以 *Block* 层级命名，这里命名为`weui-btn`。

按钮的种类又分为“主要操作”、“次要操作”、“警示操作”，不同的种类决定了按钮的颜色样式，所以是 *Block* 的**内部结构样式**，故应当是 *Element* 层级。这里分别命名为 `weui-btn__primary`、`weui-btn__default`、`weui-btn__warn`。

除此之外，我们又发现一个种类的按钮又分为“正常”、“加载中”和“禁用”三种**状态**，且所有种类都共有这种状态。状态的描述应该属于 *Modifier* 层级，可以给“加载中”和“禁用”状态的按钮分别命名为`weui-btn--loading`、`weui-btn--disabled`。

这样按钮部分就可以这样编写啦：

```html
<a href="#" class="weui-btn weui-btn--primary">主要操作</a>
<a href="#" class="weui-btn weui-btn--primary weui-button--loading">主要操作</a>
<a href="#" class="weui-btn weui-btn--primary weui-button--disabled">主要操作</a>
<a href="#" class="weui-btn weui-btn--default">次要操作</a>
<a href="#" class="weui-btn weui-btn--default weui-button--loading">次要操作</a>
<a href="#" class="weui-btn weui-btn--default weui-button--disabled">次要操作</a>
<a href="#" class="weui-btn weui-btn--warn">警示操作</a>
<a href="#" class="weui-btn weui-btn--warn weui-button--loading">警示操作</a>
<a href="#" class="weui-btn weui-btn--warn weui-button--disabled">警示操作</a>
```

这里也给出作者最后完成的页面demo（由于比较菜，还没有实现 *loading* 的按钮样式）：

[jcode](https://code.juejin.cn/pen/7376069697475149862)

## 参考资料

- [CSS 模块化方案探讨（BEM、OOCSS、CSS Modules、CSS-in-JS ...）](https://segmentfault.com/a/1190000039772466)
- [值得参考的css理论：OOCSS、SMACSS与BEM - 庭院茶 - SegmentFault 思否](https://segmentfault.com/a/1190000000704006)