/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxIncreaseKeepingSkyline = function(grid) {
    const rowMax = Array(grid.length).fill(0);
    const colMax = Array(grid[0].length).fill(0);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            rowMax[i] = Math.max(rowMax[i], grid[i][j]);
            colMax[j] = Math.max(colMax[j], grid[i][j]);
        }
    }

    let ans = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            ans += Math.min(rowMax[i], colMax[j]) - grid[i][j];
        }
    }
    return ans;
};