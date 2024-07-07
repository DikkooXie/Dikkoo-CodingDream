/**
 * @param {number[]} values 节点0到n-1的价值
 * @param {number[][]} edges 
 * edges[j] = [uj, vj, timej] 表示：
 * 节点 uj 和 vj 之间有一条需要 timej 秒才能通过的无向边。
 * @param {number} maxTime 花费的总时间 **不超过** maxTime 秒
 * @return {number} 一条合法路径的 **最大** 价值
 */
var maximalPathQuality = function(values, edges, maxTime) {
    const len = values.length; // 节点个数

    // 构建邻接表
    const graph = Array.from({ length: len }, () => []);
    for (const [u, v, time] of edges) {
        graph[u].push([v, time]);
        graph[v].push([u, time]);
    }

    let maxValue = 0; // 最大价值
    const visited = Array.from({ length: len }, () => false); // 记录节点是否被访问
    visited[0] = true; // 起点0被访问

    /**
     * 深度优先搜索，递归求解
     * @param {*} u         当前节点
     * @param {*} sumTime   当前路径花费的总时间
     * @param {*} sumValue  当前路径的总价值
     * @returns             无
     */
    function dfs(u, sumTime, sumValue) {
        if (u === 0) { // 返回起点
            maxValue = Math.max(maxValue, sumValue); // 更新最大价值
            // return; 注意这里不返回，可以路过起点继续搜索
        }

        // 遍历邻接节点
        for(const [v, time] of graph[u]) {
            if(sumTime + time > maxTime) 
                continue; // 超时剪枝
            if (visited[v]) // 如果节点已经被访问过
                dfs(v, sumTime + time, sumValue); // 价值不重复计算，路过节点
            else { // 未被访问过
                visited[v] = true; // 标记为已访问
                dfs(v, sumTime + time, sumValue + values[v]); // 递归搜索
                visited[v] = false; // 还原现场
            }
        }
    }

    dfs(0, 0, values[0]); // 从起点0开始搜索
    return maxValue;
};