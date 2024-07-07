/**
 * @param {character[][]} grid
 * @return {number}
 */
var numberOfSubmatrices = function(grid) {
    // 给你一个二维字符矩阵 grid，其中 grid[i][j] 可能是 'X'、'Y' 或 '.'，返回满足以下条件的子矩阵数量：
    // - 包含 grid[0][0]
    // - 'X' 和 'Y' 的频数相等。
    // - 至少包含一个 'X'。

    const m = grid.length;
    const n = grid[0].length;
    let res = 0;
    
    // 前缀和：计算X的个数
    let xSum = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            xSum[i][j] = grid[i][j] === 'X' ? 1 : 0;
            if(i > 0) xSum[i][j] += xSum[i-1][j];
            if(j > 0) xSum[i][j] += xSum[i][j-1];
            if(i > 0 && j > 0) xSum[i][j] -= xSum[i-1][j-1];
        }
    }

    // 前缀和：计算Y的个数
    let ySum = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            ySum[i][j] = grid[i][j] === 'Y' ? 1 : 0;
            if(i > 0) ySum[i][j] += ySum[i-1][j];
            if(j > 0) ySum[i][j] += ySum[i][j-1];
            if(i > 0 && j > 0) ySum[i][j] -= ySum[i-1][j-1];
        }
    }

    // 计算子矩阵数量，左上角grid[0][0]，枚举右下角
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            if(xSum[i][j] > 0 && xSum[i][j] === ySum[i][j]) {
                res++;
            }
        }
    }

    return res;
};