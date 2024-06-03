/**
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
var distributeCandies = function(candies, n) {
    const ans = Array(n).fill(0);
    for (let i = 1; candies > 0; i++) {
        ans[(i - 1) % n] += Math.min(i, candies);
        candies -= i;
    }
    return ans;
};