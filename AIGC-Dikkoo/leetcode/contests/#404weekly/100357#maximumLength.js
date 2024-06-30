/**
 * @param {number[]} nums 一个整数数组 nums
 * @return {number} 返回 nums 的 最长的有效子序列 的长度
 * 
 * nums 的子序列 sub 的长度为 x ，如果其满足以下条件，则称其为 有效子序列：
 * `(sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ... == (sub[x - 2] + sub[x - 1]) % 2`
 * 子序列是从数组中删除一些元素（也可能不删除）得到的数组
 */
var maximumLength = function(nums) {
    const n = nums.length;

    // dp[i][0] 表示以 nums[i] 结尾，且是依靠全是偶数的子序列的最大长度
    // dp[i][1] 表示以 nums[i] 结尾，且是依靠全是奇数的子序列的最大长度
    // dp[i][2] 表示以 nums[i] 结尾，且是依靠奇偶交替且结尾是偶数的子序列的最大长度
    // dp[i][3] 表示以 nums[i] 结尾，且是依靠奇偶交替且结尾是奇数的子序列的最大长度
    const dp = new Array(n).fill(0).map(() => new Array(4).fill(0));

    // dp[0][nums[0] % 2] = 1; // 初始化第一个元素的状态
    if(nums[0] % 2 === 0) {
        dp[0][0] = 1;
        dp[0][2] = 1;
    } else {
        dp[0][1] = 1;
        dp[0][3] = 1;
    }
    let res = 1;

    for (let i = 1; i < n; i++) {
        if (nums[i] % 2 === 0) { // 偶数
            dp[i][0] = dp[i - 1][0] + 1;
            dp[i][1] = dp[i - 1][1];
            dp[i][2] = dp[i - 1][3] + 1;
            dp[i][3] = dp[i - 1][3];
        } else {
            dp[i][0] = dp[i - 1][0];
            dp[i][1] = dp[i - 1][1] + 1;
            dp[i][2] = dp[i - 1][2];
            dp[i][3] = dp[i - 1][2] + 1;
        }

        res = Math.max(res, dp[i][0], dp[i][1], dp[i][2], dp[i][3]);
    }

    return res;
};