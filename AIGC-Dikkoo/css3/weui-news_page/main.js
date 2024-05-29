// 获取navbar元素
let navbar = document.querySelector('.weui-navbar');
const navbarItems = document.querySelectorAll('.weui-navbar__item');

// 给navbar添加点击事件：冒泡机制
navbar.addEventListener('click', (e) => {
    const target = e.target;
    if(target.nodeName === 'A') {
        e.preventDefault();
        if(target.classList.contains('weui-bar__item_on')) 
            return;
        document.querySelector('.weui-bar__item_on').classList.remove('weui-bar__item_on');
        target.classList.add('weui-bar__item_on');
    }
});

// 给每个navbar item添加点击事件
navbarItems.forEach(item => {
    item.addEventListener('click', () => {
        // 如果点击的navbar item已经是active状态，则不做任何操作
        if (item.classList.contains('.weui-bar__item_on'))
            return;

        // 给之前active的navbar item移除'active' class
        document.querySelector('.weui-bar__item_on').classList.remove('.weui-bar__item_on');

        // 给当前点击的navbar item添加'active' class
        item.classList.add('.weui-bar__item_on');
    });
});


const searchInput = document.querySelector('#search_input');
const searchBar = document.querySelector('.weui-search-bar');

// searchInput.addEventListener('focus', (e) => {
//     console.log('focus');
//     searchInput.classList.add('weui-search-bar_focusing');
// });

document.querySelector('.weui-search-bar__label').addEventListener('click', (e) => {
    console.log('click');
    searchBar.classList.add('weui-search-bar_focusing');
});

searchInput.addEventListener('focus', function(event) {
    console.log('聚焦了')
})