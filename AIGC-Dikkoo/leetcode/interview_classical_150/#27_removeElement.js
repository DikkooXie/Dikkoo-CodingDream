/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    nums.sort((a, b) => a - b); // 升序排序
    let left = 0, right = nums.length;

    while(left < right) {
        let mid = left + ((right - left) >> 1);
        if(nums[mid] < val)
            left = mid + 1;
        else
            right = mid;
    }

    let low = left;
    right = nums.length;

    while(left < right) {
        let mid = left + ((right - left) >> 1);
        if(nums[mid] < val+1)
            left = mid + 1;
        else
            right = mid;
    }

    let high = left-1;

    nums.splice(low, high - low + 1);
    return nums.length;
};