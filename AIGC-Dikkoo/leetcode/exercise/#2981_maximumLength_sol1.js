// 分类讨论解法，可同时通过#2982题
// 时间复杂度：O(nlogn)

/**
 * @param {string} s
 * @return {number}
 */
var maximumLength = function(s) {
    const n = s.length;

    const alphabet = Array.from({length: 26}, () => []); // 创建26个空数组
    let count = 0;

    for(let i = 0; i < n; i++) {
        count++;
        // 如果当前字符和下一个字符不相等（前面判断了n === n-1，所以这里不会越界）
        if(n === n-1 || s[i] !== s[i+1]) {
            alphabet[s[i].charCodeAt(0) - 'a'.charCodeAt(0)].push(count); // 将当前字符的长度加入对应字母的数组
            count = 0;
        }
    }

    let ans = 0;
    alphabet.forEach((arr) => {
        // 如果数组为空，直接返回
        if(arr.length === 0) 
            return; 

        // 降序排序
        arr.sort((a, b) => b - a); 
        // 为凑满三个数组，就算已有三个数组，也不影响结果
        arr.push(0);
        arr.push(0);

        ans = Math.max(arr[0]-2, Math.min(arr[0]-1, arr[1]), arr[2], ans);
        return;
    });

    if(ans === 0) 
        return -1;
    else
        return ans;
};