# 豆瓣电影排行榜

https://movie.douban.com/chart

## 如何爬取排行榜信息？
1. 发送请求获取 `html` 字符串
    - 发出一个 `http` 请求，爬取页面。

2. 对 `html` 字符串做查找正则。
    - 伪代码
        - 聚焦： `.article movies` 列表，其他丢弃。
        - table：电影信息列表。

3. 获取到 `json` 对象——电影列表：

    ```
    [
        {
            name: '破墓',
            pic: '',
            desc: '',
            score:
        },
        ...
    ]
    ```

## 解决问题
1. 初始化项目：`npm init -y`
2. 安装依赖：`npm install x-crawl`
