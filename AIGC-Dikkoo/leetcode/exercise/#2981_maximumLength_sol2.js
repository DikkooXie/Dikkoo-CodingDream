/**
 * @param {string} s
 * @return {number}
 */
var maximumLength = function(s) {
    const check = (x) => {
        let alphabet = Array.from({length: 26}, () => 0);
        let count = 0;
        for(let i = 0; i < n; i ++) {
            count ++;
            if(i+1 === n || s[i] !== s[i+1]) {
                alphabet[s[i].charCodeAt(0) - 'a'.charCodeAt(0)] += Math.max(0, count - x + 1);
                count = 0;
            }
        }
        alphabet.sort((a, b) => b - a);
            if(alphabet[0] >= 3)
                return true;
            else
                return false;
    }

    const n = s.length;
    let left = 0;
    let right = n;

    while(left <= right) {
        let mid = left + ((right - left) >> 1);
        if(check(mid)) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    if(right === 0)
        return -1;
    else
        return right;
};

// Test case
console.log(maximumLength("abcccccdddd"));