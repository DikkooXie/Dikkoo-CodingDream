/**
 * @param {number[]} nums
 * @return {number[]}
 */
var resultArray = function(nums) {

    function greaterCount(arr, val) {
        
    }

    let arr1 = [], arr2 = [];

    arr1.push(nums[0]);
    arr2.push(nums[1]);

    let len = nums.length;
    for(let i = 2; i < len; i++) {
        if(greaterCount(arr1, nums[i]) > greaterCount(arr2, nums[2])) {
            arr1.push(nums[i]);
        }
        else if(greaterCount(arr1, nums[i]) < greaterCount(arr2, nums[2])) {
            arr2.push(nums[i]);
        }
        else {
            if(arr1.length > arr2.length) {
                arr2.push(nums[i]);
            }
            else {
                arr1.push(nums[i]);
            }
        }
    }
    return arr1 + arr2;
};