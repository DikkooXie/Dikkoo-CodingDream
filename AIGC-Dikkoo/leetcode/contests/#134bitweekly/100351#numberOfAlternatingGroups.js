/**
 * @param {number[]} colors
 * @param {number} k
 * @return {number}
 */
var numberOfAlternatingGroups = function(colors, k) {
    const len = colors.length;
    let res = 0;

    for(let i = 0; i < k-1; i++) {
        colors.push(colors[i]); // 变成环形数组
    }

    const newLen = colors.length;

    for(let i = 0; i < len; i++) { // 滑动窗口
        let j = i+1; // 滑动窗口的右边界
        let count = 1; // 当前窗口中不同颜色的个数

        while(j < newLen && colors[j] !== colors[j-1]) { // 用colors[j] !== colors[j-1]来判断是否是交替组
            count++; // 当前窗口中不同颜色的个数
            j++; // 右边界右移
            if(count >= k) // 当前窗口中不同颜色的个数大于等于k时，说明当前窗口中是一个交替组
                res++;
        }

        i = j-1; // i指针跳到窗口的右边界（注意这里是j-1，因为for循环中有i++）
    }

    return res;
};