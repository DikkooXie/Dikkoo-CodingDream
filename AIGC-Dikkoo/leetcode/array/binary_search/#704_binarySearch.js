/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {

    let left = 0;
    let right = nums.length - 1;

    while(left <= right) {

        let mid = left + ((right - left) >> 1);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) { // target在(mid, right]区间
            left = mid + 1;
        } else { // target在[left, mid)区间
            right = mid - 1;
        }
    }
    
    return -1;
};