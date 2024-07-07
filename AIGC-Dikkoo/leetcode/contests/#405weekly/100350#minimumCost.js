/**
 * @param {string} target
 * @param {string[]} words
 * @param {number[]} costs
 * @return {number}
 */
var minimumCost = function(target, words, costs) {
    const n = target.length;
    const wordSet = new Map();

    // 将 words 和 costs 存入哈希表中
    for (let i = 0; i < words.length; i++) {
        if (!wordSet.has(words[i])) {
            wordSet.set(words[i], costs[i]);
        } else {
            wordSet.set(words[i], Math.min(wordSet.get(words[i]), costs[i]));
        }
    }

    const dp = Array(n + 1).fill(Infinity);
    dp[0] = 0;  // 空字符串的成本为0

    for (let i = 1; i <= n; i++) {
        for (const [word, cost] of wordSet.entries()) {
            const len = word.length;
            if (i >= len && target.slice(i - len, i) === word) {
                dp[i] = Math.min(dp[i], dp[i - len] + cost);
            }
        }
    }

    return dp[n] === Infinity ? -1 : dp[n];
};