/**
 * @param {number[]} rolls // 已知骰子点数集
 * @param {number} mean // 平均值
 * @param {number} n // 缺失骰子数量
 * @return {number[]}
 */
var missingRolls = function(rolls, mean, n) {

    let missingRolls = [];

    let sum = mean * (rolls.length + n); // 骰子点数总和
    rolls.forEach(element => {
        sum -= element;
    });

    console.log(sum);

    let avg = Math.floor(sum / n); // 缺失骰子的平均值
    console.log(avg);

    if(avg < 1 || avg > 6) // 缺失骰子的平均值不在[1, 6]范围内
        return [];


    for(let i = 0; i < n-1; i++) {
        sum -= avg;
        missingRolls.push(avg);
        avg = Math.floor(sum / (n - i - 1));
    }

    console.log(sum);
    if(sum < 1 || sum > 6)
        return [];
    else
        missingRolls.push(sum); // 最后一个缺失骰子的点数
    return missingRolls;
};