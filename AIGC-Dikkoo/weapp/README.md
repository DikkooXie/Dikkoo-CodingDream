# 微信小程序入门

## 关于微信小程序

- 小程序特点
    - 相对于Android/iOS Native程序更加小巧
    - 扫码即用，不需安装
    - O2O：online 2 offline

- 技术架构
    - pages 概念：小程序由一个个页面（page）组成。单个页面又由其基础结构组成：
        - wxml 页面结构
        - wxss 页面样式（如同CSS）
        - js   数据
    - 面向对象CSS（OOCSS）
        - 将CSS类拆分成多个基础类组成

## 项目结构

- `app.json` 项目概述文件
    
    这是微信小程序”JS-基础模板“下的默认`app.json`配置文件，我们为它写上注释：

    ```json
    {
        "pages": [ // 页面路径列表
            "pages/index/index",
            "pages/logs/logs"
        ],
        "window": { // 全局的默认窗口表现
            "navigationBarTextStyle": "black", 
            "navigationBarTitleText": "Weixin", // 小程序标题
            "navigationBarBackgroundColor": "#ffffff"
        },
        "style": "v2",
        "componentFramework": "glass-easel",
        "sitemapLocation": "sitemap.json",
        "lazyCodeLoading": "requiredComponents"
    }

    ```

### 小记
- rpx
- 数据绑定 `{{...}}`
    - 数组 `wx-for="{{...}}" wx:key="id"` `wx:key`必须设置唯一值。
        数组内部元素用{{item.xxx}}访问

- 每个页面的js，都有一个`Page()`函数，代表这个页面。`{}`内部为页面配置。
- bind:tap
- 伪元素
    -没有标签，但是可以显示在DOM树中。
    - css选择器 ::after ::before ::placeholder
    - content属性一定要给
    - border