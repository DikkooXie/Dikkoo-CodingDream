/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {

    function isPalindrome(str) {
        const len = str.length;
        for(let i = 0; i < len / 2; i++) {
            if(str[i] !== str[len - 1 - i]) {
                return false;
            }
        }
    
        return true;
    }

    const len = s.length;
    for(let i = 0; i < len / 2; i++) {
        if(s[i] !== s[len - 1 - i]) {
            return isPalindrome(s.substring(i, len - i - 1)) || isPalindrome(s.substring(i + 1, len - i));
        }
    }

    return true;
};