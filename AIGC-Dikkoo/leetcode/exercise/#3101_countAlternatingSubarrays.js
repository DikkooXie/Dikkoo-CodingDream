/**
 * @param {number[]} nums
 * @return {number}
 */
var countAlternatingSubarrays = function(nums) {
    let res = 0, temp = 0, pre = -1;

    for(const num of nums) {
        temp = (pre != num) ? temp+1 : 1;
        pre = num;
        res += temp
    }
    return res;
};