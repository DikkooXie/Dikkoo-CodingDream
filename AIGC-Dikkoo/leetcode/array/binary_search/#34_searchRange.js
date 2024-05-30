/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    const n = nums.length;
    let left = 0, right = n;

    while(left < right) {
        let mid = (left + right) >> 1;
        if(nums[mid] < target)
            left = mid + 1;
        else
            right = mid;
    }

    let low = left;
    right = n;

    while(left < right) {
        let mid = (left + right) >> 1;
        if(nums[mid] < target+1)
            left = mid + 1;
        else
            right = mid;
    }

    let high = left-1;
    
    if(low <= high)
        return [low, high];
    else
        return [-1, -1];
};