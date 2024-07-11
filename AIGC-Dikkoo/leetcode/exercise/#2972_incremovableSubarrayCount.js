/**
 * @param {number[]} nums
 * @return {number}
 */
var incremovableSubarrayCount = function(nums) {
    const n = nums.length;

    let i = 0;
    while(i < n-1 && nums[i] < nums[i+1]) {
        i++;
    }

    if(i === n-1) {
        return n * (n+1)/2;
    }

    let ans = i+2;
    for(let j = n-1; j === n-1 || nums[j] < nums[j+1]; j--) {
        while(i >= 0 && nums[i] >= nums[j]) {
            i--;
        }
        ans += i+2;
    }
    return ans;
};