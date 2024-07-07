/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var getEncryptedString = function(s, k) {
    const len = s.length;
    let res = '';

    for(let i = 0; i < len; i++) {
        res += s[(i+k)%len];
    }

    return res;
};