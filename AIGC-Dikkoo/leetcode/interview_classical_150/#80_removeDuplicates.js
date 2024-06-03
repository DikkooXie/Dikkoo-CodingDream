/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let len = nums.length;
    let count = 0, temp1 = 0, temp2 = 0;

    for(let i = 0; i < len; i++) {
        if(!temp1)
            temp1 = nums[i];

        count++;

        if (!temp2 && count > 2)
            temp2 = i;

        if (i === len-1 || nums[i+1] !== temp1) {
            temp1 = 0;
            if(count > 2) {
                nums.splice(temp2, count-2);
                len -= count-2;
                i = temp2-1;
            }
            count = 0;
            temp2 = 0;
        }
    }

    return len;
};

// Test case
console.log(removeDuplicates([1,1,1,2,2,2,3,3]));