# 颠覆前端开发的AJAX技术

## AJAX是什么？

### 概述

AJAX是Asynchronous JavaScript and XML的缩写，意思是用JavaScript执行异步网络请求。

> 异步与同步
> 一段代码的执行时间可能较长（例如发送一个网络请求，需要等待服务器返回结果），使用同步方式执行则会阻塞后续代码，直到该代码执行完毕（服务器响应结果）。
> 但网络通信一般耗时较长，如果等待服务器响应，会导致浏览器停止响应，用户体验不好。
> 而异步方式则是在等待代码执行完毕的同时，继续执行后续代码（一般后续代码与当前代码无关，不会影响执行），不会阻塞浏览器。
> 所以，AJAX技术采用异步方式执行网络请求，使得用户在等待时可以继续操作页面，提高用户体验。

> XML（eXtensible Markup Language）
> XML是一种标记语言，用于存储和传输数据。AJAX最初是用XML格式传输数据，所以命名为AJAX。后来，JSON格式逐渐取代XML格式，所以AJAX也可以理解为Asynchronous JavaScript and JSON。

#### 优点

- 提升用户体验：异步网络请求不会阻塞浏览器，用户可以继续操作页面。
- 减少网络流量：只传输数据，不传输页面结构，减少网络流量。
- 提高性能：减少页面刷新，减少服务器压力，提高性能。

### 技术原理

AJAX技术的核心是XMLHttpRequest对象，它是浏览器提供的原生对象，用于发出HTTP请求和解析服务器返回的数据。

> XMLHttpRequest对象
> XMLHttpRequest对象是浏览器提供的原生对象，用于发出HTTP请求和解析服务器返回的数据。
> 因为浏览器不允许JavaScript直接访问网络，所以需要XMLHttpRequest对象作为中间层。

XMLHttpRequest对象提供了
- open()：配置一个HTTP请求；
- send()：发送HTTP请求；
- setRequestHeader()：设置HTTP请求头；
...等方法，用于发出HTTP请求。

## jQuery里的AJAX

在jQuery的全局对象`$`下，封装了一个`ajax()`方法，其要求传入一个JSON对象作为其参数：

```javascript
$.ajax({
    url: '...',
    method: 'GET',
    data: {
        parameters1: '...',
        parameters2: '...'
        parameters3: '...'
    },
    success: function(data) {
        // 处理服务器返回的数据
        console.log(data);
    },
});
```