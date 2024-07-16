/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
    const numsLen = nums.length;
    let res = 0;
    let sum = 0;
    
    function dfs(i) {
        if(i === numsLen) {
            if(sum === target) {
                res++;
            }
        }
        else {
            // 填入加号
            sum += nums[i];
            dfs(i + 1);
            sum -= nums[i]; // 还原操作
            // 填入减号
            sum -= nums[i];
            dfs(i + 1);
            sum += nums[i]; // 还原操作
        }
    }

    dfs(0);
    return res;
};