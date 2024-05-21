### 如何妥善处理api-key？

1. 使用`npm i dotenv`安装依赖。

1. 在项目文件夹中新建`.env`文件。在文件中添加：
    ```.env
    OPENAI_API_KEY = 你的api-key
    ```

1. 在项目中引入`dotenv`模块并引入`config()`方法。其作用是将`.env`文件中的变量添加到`node.js`的环境变量对象中。
    ```javascript
    require('dotenv').config();
    ```

1. `process`是`node.js`的**全局对象**，代表该`node.js`的项目**进程**。`env`是`process`对象的属性，用于读取系统环境变量，现在也可以读取`.env`文件中的变量。

    - 即现在可以使用`process.env.OPENAI_API_KEY`这个变量代替`api-key`。

    - **进程**：分配资源的最小单位。类似于董事长。

    - **线程**：进程执行的最小单位。类似于CEO。

    - 操作系统（OS）-> 进程（Process）-> 环境变量（env）-> 程序（Project）

1. 在`.gitignore`文件中添加`.env`，使`.env`文件不会被上传到`git`上以保护`api-key`。