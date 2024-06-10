---
theme: cyanosis
highlight: vs2015
---
# 前端面试基础——用CSS画基本图形


<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f9eff33716a4624b70f930bf0a1876b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=600&s=1935674&e=gif&f=160&b=faf6f3" alt="014cda59111771a801216a3ed360ec.gif"  width="70%"/></p>

## 前言

在前端面试中，用 CSS 绘制基础的几何图形就是一个经典的面试考点。你能否熟练地用 CSS 实现这些图形，就能体现你对 CSS 部分基础属性和特性的理解。

其中就包含这些属性：
- `border`
- `border-radius`
- `transform`

下面我们就来学习如何用 CSS 绘制一些常见的基础图形,并深入理解实现的原理。

## 基础图形的绘制

### 圆形

画圆形其实很简单，只需要一个**长宽一致**的正方形元素，然后把它的 `border-radius` 设置为 `50%` 就可以得到一个圆形。

```css
.circle {
  width: 100px;
  height: 100px;
  background-color: #f00;
  border-radius: 50%;
}
```

> **关于 `border-radius` 必须知道：**
> 
> - 其值是圆角的**半径**，因此 `50%` 就等同于用正方形边长的一半在元素中心画圆，得到的就是这个正方形元素的**内接圆**。
> - `border-radius` 可以设置4个角的值，且每个角可以接受两个参数分别制定**水平半径**和**垂直半径**以实现更复杂的效果。默认是**水平半径=垂直半径**，如需另外设置则用`/`分隔。如 `border-radius: 10px 100px / 120px;` 等效于：
>     - `border-top-left-radius: 10px 120px;` 
>     - `border-top-right-radius: 100px 120px;` 
>     - `border-bottom-right-radius: 100px 120px;`
>     - `border-bottom-left-radius: 10px 120px;`

### 椭圆形

椭圆形和圆形差不多，原理都是通过设置 `border-radius: 50%;` 将矩形的角变成圆边，只是宽和高不相等。

```css
.ellipse {
  width: 150px;
  height: 100px;
  background-color: #00f;
  border-radius: 50%;
}
```

> **`border-radius` 的相对值：**
> 
> 思考一下，此时 `border-radius: 50%;` 等效于什么呢？这个`%`是相对于谁？
> 
> 实际上相对的是**元素尺寸中较小边长**：
> - 水平方向的**元素尺寸**是水平宽度`width`加上水平边框`border-left`与`border-right`。
> - 垂直方向的**元素尺寸**是垂直高度`height`加上垂直边框`border-top`与`border-bottom`。
> 
> 且不论是**水平半径**还是**垂直半径**，只要是百分比相对值，都会按这样的规则计算。 
> 
> 这个例子中垂直方向小于水平方向，因此`border-radius: 50%;`和`border-radius: 50% / 50%;`都等效于 `border-radius: 50px;`。

### 三角形

绘制三角形首先需要创建一个**长宽均为 `0`** 的元素，并设置其**边框属性**来实现绘制。

> **为什么要使用长宽为 `0` 的元素？**
> 
> - 如果直接使用一个正方形或矩形元素来绘制三角形，需要通过设置裁剪或者 `transform` 属性来实现。这种方式非常复杂且语义不清。
> - 使用边框绘制三角形可以很容易地调整三角形的大小、形状和颜色。只需要调整边框的宽度和颜色即可。
> - 三角形常常作为页面布局的一部分，比如作为气泡框或者下拉菜单的箭头。使用边框的方式可以很容易地把三角形集成到其他 UI 元素中。

```css
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #0f0;
}
```



<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/537a1d2eb2604a2793de51a55f29c85f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=617&h=496&s=37119&e=png&b=ffffff" alt="image.png" width="70%" /></p>

#### 原理解读

1. 元素宽高都为 `0`，因此元素本身可以看作一个**质点**（即图中*1号黑点*）。
2. `border-bottom` 为这个元素赋予了 `100px` 的高度（从**质点**向下 `100px`）。
    - 但由于这个元素的宽为 `0` 所以这个边框**只有高没有宽**，本质还是什么也没有。
