/**
 * @param {number} x
 * @return {number}
 */
var sumOfTheDigitsOfHarshadNumber = function(x) {
    let numString = x.toString();
    let sum = 0;
    for (let i = 0; i < numString.length; i++) {
        sum += parseInt(numString[i]);
    }
    return x % sum === 0 ? sum : -1;
};