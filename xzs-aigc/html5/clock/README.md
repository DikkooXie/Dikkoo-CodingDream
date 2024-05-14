## HTML

## 元素类别

> 参考自：https://juejin.cn/post/6936014446733033486

### 块级元素（`block`）
> 代表：`div`, `from`, `table`, `p`, `pre`, `h1`~`h6`, `dl`, `ol`, `ul` 等；
- 块级元素会单独占一行，多个`block`元素会各自新起一行。
- 默认情况下，`block`元素宽度自动填满其父元素宽度；
- 块级元素可以设置`width`,`height`属性。块级元素即使设置了宽度,仍然是独占一行；
- 块级元素可以设置`margin`和`padding`属性。
    

### 行内/内联元素（`inline`）
> 代表：`span`, `a`, `strong`, `em`, `label` 等；
- `inline`元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化；
- 设置`width`,`height`属性**无效**；
- 对于`margin`和`padding`属性，水平方向可产生边距效果，竖直方向不会不会产生边距效果。

### 块级行内/内联元素（`inline-block`）
> 代表：`input` 等；
- 将对象呈现为inline对象，但对象的内容作为block对象呈现。
- 比如既具有block的宽度高度特性又具有inline的在同行展示的特性。

** 常见的块级元素有 DIV, FORM, TABLE, P, PRE, H1~H6, DL, OL, UL 等。
常见的内联元素有 SPAN, A, STRONG, EM, LABEL, INPUT, SELECT, TEXTAREA, IMG, BR 等。**

## 元素居中的方法

### 弹性布局（flex）

1. 定位到所要居中元素的**父元素**，给予`display: flex;`属性。
2. 添加`justify-content: center;`属性以设置**主轴**方向（默认为水平方向）上居中。
3. 添加`align-items: center;`属性以设置**交叉轴**方向（默认为竖直方向）上居中。
4. 如要更换弹性布局的主轴/交叉轴方向，需调整`flex-direction`属性（默认值为`row`，可调整为`column`以将主轴变为竖直方向）。

## References
- 