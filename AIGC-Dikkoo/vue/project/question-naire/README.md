## 移动端项目的适配方式

1. 设备媒体查询
    - 通过媒体查询，为不同设备设置不同的样式，从而实现不同设备的适配
    - 示例：

        ```css
        @media (max-width: 768px) { /* 平板或大屏手机 */
        /* 样式设置 */
        }

        @media (max-width: 400px) { /* 小屏手机 */
        /* 样式设置 */
        }
        ```

2. rem布局
    - rem：相对于根元素的字体大小的单位，即1rem等于根元素的字体大小，根元素默认大小为16px，即1rem=16px
    - 可以通过媒体查询，为不同设备设置不同根元素的字体大小，从而快速实现不同设备的适配
    - 示例：

        ```css
        @media (max-width: 768px) {
          html {
            font-size: 14px;
          }
        }

        @media (max-width: 400px) {
          html {
            font-size: 12px;
          }
        }
        ```
3. 计算rem值
    - 手机淘宝解决方案：通过js动态计算rem值，根据不同设备的宽度，动态设置根元素的字体大小，从而实现不同设备的适配
    - 示例：

        ```javascript
        (function(doc) { // 接收 document对象 为 doc
            // DOMContentLoaded 事件在文档加载完成后触发
            doc.addEventListener('DOMContentLoaded', setRem); // 当文档加载完成时，执行setRem函数

            function setRem() {
                let width = doc.documentElement.clientWidth; // 获取屏幕宽度
                
                // 设置根元素字体大小
                doc.documentElement.style.fontSize = 20 * (width / 320) + 'px';
                // 设计稿基于 iPhone 6 制作，宽度为 320px，根元素字体大小为 20px
                // 那若要适配其它设备（屏幕宽度为 width），则根元素字体大小为 20 * (width / 320) px
            }
        })(document); // 立即执行函数, 传入document对象
        ```