3. 此时再加上 `border-right` ， 给**质点**右侧加了 `50px` 的宽度，并且颜色为透明色。
    - `border-right` 实际上是**上边框的右边界**连接**下边框的右边界**。但由于没有上边框，所以**上边框的左右边界**都是**质点**本身。而下边框的右边界现在是图中*2号黑点*。所以如此一连接，就实现了透明色的一角。剩下区域就由下边框颜色补齐。
4. `border-left` 也是同理。

所以实际上这个元素的宽高都是**边框**提供的。只要搞懂边框是*谁连接谁*就能实现三角形的效果。

因此也可以通过调整**有色边是哪一条**来控制三角形的方向。

> **尖角向左的三角形：**
> ```css
> .triangle {
>   width: 0;
>   height: 0;
>   border-top: 50px solid transparent;
>   border-bottom: 50px solid transparent;
>   border-right: 100px solid #0f0;
> }
> ```

### 扇形

了解了圆形和三角形，我们就可以通过 `border` 和 `border-radius` 联合来实现扇形了。

```css
.sector {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid blue;
    border-radius: 50%;
}
```

<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a64d4f3fa96e4740a084cddf93674514~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=223&h=221&s=11645&e=png&b=ffffff" alt="image.png"  /></p>

#### 原理解读

在这个例子中，虽然元素的宽高都为 `0`，但有一个 `100px` 高的蓝色边框。

当 `border-radius` 设置为 `50%` 时，就等于在**元素中心**（图中*1号橙点*）用边框大小的一半作为**半径**画圆，形成了扇形的效果。

### 梯形

绘制梯形需要通过设置元素的宽高，同时使用不同的边框宽度和透明色来实现。

```css
.trapezoid {
    width: 150px;
    height: 0;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-bottom: 200px solid pink;
}
```

<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b6b7c7dc02d45fb8c9cd4ec8812f02a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=422&h=221&s=21722&e=png&b=ffc0ca" alt="image.png"  /></p>

#### 原理解读

1. 元素高度为 `0` 但下边框提供了`200px`的高度。外加元素宽度为 `150`，初始元素应该是由*1、2号黑点*与*1、2号蓝点*包围的矩形。
2. 此时再加上 `border-right` ， 给**质点**右侧加了 `50px` 的边框宽度，并且颜色为透明色。
    - `border-right` 是**上边框的右边界**连接**下边框的右边界**。上边框是`0`但元素有宽度，所以**上边框的右边界**是*2号黑点*。下边框的右边界现在是图中*3号黑点*。两点连接部分的外侧被填充透明色，而剩余部分（*2、3号黑点*与*2号蓝点*围成的部分）则由下边框颜色填充。
4. `border-left` 也是同理。

### 平行四边形

平行四边形可以由**矩形**使用 `transform` 属性来倾斜元素。

```css
.parallelogram {
  width: 150px;
  height: 100px;
  background-color: #ffa500;
  transform: skew(20deg);
}
```


<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19e67037c8e24d60afe5d26903422065~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=417&h=221&s=4534&e=png&b=ffa200" alt="image.png"  /></p>

#### 原理解读

1.  元素的宽度为 `150px`，高度为 `100px`，形成了一个普通的矩形。
1.  `transform: skew(20deg);` 将元素沿 X 轴倾斜 20 度，从而形成了一个平行四边形。

> **关于 `transform: skew();` 的知识**
> 
> `skew()` 函数用于对元素进行倾斜变换。它可以沿 x 轴和/或 y 轴倾斜元素。`skew()` 有两种形式：
> 
> 1.  **`skew(x-angle, y-angle)`** : 同时沿 x 轴和 y 轴倾斜元素。
> 1.  **`skewX(x-angle)` 和 `skewY(y-angle)`** : 分别沿 x 轴或 y 轴倾斜元素。

### 菱形

绘制菱形可以通过将**正方形**元素旋转 45 度来实现。

```css
.diamond {
  width: 100px;
  height: 100px;
  background-color: #00ced1;
  transform: rotate(45deg);
}
```


<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ff1d993a03243bead7927a3b9b69ff3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=182&h=159&s=1329&e=png&b=ffffff" alt="image.png"  /></p>

