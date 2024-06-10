/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {  

    function isCharValid(c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9');
    }  

    s = s.toLowerCase();
    const len = s.length;

    let l = 0, r = len - 1;
    while (l !== r) {
        while(!isCharValid(s[l]) && l < r) {
            l++;
        }
        while(!isCharValid(s[r]) && l < r) {
            r--;
        }
        if (l >= r) {
            break;
        }
        if (s[l] !== s[r]) {
            return false;
        }
        l++; r--;
    }
    return true;
};