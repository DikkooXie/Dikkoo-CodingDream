/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function(candyType) {
    const set = new Set(candyType);
    return Math.min(set.size, candyType.length / 2);
};