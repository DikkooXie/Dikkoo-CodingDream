/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumBeauty = function(nums, k) {
    nums.sort((a, b) => a - b);
    
    let i = 0, j = 0, ans = 0;
    while (j < nums.length) {
        // 以nums[j]为结尾，看与最左端元素相差是否小于2 * k
        // 之所以是2*k 而不是k， 是因为根据题意 nums[i] 可以变大， nums[j] 也可以变小
        while (nums[j] > nums[i] + k * 2) {
            i++;
        }
        ans = Math.max(ans, j - i + 1);
        j++;
    }
    return ans
};