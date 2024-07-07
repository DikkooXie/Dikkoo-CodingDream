/**
 * @param {number} n
 * @return {string[]}
 */
var validStrings = function(n) {

// 给你一个正整数 n。

// 如果一个二进制字符串 x 的所有长度为 2 的 子字符串 中包含 至少 一个 "1"，则称 x 是一个 有效 字符串。

// 返回所有长度为 n 的 有效 字符串，可以以任意顺序排列。

    let res = [];
    let arr = new Array(n).fill(0);

    function dfs(index) {
        if(index === n) {
            if(judge(arr))
                res.push(arr.join(''));
            return;
        }

        arr[index] = 0;
        dfs(index+1);
        arr[index] = 1;
        dfs(index+1);
    }

    function judge(arr) {
        for(let i = 0; i < n-1; i++) {
            if(arr[i] != 1 && arr[i+1] != 1)
                return false;
        }
        return true;
    }

    dfs(0);

    return res;

};