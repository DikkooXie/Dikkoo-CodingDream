
JavaScript是单线程的，所有任务都在排队依次执行（即同步执行）。

但部分任务是耗时的（例如网络请求、文件读写等），如果同步执行，会阻塞后续代码的执行，导致浏览器停止响应，用户体验不好。

> 举个例子：所有人都在排队上公交车，因为车门很小，每次只能进一个人（也就是单线程）。每个人上车时还要投币或者扫码，有些人没有提前准备好钱或者二维码，就会堵在车门口，导致后面的人无法上车（也就是阻塞后续代码）。

### event loop

为了解决这个问题，JavaScript引入了`event loop`机制。

- 让同步任务尽快执行，不阻塞后续代码；
- 异步任务先会放入`event table`登记；
- 异步任务执行完毕后，将结果放入`event queue`；
- 系统进入idle状态（空闲状态）；
- 检测event table是否有任务要执行，如果有，取出放入执行栈执行；
- 重新进入idle状态。