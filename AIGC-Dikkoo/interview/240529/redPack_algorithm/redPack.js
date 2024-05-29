/**
 * @func 红包算法
 * @param {number} total 红包总金额
 * @param {number} num 红包的份数
 * @returns {number[]} 每份红包的金额
 */
function redPack(total, num) {
    // 在红包发出的那一刻就决定了每个红包的金额
    const arr = [];

    let restAmount = total; // 红包余额
    let restNum = num; // 红包剩余份数

    // 生成num-1份随机金额，最后一份金额为剩余金额
    for(let i = 0; i < num - 1; i++) {
        // 随机范围：[0.01, restAmount / restNum * 2]，两倍均值法
        let amount = parseFloat(Math.random() * (restAmount / restNum * 2 - 0.01) + 0.01).toFixed(2);

        arr.push(amount);
        restAmount -= amount;
        restNum--;
    }

    // 最后一份红包金额为剩余金额
    arr.push(restAmount.toFixed(2));

    return arr;
}

// 测试
console.log(redPack(100, 10));