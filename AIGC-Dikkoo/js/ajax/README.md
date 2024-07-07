---
theme: cyanosis
highlight: vs2015
---

# 颠覆前端开发的Ajax

> ### 本文导航
> 
> - **0 # 背景**：介绍Ajax技术背景，了解它的诞生。
> - **1 # 概述**：了解Ajax的含义与其技术优点。
> - **2 # 原理**：了解Ajax的技术原理——**XMLHttpRequest对象**。
>     - 有实战小项目哦！快和作者一起写一个仿掘金的电影榜吧！
> - *了解现代编程中Ajax的三种实现方式：*
>     - **3 # jQuery与Ajax**
>     - **4 # Axios与Ajax**
>     - **5 # ES7中的fetch()**
> - **补充知识**

## 0 # 背景

> 20世纪90年代，几乎所有的网站都由**HTML页面**实现，服务器处理每一个用户请求都需要**重新加载网页**。
> 
> 这样的处理方式效率不高。用户的体验是所有页面都会消失，再重新加载，即使只是**一部分页面元素改变也要重新加载整个页面**，不仅要刷新改变的部分，连没有变化的部分也要刷新。这会加重服务器的负担。
> 
> —— 摘于 [Ajax - 维基百科(wikipedia.org)](https://zh.wikipedia.org/wiki/Ajax)

<hr>

我们以 [**B站**](https://www.bilibili.com/) 为例，了解一下**这段背景所描述的故事**：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8945aef966b54b93a86f596660eae703~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2455&h=1423&s=3921226&e=png&b=fdfafa)

<hr>

首页上有许多**推荐视频**，如果我们想换一批推荐有什么方法呢？

- 第一种：**重新访问/刷新** B站，推荐的视频就不一样了；
- 第二种：点击页面中的**换一换**按钮，推荐的视频就换了一批；

这两种方式有什么本质上的区别？

- 第一种：**刷新页面**会把页面中**所有的元素重新加载一遍**，这段加载过程是非常缓慢的，所有的HTML结构和CSS样式都会重新下载并渲染。

- 第二种：点击**换一换**，我们发现**仅推荐的视频发生了变化**，页面的其它部分全部雷打不动，而且加载相当迅速。

<hr>

再回看开头所描述的背景，在以前的动态页面几乎没有**换一换**的概念，想要刷新部分内容**只有全局刷新**，用户体验相当糟糕。

为什么会这样？因为当时所有的网页编程都是用**同步加载**的思路。也就像我们传统的**面向过程编程**，程序按部就班一行一行执行，刷新无非就是将代码重新执行一遍。

> 1995年，JAVA语言的第一版发布，随之发布的的[Java applets](https://zh.wikipedia.org/wiki/Java_applet "Java applet")（JAVA小程序）首次实现了**异步加载**。浏览器通过运行嵌入网页中的Java applets**与服务器交换数据**，不必刷新网页。1996年，Internet Explorer将iframe元素加入到HTML，支持局部刷新网页。
>
>  —— 摘于 [Ajax - 维基百科(wikipedia.org)](https://zh.wikipedia.org/wiki/Ajax)

为了解决页面刷新的痛点，**异步加载**的概念横空出世，也就是说可以先加载出**HTML结构**，之后再用其它编程语言**与服务器交换数据**，再对HTML结构进行修改，把数据放在页面的对应结构上。这样就可以实现页面的**部分刷新**。

> **Ajax** 这个词由《*[Ajax: A New Approach to Web Applications](https://web.archive.org/web/20061107032631/http://www.adaptivepath.com/publications/essays/archives/000385.php)*》一文所创，该文的迅速流传提高了人们使用该项技术的意识。另外，对Mozilla/Gecko的支持使得该技术走向成熟，变得更为简单易用。2006 年 4 月 5 日，万维网联盟 (W3C) 发布了 **XMLHttpRequest 对象**的第一个规范草案，试图创建正式的 Web standard 标准。XMLHttpRequest 对象的最新草案于 2016 年 10 月 6 日发布，XMLHttpRequest 规范现已成为现行标准。
>
> —— 摘于 [Ajax - 维基百科(wikipedia.org)](https://zh.wikipedia.org/wiki/Ajax)

基于**异步加载**的概念，**Ajax技术概念**被提出，后续便推动了**异步加载**在互联网页面的广泛应用，并在**JavaScript**中添加了**XMLHttpRequest 对象**帮助开发者实现这一功能。

## 1 # 概述

**Ajax**是*Asynchronous JavaScript and XML*的缩写，即**异步的Javascript与XML**。

### 1.1. 同步与异步
 
- **同步**：即按顺序执行代码，执行完一段代码之前，其后续代码都会被*阻塞*，直到代码执行完毕。
    - 但 *网络通信（如HTTP请求）* 一般耗时较长，使用*同步*方式执行就会导致浏览器暂时停止响应，*用户体验不好*。
- **异步**：在等待代码执行完毕的同时，继续执行*后续代码*（一般后续代码与当前代码无关，不会影响逻辑），不会阻塞浏览器。
 
所以，**Ajax技术**采用**异步**方式执行网络请求，使得用户在等待时可以继续操作页面，提高用户体验。

### 1.2. XML（eXtensible Markup Language）
 
XML是一种*标记语言*，用于存储和传输数据。Ajax最初是用XML格式传输数据，所以命名为Ajax。
 
后来，**JSON格式**逐渐取代XML格式，现在绝大多数情况都会使用*JSON*传输数据。

~~所以现在Ajax也可以理解为*Asynchronous JavaScript and JSON*。~~

### 1.3. Ajax 到底是什么？

Ajax **不是**一种**框架**，也**不是**一种新的**编程语言**，

**而是**一种**使用现有标准的新方法**。

> **Ajax 是：**
> 
> 借助浏览器内置的**XMLHttpRequest 对象**，实现**数据的交换**与**页面的更新**的技术。

所以 Ajax 是借助**浏览器内置的对象**实现的，不需要任何浏览器插件或开发依赖，只需要用户允许在浏览器上执行。

但在后来开发者们为了简化开发，衍生出了如 *jQuery*、*axios* 等框架**简化**实现Ajax的代码量，但本质上都是使用**XMLHttpRequest 对象**实现的。

### 1.4. Ajax 的优点

- **提升用户体验**：异步网络请求不会阻塞浏览器，用户可以继续操作页面。
- **减少网络流量**：只传输数据，不传输页面结构，减少网络流量。
- **提高性能**：减少页面刷新，减少服务器压力，提高性能。

## 2 # 原理

Ajax技术的核心是**XMLHttpRequest 对象**，它是浏览器内置的一个原生对象，用于发出HTTP请求和解析服务器返回的数据。

> **XMLHttpRequest 对象**包含许多的属性、方法与事件，你可以查阅[XMLHttpRequest - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)文档获取有关它的所有信息。本文只选取关键的部分进行解读。

首先我们先实例化一个**XMLHttpRequest 对象**名为`xhr`：

```javascript
const xhr = new XMLHttpRequest();
```

实例化后，常量`xhr`上便拥有了**XMLHttpRequest 对象**上所有的方法与属性了。

在**XMLHttpRequest 对象**上有：

- `open('请求类型', '请求地址', 是否异步执行:boolean)`：配置一个HTTP请求；
- `setRequestHeader('标头的名称', '标头正文')`：配置[HTTP 标头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)。
- `send()`：发送HTTP请求。

两个个关键方法，用于**发出HTTP请求**。现在我来分别介绍他们。

### 2.1. `XMLHttpRequest.open()`

**XMLHttpRequest.open()**  方法**初始化**一个新创建的请求，或**重新初始化**一个请求。

> 当为**已激活的请求**调用此方法 *（`open()`或`openRequest()` 已被调用）* 时，相当于调用`abort()` —— 终止请求的方法。

`open()`方法支持传入 5 个参数，用法为：

```js
xhr.open(method, url, async, user, password);
```

| 参数 | 作用 | 是否必须 |
| --- | --- | --- |
| *method* : string | 指定HTTP请求的**方法** | 是 |
| *url* : string | 请求目标的**url地址** | 是 |
| *async* : boolean | 布尔值，表示是否以**异步**执行 | 否，默认为`true`（异步执行） |
| *user* : string | 当接口需要身份认证时，在该参数下填写**用户名**以认证 | 否 |
| *password* : string | 当接口需要身份认证时，在该参数下填写**密码**以认证 | 否 |

> 对**HTTP请求方法**有疑问？您可到文末“**补充知识**”中获取相关内容。

> **关于异步(async)选项**：
> 
> 对于单线程的JavaScript来说，同步请求很容易破坏用户体验，应该避免（即保持默认异步）。
> 
> 实际上，许多浏览器已**完全弃用**主线程上的**同步 XMLHttpRequest** 支持。

### 2.2. `XMLHttpRequest.setRequestHeader()`

**`setRequestHeader()`**  方法用于**设置 HTTP 请求头部**的值。此方法必须在 `open()`方法和 `send()` 方法之间调用。

如果**多次**对**同一个**请求头赋值，只会生成一个**合并了多个值的请求头**。

> 本文目标在于让不理解Ajax技术的小白快速理解概念。鉴于**设置HTTP标头对于一个HTTP请求来说不是必要的**。故本文对该部分的介绍相对简短，仅提供基本的简介。
> 
> 如您想要了解更多信息，可以跳转到**文末**的“**补充知识**”部分，获取“**HTTP标头**”的相关信息。
> 
> 可参考文档：[HTTP 标头 - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)


### 2.3. `XMLHttpRequest.send()`

调用`xhr`的`open()`方法**配置好一个请求**后，请求设置便记录在了`xhr`对象中的**属性**里。

此时，我们调用`xhr.send()`便可以按照**属性**中的设置，**将指定的请求发送出去**：

```javascript
xhr.send()
```

就是如此简单。这样，你便发出了一个**HTTP请求**。

#### **异步**请求与**同步**请求下的`send()`

在介绍`open()`时，我们了解到可以配置一个**HTTP请求**是**异步**执行还是**同步**执行，这二者的**区别**在`send()`就有所体现了。

`send()`发出**异步**请求或**同步**请求之后，对应的**处理方式**是**不一样**的，接下来我们分别来看看它们有何区别。

<hr>

**默认**情况下，`XMLHttpRequest`所配置的请求是**异步**的。对于一个**异步**请求：

-   **效果**：当调用 `send()` 方法发送请求时，程序不会等待服务器的响应，而是继续执行后续代码。
-   **特点**：
    -   **立即返回**：在异步请求中，`send()` 方法会立即返回。这使得页面不会在等待服务器响应时卡住，可以继续处理其他任务。
    -   **响应处理**：服务器响应到达后，会通过事件（如 `onload`、`onerror` 等）通知客户端，客户端可以在这些事件处理程序中处理响应数据。
-   **示例**：
    ```javascript
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://example.com/api/data', true); // true 表示异步
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
    xhr.send(); // send() 方法立即返回，继续执行后续代码
    console.log('Request sent'); // 这行代码会在请求发送后立即执行
    ```

如果将 `XMLHttpRequest.open()` 方法的**第三个参数**设置为 `false`，请求便是**同步**的。对于**同步**请求：

-   **效果**：在调用 `send()` 方法时，程序会等待服务器的响应，直到响应到达后才继续执行后续代码。
-   **特点**：
    -   **阻塞执行**：在同步请求中，`send()` 方法会**阻塞**执行，直到服务器响应到达。这会导致页面在**等待响应期间无法进行其他操作**，用户体验较差，因此在现代浏览器中**不推荐使用同步**请求，尤其是在主线程中。
-   **示例**：
    ```javascript
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://example.com/api/data', false); // false 表示同步
    xhr.send(); // send() 方法会阻塞，直到服务器响应到达
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    }
    console.log('Request sent'); // 这行代码只有在响应到达并处理后才会执行
    ```
<hr>

> 如需**快速上手**，并进入本文的**实战部分**，以上内容**足矣**。
> 
> 关于`send()`的补充内容可跳转到**文末**的“**补充知识**”部分查阅。

### 2.4. `XMLHttpRequest.onreadystatechange` 事件

前文提到，**异步**的请求`send()`是**立即返回**的，不会站在原地傻等。

这就像你**烧一壶开水**时，你**无需**站在开水壶前等着水烧好，你可以做一些别的事情。

那么问题来了，数据的处理肯定要在**服务器返回数据之后**才能执行，就像我要**泡茶肯定要等水烧好**一样，那我怎么**判断什么时候请求结束**（水烧好）了呢？

此时`XMLHttpRequest`提供了一个**属性**叫做`readyState`，用于标记这个**HTTP请求**进行到哪一步了，它有这些值：


| 值  | 状态                 | 描述                             |
| --- | ------------------ | ------------------------------ |
| `0` | `UNSENT`           |  **未调用**`open()`初始化请求；         |
| `1` | `OPENED`           |  已调用`open()`，**请求已配置**；              |
| `2` | `HEADERS_RECEIVED` |  已调用`send()`，且**头部**和**状态**已**可获得**； |
| `3` | `LOADING`          | 数据下载中，`responseText`中已有**部分**数据。 |
| `4` | `DONE`             | 数据下载**全部完成**。 |

所以我们只需要**判断** `xhr.readyState === 4` 就可以知道**请求结束**（水烧开）了！

但是我们**不可能**写一个`while(1)`循环一直等着 `readyState` 发生变化吧，这和**同步**执行有什么两样？

```javascript
// 绝对的错误案例！！！！！！
while(1) {
    if(xhr.readyState === 4) {
        ...
        break;
    }
}
```

所以它还提供了一个**事件**为 `onreadystatechange`，你可以为它赋值一个**函数**，再每次`readyState`发生变化时，就都会执行一次这个**函数**，我们只要在这个函数中写**判断逻辑**就可以啦！

```javascript
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        ...
    }
}
```

是不是相当**优雅**？还顺带加上了 `xhr.status` **判断请求的状态**。

> **关于 `XMLHttpRequest.status` 属性**
> 
> 它是一个*只读属性*，只用于接收请求发出后*服务器返回的数字状态码*。
> 
> `status` 的值是一个*无符号短整型*。在请求*完成前*或 `XMLHttpRequest`*抛出异常*，`status` 的值为 `0`。
> 
> **status码**是标准的 [HTTP status codes](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status) -> *您可点击跳转到权威的**MDN文档**查阅详细信息*
> 
> 在上面这个例子中，判断`status === 200` 就代表判断成功是否成功。如果服务器响应中*没有明确指定status码*，`XMLHttpRequest.status` 将会*默认为* `200`。


### 2.5. 实战运用

> 接下来我们一起用 *Ajax* 实现一个 **电影热度榜**
> 
> **实战要求：**
> 1. 使用*Ajax技术*向*后端接口*发送请求获取*实时数据*。
> 2. 处理服务器返回的*数据*，将其渲染到页面上。
> 
> **这里提供一个伪接口供大家测试：**
> https://mock.mengxuegu.com/mock/65a91543c4cd67421b34c898/movie/movieList

那我们建立一个**HTML页面**开始我们的实战：

```html
<!DOCTYPE html>
<html lang="zh_cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>电影热度榜</title>
</head>
<body>
    <button onclick="getMovieList()">获取电影列表</button>
    <ul id="hotList"></ul>
</body>
<script>

</script>
</html>
```

页面上我们放置了一个**按钮**，点击调用`getMoiveList()`函数获取**实时榜单**并渲染到`id`为`hotList`的**无序列表**中。接下来我们开始编写`getMovieList()`这个函数。

由于我们是要**发送请求**给**后端接口**获取实时数据，那我们肯定要**使用`XMLHttpRequest`对象**来执行了，我们来一边回忆先前的内容，一边完成整体的结构：
1. 实例化**XMLHttpRequest 对象**；
2. 使用`open()`方法**配置请求**；
3. 为`onreadystatechange`事件**绑定函数**；

```javascript
function getMovieList() { // 朝后端接口发送一个请求，获取需要的数据

        let xhr = new XMLHttpRequest(); // 创建xhr实例
        
        xhr.open( // 配置一个HTTP请求
        'GET', // 请求方法
        'https://mock.mengxuegu.com/mock/65a91543c4cd67421b34c898/movie/movieList', // 请求地址
        true //是否异步
        );
        
        xhr.send(); // 发送请求
        
        xhr.onreadystatechange = () => { // 编写状态变化时调用的函数
           ...
        };
    };
```

整体的雏形已经出来了，接下来就是编写`onreadystatechange`绑定的**函数体**了：

```javascript
xhr.onreadystatechange = () => {
    // 判断 **请求完成** 并且 **请求成功**
    if (xhr.readyState === 4 && xhr.status === 200) {
        // 将请求返回的数据转换为 **JSON格式**，并将其中的movieList取出
        const movieList = JSON.parse(xhr.responseText).movieList;
        // 小小的性能优化，把数组长度直接取出放入内存，便于for循环取用
        const listLength = movieList.length;
        for (let i = 0; i < listLength; i++) { // 遍历movieList，将数据渲染到页面上
            const li = document.createElement('li');
            li.innerText = `${movieList[i].nm} -- ${movieList[i].star}`;
            ul.appendChild(li);
        }
    }
};
```

这样我们的**小demo**就完成了！作者这里再加上~~亿点细节~~，实现这样一个页面：

[jcode](https://code.juejin.cn/pen/7386481796773412899)

## 3 # jQuery与Ajax

### 3.1. 关于jQuery

**jQuery** 是一个快速、简洁的 **JavaScript 库**，封装了许多**好用的函数**旨在**简化** HTML 文档遍历与操作、事件处理、动画效果和 Ajax 交互，使开发者能够更**高效地编写 JavaScript 代码**。

<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8656cf07ab3047b1a0195c8905eee3e9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=268&h=270&s=159548&e=png&b=e2c9ce" alt="image.png"  /></p>

#### jQuery 的特点

-   **简化 DOM 操作**：jQuery 提供了一套**简洁的语法**，使得选择、操作和修改 DOM 元素变得非常容易。
-   **跨浏览器兼容性**：jQuery 解决了不同浏览器之间的**兼容性问题**，确保代码在各种浏览器上都能正常运行。
-   **丰富的插件生态系统**：jQuery 拥有大量的**插件**，可以扩展其功能，满足各种需求。
-   **事件处理**：jQuery 提供了一种简洁的方式来**绑定和处理事件**，提高了代码的可读性和维护性。
-   **动画和特效**：jQuery 提供了一系列**内置的动画效果**，简化了创建和管理动画的过程。
-   **Ajax 支持**：jQuery **封装了复杂的 Ajax 操作**，使得发送 HTTP 请求和处理响应变得更加简单。

### 3.2. jQuery对Ajax的封装

jQuery 对 Ajax 的封装，使得处理异步 HTTP 请求变得更加**简单和直观**。通过 jQuery 的 Ajax 方法，开发者可以轻松地进行数据的加载和提交，而**无需关注底层的 `XMLHttpRequest` 对象**和相关的繁琐配置。

#### jQuery 中常用的 Ajax 方法：

-   **`$.Ajax()`** ：这是 jQuery 最底层、最通用的 Ajax 方法，提供了最大的灵活性和配置选项。
-   **`$.get()`** 和 **`$.post()`** ：这两个方法是 `$.Ajax()` 的简化版，分别用于发送 GET 和 POST 请求。
-   **`$.getJSON()`** ：用于发送 GET 请求并预期服务器返回 JSON 数据。
-   **`$.load()`** ：用于从服务器加载 HTML 内容，并插入到指定的 DOM 元素中。

> **关于 `$` 符号**
> 
> `$`是**jQuery**的一个**全局对象**，其封装的所有函数都挂载在这一**对象原型**上，所以要在前面加上`$`**表示调用jQuery库中的函数**。

`$.Ajax()` 是 jQuery 中最强大的 Ajax 方法，提供了丰富的**配置选项**和**回调函数**，使得处理各种复杂的 Ajax 交互变得可能。

#### `$.Ajax()` 方法的基本用法：

```javascript
$.Ajax({
    url: 'https://example.com/api/data',  // 请求的 URL
    type: 'GET',                         // 请求类型（GET, POST, etc.）
    dataType: 'json',                    // 预期服务器返回的数据类型
    data: {                              // 参数集
        id: 12345
    },
    success: function(response) {        // 请求成功时的回调函数
        console.log(response);
    },
    error: function(xhr, status, error) { // 请求失败时的回调函数
        console.error(status + ': ' + error);
    },
    complete: function(xhr, status) {    // 请求完成时的回调函数（无论成功或失败）
        console.log('Request completed');
    }
});
```

我都不敢想这有多方便……

**jQuery**不愧是是**一代真神**！那我们用**jQuery**重写一下之前的**小demo**吧~

```javascript
function getMovieList() {
    $.Ajax({
        url: 'https://mock.mengxuegu.com/mock/65a91543c4cd67421b34c898/movie/movieList',
        type: 'GET',
        success: function (res) {
            const movieList = res.movieList;
            const listLength = movieList.length;
            for (let i = 0; i < listLength; i++) {
                const li = document.createElement('li');
                li.innerText = `${movieList[i].nm} -- ${movieList[i].star}`;
                $('#ul').append(li);
            }
        }
    });
}
```

不得不说，真的是**方便又好看**！

## 4 # Axios与Ajax

### 4.1. 关于Axios

Axios 是一个基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js。它可以使发送 HTTP 请求、处理响应和处理错误变得简单和高效。Axios 支持所有现代浏览器，并提供了一系列强大的功能，使其成为处理网络请求的流行选择。

#### Axios 的特点：

-   **Promise 基础**：Axios 基于 Promise，使得处理异步操作更加方便，特别适合与 `async`/`await` 语法一起使用。
-   **支持浏览器和 Node.js**：可以在浏览器和 Node.js 环境中运行，具有跨平台的兼容性。
-   **拦截请求和响应**：可以在请求或响应被处理前进行拦截，允许在请求发送前修改请求或在响应返回后处理数据。
-   **自动转换 JSON 数据**：Axios 会自动将 JSON 数据转换为 JavaScript 对象，简化数据处理。
-   **防止 CSRF**：提供了便捷的方法来设置 CSRF 防护。
-   **并发请求**：支持并发请求，并可以使用 `axios.all` 和 `axios.spread` 处理多个请求的结果。
-   **取消请求**：支持取消请求功能，可以在需要时中止 HTTP 请求。

### 4.2. Axios对Ajax的封装

Axios 提供了一系列方法用于发送 HTTP 请求，包括 `axios.get`、`axios.post`、`axios.put`、`axios.delete` 等。以下是它的基本用法示例：

#### GET 请求

```javascript
axios.get('...url',)
    .then(res => { // res是返回的请求体对象，包含了请求的所有信息
        // res.data是请求体中的数据
        const movieList = res.data.movieList;
        const listLength = movieList.length;
        for (let i = 0; i < listLength; i++) {
            const li = document.createElement('li');
            li.innerText = `${movieList[i].nm} -- ${movieList[i].star}`;
            document.getElementById('ul').appendChild(li);
        }
    })
}
```

#### POST 请求

```javascript
axios.post('https://api.example.com/submit', {
    name: 'John Doe',
    age: 30
  })
  .then(function(response) {
    console.log(response.data); // 处理成功的响应
  })
  .catch(function(error) {
    console.error(error); // 处理错误的响应
  })
  .finally(function() {
    console.log('Request completed'); // 总是在请求完成时执行
  });

```

#### demo 复刻

```javascript
function getMovieList() {
    axios.get('https://mock.mengxuegu.com/mock/65a91543c4cd67421b34c898/movie/movieList')
    .then(res => { // res是返回的请求体对象，包含了请求的所有信息
        // res.data是请求体中的数据
        const movieList = res.data.movieList;
        const listLength = movieList.length;
        for (let i = 0; i < listLength; i++) {
            const li = document.createElement('li');
            li.innerText = `${movieList[i].nm} -- ${movieList[i].star}`;
            document.getElementById('ul').appendChild(li);
        }
    })
}
```

## 5 # ES7中的 `fetch()`

### 5.1. 关于`fetch()`

`fetch()` 是 **ES7**（ECMAScript 2016）引入的一种新的**原生 JavaScript API**，用于进行**网络请求**。相比于旧的 `XMLHttpRequest`，`fetch()` 提供了更强大和灵活的功能，并且基于现代的 **Promise 机制**，使得处理异步操作更加**简洁和易读**。

#### Fetch API 的特点：

-   **基于 Promise**：`fetch()` 使用 **Promise** 进行**异步**操作，提供了更清晰的代码结构，尤其适合与 `async`/`await` 语法一起使用。
-   **简化语法**：相比于 `XMLHttpRequest`，`fetch()` 的使用更加简单直观。
-   **更好的错误处理**：`fetch()` 仅在网络错误时会被拒绝，对于 HTTP 错误状态（如 404 或 500）不会自动抛出异常，需要手动检查响应状态。
-   **支持更丰富的功能**：如处理跨域请求、设置请求头、携带凭证等。

### 5.2. `fetch()`的基本用法

#### 发送 GET 请求

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('There has been a problem with your fetch operation:', error));
```

#### 发送 POST 请求

```javascript
fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  body: JSON.stringify({
    name: 'John Doe',
    age: 30
  })
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('There has been a problem with your fetch operation:', error));
```

#### demo 复刻

```javascript
function getMovieList() {
    fetch('https://mock.mengxuegu.com/mock/65a91543c4cd67421b34c898/movie/movieList')
    .then(res => res.json())
    .then(res => {
        const movieList = res.movieList;
        const listLength = movieList.length;
        for (let i = 0; i < listLength; i++) {
            const li = document.createElement('li');
            li.innerText = `${movieList[i].nm} -- ${movieList[i].star}`;
            document.getElementById('ul').appendChild(li);
        }
    });
}
```

## 补充知识

### 最常用的HTTP请求方法：`GET` 与 `POST`

- **`GET` 方法**：用url传参的方式，请求服务器发送某个资源。
    - 示例：https://juejin.cn/search?query=Ajax&fromSeo=0&fromHistory=0&fromSuggest=0
        - `?`后面的部分就是传入的参数
    - 特点：
        - `GET` 请求**不应该**对服务器上的资源做出任何更改
            - 即“**增删改查**”等操作。
        - `GET` 请求应该是**幂等**的 *（ 即多次重复的请求应该产生相同的结果 ）*
            - 掘金的搜索看上去不幂等，是因为创作者在不停上传文章，**数据在动态刷新**。
            - 如果数据不变（文章不变、推荐权重不变），那结果就应该是**幂等**的。

**`POST` 方法**：通过请求体传参的方式，将数据发送到服务器进行处理（如提交表单数据）。

-   示例：

    ```ReqestBody
    POST /submit HTTP/1.1
    Host: example.com
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 27

    name=JohnDoe&age=30
    ```

    -   请求体部分包含了实际传输的数据 `name=JohnDoe&age=30`

-   特点：

    -   `POST` 请求**通常用于**在服务器上创建新的资源或提交数据进行处理。

        -   例如，提交表单、上传文件等操作。

    -   `POST` 请求不一定是**幂等**的 *（即多次重复的请求可能产生不同的结果）*

        -   每次发送相同的 `POST` 请求可能会导致多次创建相同的资源或多次处理相同的数据。
        -   例如，重复提交订单表单可能会生成多个订单。


<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98ff88122e9540fb819f245b99d47e56~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2560&h=1280&s=727711&e=png&b=fdfdfd" alt="image.png" width="70%" /></p>

> 与 **POST** 相比，**GET 更简单也更快**，并且在大部分情况下都能用。
> 
> 然而，**在以下情况中，请使用 POST 请求**：
> 
> -   **不愿**使用缓存文件（更新服务器上的文件或数据库）
> -   向服务器发送**大量数据**（POST 没有数据量限制）
> -   发送包含**未知字符**的用户输入时，POST 比 GET 更稳定也更可靠
> 
> —— 摘自[Ajax – 向服务器发送 | 菜鸟教程 (runoob.com)](https://www.runoob.com/Ajax/Ajax-xmlhttprequest-send.html)

**HTTP请求方法**除GET和POST之外还有很多种，但它们大多都可以**用这两种方法实现**，并**很少**在开发过程中使用。您可以访问[HTTP 请求方法 | 菜鸟教程 (runoob.com)](https://www.runoob.com/http/http-methods.html)以获取更多信息。

### HTTP 标头
**HTTP 标头**（HTTP Headers）是 HTTP 请求和响应消息中的组成部分，用于**传递元数据**和**控制信息**。标头位于请求或响应的开始部分，并包含键值对形式的信息。这些信息可以包括：

-   **通用标头**：适用于请求和响应。例如，`Date` 表示消息的发送时间。
-   **请求标头**：仅适用于请求。例如，`User-Agent` 指定客户端的软件环境，`Accept` 指定客户端可处理的媒体类型。
-   **响应标头**：仅适用于响应。例如，`Server` 指定服务器软件，`Set-Cookie` 用于设置 cookies。
-   **实体标头**：适用于请求和响应的消息体。例如，`Content-Type` 指定内容的媒体类型，`Content-Length` 指定内容的长度。

在 Ajax 请求中，`XMLHttpRequest.setRequestHeader()` 用于设置自定义 HTTP 请求标头。这在某些情况下是必备的，例如：

-   **指定内容类型**：当你发送的数据不是默认的 `application/x-www-form-urlencoded`，如 JSON 数据时，需要设置 `Content-Type` 标头：

    ```javascript
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

-   **身份验证**：当请求需要身份验证时，需要设置 `Authorization` 标头：

    ```javascript
    xhr.setRequestHeader('Authorization', 'Bearer token');
    ```

-   **自定义标头**：如果服务器要求特定的自定义标头，客户端需要通过 `setRequestHeader` 设置这些标头。

但是，对于简单请求，`XMLHttpRequest.setRequestHeader()` 不是必需的。例如，**GET 请求**或**不需要特殊标头的 POST 请求**不一定需要调用这个方法。只有在需要自定义或特定的标头时才需要使用。

### `send()`的参数

值得一提的是，`send()`方法支持**传入一个参数**（不传入时默认为`null`），我们来了解一下它：

> `XMLHttpRequest.send()` 方法接受一个**可选的参数**，其作为**请求主体**；如果请求方法是 **GET** 或者 **HEAD**，则应将请求主体设置为 `null`。
> 
> ——摘自 [XMLHttpRequest.send() - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send)

这段话可能有些抽象，接下来会分别介绍其中的概念。

**请求主体**（Request Body）是 **HTTP 请求**的一部分，用于包含客户端向服务器发送的数据。**请求主体**与**请求头**（Request Headers）和**请求行**（Request Line）一起构成完整的 **HTTP 请求**。在需要传递数据的**请求方法**（如 `POST`、`PUT`）中，请求主体非常重要。

#### 请求主体的作用

-   **数据传递**：请求主体用于将数据从客户端传递到服务器。常见的数据包括表单数据、JSON、XML、文件等。
-   **资源创建和更新**：POST、PUT 请求通过请求主体传递数据，用于在服务器上创建或更新资源。

#### 为什么要用 `send` 的参数传递数据？

在 `XMLHttpRequest` 中，`send` 方法的参数用来填充 **HTTP 请求**的主体。这样，数据可以正确地传递到服务器进行处理。下面是详细解释：

1.  **数据包含在请求主体中**：

    -   当你需要发送数据到服务器时，这些数据放在请求主体中，而不是 URL 中。这样可以避免 URL 长度限制，并且更安全地传输大量或敏感数据。
    -   例如，在提交表单时，表单字段及其值会包含在请求主体中。

1.  **适用于不同数据类型**：

    -   `send` 方法的参数可以是字符串、文档对象（例如 XML）、二进制数据（例如 Blob）、表单数据（例如 FormData）等，灵活性强。
    -   根据不同的数据类型，服务器可以进行相应的解析和处理。

#### 示例说明

-   **GET 请求**：通常不包含请求主体，数据通过 URL 参数传递。

    ```javascript
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://example.com/api/data', true);
    xhr.send();  // GET 请求中通常不需要传递请求主体
    ```

-   **POST 请求**：通过请求主体传递数据。

    ```javascript
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://example.com/api/submit', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify({ name: 'JohnDoe', age: 30 });
    xhr.send(data);  // 请求主体中包含 JSON 数据
    ```

### 请求主体和 `send()` 参数的具体用法

1.  **字符串（DOMString）** ：

    -   发送简单的文本数据，例如 URL 编码的表单数据。

    ```javascript
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://example.com/api/submit', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('name=JohnDoe&age=30');
    ```

1.  **文档对象（Document）** ：

    -   发送 XML 数据。

    ```javascript
    var xmlData = document.implementation.createDocument('', 'example', null);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://example.com/api/submit', true);
    xhr.setRequestHeader('Content-Type', 'application/xml');
    xhr.send(xmlData);
    ```

1.  **二进制数据（Blob）** ：

    -   发送文件或其他二进制数据。

    ```javascript
    var blob = new Blob(['Hello, world!'], {type: 'text/plain'});
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://example.com/api/upload', true);
    xhr.send(blob);
    ```

1.  **表单数据（FormData）** ：

    -   发送表单数据，尤其适用于上传文件。

    ```javascript
    var formData = new FormData();
    formData.append('username', 'JohnDoe');
    formData.append('file', fileInput.files[0]);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://example.com/api/upload', true);
    xhr.send(formData);
    ```