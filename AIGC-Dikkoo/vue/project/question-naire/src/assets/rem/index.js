(function(doc) {

    doc.addEventListener('DOMContentLoaded', recalc);

    function recalc() {
        let width = doc.documentElement.clientWidth;
        
        doc.documentElement.style.fontSize = 20 * (width / 320) + 'px';
        // 设计稿基于 iPhone 6 制作，宽度为 320px，根元素字体大小为 20px
        // 那若要适配其它设备（屏幕宽度为 width），则根元素字体大小为 20 * (width / 320) px
    }
})(document);