/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let p1 = 0, p2 = 0;

    while(p2 < n && p1 < m+n) {
        if(p1 < m + p2 && nums1[p1] <= nums2[p2]) {
            p1++;
        }
        else {
            nums1.splice(p1, 0, nums2[p2]);
            p2++;
            p1++;
        }
    } 

    nums1.splice(m + n, nums1.length - m - n);
};