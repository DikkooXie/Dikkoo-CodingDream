/**
 * @param {string} s
 * @return {number}
 */
var maximumLength = function(s) {
    const check = (x) => {
        for(let i = 0; i < s.length;) {
            let flag = true;
            for(let j = i; j < i + x; j++) {
                if(s[j] === s[j + x]) {
                    flag = false;
                    break;
                }
            }
            if(flag) return true;
        }
    }

    const n = s.length;
    let left = 0;
    let right = n;

    while(left <= right) {
        let mid = left + (right - left) / 2;
        if(check(mid)) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }

    if(left === 0)
        return -1;
    else
        return left;
};