/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {

    let left = 0;
    let right = nums.length - 1;

    while(left <= right) {

        let mid = left + ((right-left) >> 1);
        
        if(target === nums[mid])
            return mid;
        else if(target < nums[mid])
            right = mid - 1;
        else
            left = mid + 1;
    }

    return right+1;
};