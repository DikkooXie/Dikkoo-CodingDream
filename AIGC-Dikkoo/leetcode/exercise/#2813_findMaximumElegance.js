/**
 * @param {number[][]} items
 * @param {number} k
 * @return {number}
 */
var findMaximumElegance = function(items, k) {
    items.sort((a, b) => b[0] - a[0]); // 排序物品，价值高的在前
    let categorySet = new Set();
    let profit = 0, res = 0;
    let heap = []; // 使用数组模拟优先队列（堆）
  
    function addHeap(value) {
      // 添加元素到堆，并保持堆的特性
      heap.push(value);
      heap.sort((a, b) => a - b); // 确保堆的顺序是最小在前
    }
  
    function removeHeap() {
      // 移除堆顶元素
      return heap.shift();
    }
  
    for (let i = 0; i < items.length; i++) {
      if (i < k) {
        profit += items[i][0];
        if (!categorySet.has(items[i][1])) {
          categorySet.add(items[i][1]);
        } else {
          addHeap(items[i][0]);
        }
      } else if (heap.length > 0 && !categorySet.has(items[i][1])) {
        profit += items[i][0] - removeHeap();
        categorySet.add(items[i][1]);
      }
      const categoryScore = categorySet.size * categorySet.size;
      res = Math.max(res, profit + categoryScore); // 更新最大优雅度
    }
    return res;
  };