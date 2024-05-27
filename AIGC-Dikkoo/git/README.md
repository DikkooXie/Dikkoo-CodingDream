### 常用指令

- `git status` 查看本地仓库的状态。
- `git add .` 将代码提交到`git`的暂存区。
- `git commit -m "xxx"` 确认提交。
- `git push origin master` 将代码推送到远程仓库。

### SSH公钥

1. 通过命令 `ssh-keygen` 生成 SSH Key（按三次回车以用默认设置生成公钥）；
    ```bash
    ssh-keygen -t ed25519 -C "Gitee SSH Key"
    ```
    - -t key 类型
    - -C 注释

2. 通过命令`ls ~/.ssh/`查看生成的SSH公钥和私钥；
    - 无`.pub`结尾的为私钥文件；
    - 有`.pub`结尾的是公钥文件。

3. 读取公钥文件；
    ```
    cat ~/.ssh/xxxxxx.pub
    ```

4. 复制输出的公钥。