> **关于 `transform: rotate();` 的知识**
> 
> `rotate()` 函数用于对元素进行**旋转**变换。它可以围绕元素的**中心点**旋转指定的角度。
> 
> 元素中心点也可以通过 `transform-origin: x-axis y-axis z-axis;` 属性进行指定。

#### 原理解读

1.  元素的宽度和高度都为 `100px`，形成了一个正方形。
1.  `transform: rotate(45deg);` 将正方形旋转 45 度，从而形成了一个菱形。


## 实战运用

### 实战案例 1：气泡对话框

气泡对话框是一种常见的 UI 元素，通常用于聊天应用或消息提示。我们可以使用圆形和三角形来创建一个简单的气泡对话框。

[jcode](https://code.juejin.cn/pen/7377331100915990565)

### HTML

```html
<div class="speech-bubble">
  <div class="bubble-text">Hello, world!</div>
  <div class="bubble-tail"></div>
</div>
```

### CSS

```css
.speech-bubble {
  position: relative;
  display: inline-block;
  max-width: 200px;
  padding: 10px;
  background-color: #00ced1;
  border-radius: 10px;
  color: white;
  font-size: 14px;
}

.bubble-tail {
  position: absolute;
  bottom: -10px; /* Adjust according to the size of the tail */
  left: 20px; /* Adjust to position the tail */
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #00ced1;
}
```

#### 原理解读

1.  `.speech-bubble` 是对话框主体，通过 `border-radius` 和背景颜色来设置样式。
1.  `.bubble-tail` 是对话框的尾巴，通过**三角形**的**边框技巧**实现，并通过 `position: absolute;` 定位在对话框底部。

## 实战案例 2：加载动画

加载动画在网页中非常常见，可以通过一系列的 CSS 动画和基本图形来实现一个简单的加载动画。

[jcode](https://code.juejin.cn/pen/7377331100915990565)

### HTML

```html
<div class="loader">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
```

### CSS

```css
.loader {
  display: flex;
  justify-content: space-around;
  width: 100px;
  margin: 50px auto;
}

.circle {
  width: 20px;
  height: 20px;
  background-color: #f00;
  border-radius: 50%;
  animation: bounce 1.5s infinite;
}

.circle:nth-child(1) {
  animation-delay: 0s;
}

.circle:nth-child(2) {
  animation-delay: 0.3s;
}

.circle:nth-child(3) {
  animation-delay: 0.6s;
}

.circle:nth-child(4) {
  animation-delay: 0.9s;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
```

#### 原理解读

1.  使用 `flex` 布局来水平排列四个圆点。
1.  `.circle` 使用 `border-radius: 50%;` 设置为圆形，并添加动画效果。
1.  `@keyframes bounce` 定义了一个上下弹跳的动画，利用 `transform: translateY` 来实现位移效果。
    > #### @keyframes 规则
    > 
    > `@keyframes <name>` 规则用于创建 CSS 动画，通过定义动画过程中关键帧（关键状态）的样式变化来实现。
    > 
    > ##### 方式1：两点关键帧
    > 
    > ```CSS
    > @keyframes animation-name {
    >   from { /* 初始状态样式 */ }
    >   to { /* 最终形态样式 */ }
    > }
    > ```
    > ##### 方式2：多点关键帧
    > ```css
    > @keyframes animation-name {
    >     0% { /* 初始状态样式 */ }
    >     /* 中间插入多点 */
    >     25% { /* 25%时的状态样式 */ }
    >     75% { /* 75%时的状态样式 */ }
    >     100% { /* 最终形态样式 */ }
    > }
    > ```

    > #### 关于`transform: translateY();`
    > 
    > `transform` 属性用于应用**2D 或 3D 转换**，这里我们使用 `translateY()` 来实现垂直移动。
    > 
    > ```css
    > transform: translateY(value);
    > ```
    > 
    > -   `value` 可以是长度单位（如 `px`、`em`）或百分比。正值向上移动，负值向下移动。

1.  不同的 `.circle` 元素通过 `animation-delay` 设置不同的动画延迟，形成依次弹跳的效果。

    > #### 关于 `animation-delay` 属性
    > 
    > `animation-delay` 用于指定动画延迟开始的时间。其值可以是**秒**或**毫秒**。
