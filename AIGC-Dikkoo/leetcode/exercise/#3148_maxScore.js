/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxScore = function (grid) {
    let n = grid.length;
    let m = grid[0].length;
    let ans = -Infinity;
    let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(Infinity));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        mn = Math.min(dp[i][j + 1], dp[i + 1][j]);
        ans = Math.max(ans, grid[i][j] - mn);
        dp[i + 1][j + 1] = Math.min(mn, grid[i][j]);
      }
    }
    return ans
  };