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
    }

    console.log(sum);
    if(sum < 1 || sum > 6)
        return [];
    else
        missingRolls.push(sum); // 最后一个缺失骰子的点数
    return missingRolls;
};

rolls = [4,5,6,2,3,6,5,4,6,4,5,1,6,3,1,4,5,5,3,2,3,5,3,2,1,5,4,3,5,1,5];
mean = 4;
n = 40;

console.log(missingRolls(rolls, mean, n));