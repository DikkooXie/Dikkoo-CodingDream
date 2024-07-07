/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumPrimeDifference = function(nums) {

    const primeArr = [];
    const numsLen = nums.length;

    for(let i = 0; i < numsLen; i++) {
        if(isPrime(nums[i]))
            primeArr.push(i);
    }
    return primeArr[primeArr.length-1] - primeArr[0];

    function isPrime(num) {
        if(num === 1)
            return false;
        for(let i = 2; i < num; i++) {
            if(num % i === 0)
                return false;
        }
        return true;
    }
};