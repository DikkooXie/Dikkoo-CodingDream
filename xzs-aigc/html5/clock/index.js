// querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
var secHand = document.querySelector('.sec-hand');
var minHand = document.querySelector('.min-hand');
var hourHand = document.querySelector('.hour-hand');

function setDate() {
    // 获取当前时间
    const now = new Date();
    // 获取当前时间的秒数
    const seconds = now.getSeconds();
    // 获取当前时间的分钟数
    const minutes = now.getMinutes();
    // 获取当前时间的小时数
    const hours = now.getHours();
    // 计算秒针的角度
    const secondsDeg = ((seconds / 60) * 360) + 90; // 90 是为了让秒针从12点开始, 而不是从9点开始(0°)
    // 计算分针的角度
    const minutesDeg = ((minutes / 60) * 360) + 90;
    // 计算时针的角度
    const hoursDeg = ((hours / 12) * 360) + 90;
    // 设置秒针的角度
    secHand.style.transform = `rotate(${secondsDeg}deg)`;  // 注意是反引号 `
    // 设置分针的角度
    minHand.style.transform = `rotate(${minutesDeg}deg)`;
    // 设置时针的角度
    hourHand.style.transform = `rotate(${hoursDeg}deg)`;
}

// 每秒钟调用一次 setDate() 方法
setInterval(setDate, 1000); // 1000ms = 1s