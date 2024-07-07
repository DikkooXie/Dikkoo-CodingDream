/**
 * @param {number} red
 * @param {number} blue
 * @return {number}
 */
var maxHeightOfTriangle = function(red, blue) {
    // 给你两个整数 red 和 blue，分别表示红色球和蓝色球的数量。你需要使用这些球来组成一个三角形，满足第 1 行有 1 个球，第 2 行有 2 个球，第 3 行有 3 个球，依此类推。

    // 每一行的球必须是 相同 颜色，且相邻行的颜色必须 不同。

    // 返回可以实现的三角形的 最大 高度。
    let height = 0;
    let need = 1;
    let tred = red, tblue = blue;
    let change = false;
    // 先使用红色球
    while(change ? tred >= need : tblue >= need) {
        if (change) {
            tred -= need;
            need++;
            height++;
            change = !change;
        } else {
            tblue -= need;
            need++;
            height++;
            change = !change;
        }
    }

    let height2 = 0;
    need = 1;
    tred = red, tblue = blue;
    change = true;
    // 使用蓝色球
    while(change ? tred >= need : tblue >= need) {
        if (change) {
            tred -= need;
            need++;
            height2++;
            change = !change;
        } else {
            tblue -= need;
            need++;
            height2++;
            change = !change;
        }
    }
    height = Math.max(height, height2);
    return height;
};