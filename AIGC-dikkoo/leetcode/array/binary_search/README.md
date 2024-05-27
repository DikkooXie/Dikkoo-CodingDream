# 二分查找（Binary Search）

## 前提条件

- 数组为有序数组；
- 数组中无重复元素（有重复元素，则返回的元素下标可能不是唯一的）；

## 基本思路

1. 传入一个升序/降序排列数组（nums）与目标查找值（target）；

1. 确认边界
    - 左边界（left）：下标$0$；
    - 右边界（right）：下标$nums.length - 1$；

1. 确认区间范围：
    - **左闭右闭 [left, right]**
        - `while (left <= right)` 要使用 `<=` ，因为`left === right`是有意义的；
        - `if (nums[middle] > target)`，`right` 要赋值为 `middle - 1`，因为当前这个`nums[middle]`一定不是`target`，那么接下来要查找的左区间结束下标位置就是 `middle - 1`；
    - **左闭右开 [left, right)**
        - `while (left < right)`，这里使用 `<` ,因为此时`right`上的元素是没有意义的，无需判断相等；
        - `if (nums[middle] > target)` 时，因为寻找区间是**左闭右开**区间，`right`更新为`middle`，即：下一个查询区间不会去比较。

1. 创建一个`while`循环，停止条件是`left < right` 或 `left <= right`；

1. 在循环中，比较`target`值与`nums[mid]`值的大小关系，这里`mid`是左、右边界下标间的中值（即`mid = left + (right-left)/2`）；
    - `target === nums[mid]` 返回下标；
    - `target < nums[mid]`则`target`在`[left, mid)`之间；
    - `target > nums[mid]`则`target`在`(mid, right]`之间；

1. 如果达到循环截止条件仍未返回结果，返回`-1`代表无法查询到目标值。

## Javascript代码

### 左闭右闭 [left, right]

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {

    let left = 0;
    let right = nums.length - 1;

    while(left <= right) {

        let mid = left + Math.floor((right - left) / 2); // 或者使用 mid = left + ((right - left) >> 1);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) { // target在(mid, right]区间
            left = mid + 1;
        } else { // target在[left, mid)区间
            right = mid - 1;
        }
    }
    
    return -1;
};

```

### 左闭右开 [left, right)

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // right是数组最后一个数的下标+1，nums[right]不在查找范围内，是左闭右开区间
    let mid, left = 0, right = nums.length;    
    // 当left=right时，由于nums[right]不在查找范围，所以不必包括此情况
    while (left < right) {
        // 位运算 + 防止大数溢出
        mid = left + ((right - left) >> 1);
        // 如果中间值大于目标值，中间值不应在下次查找的范围内，但中间值的前一个值应在；
        // 由于right本来就不在查找范围内，所以将右边界更新为中间值，如果更新右边界为mid-1则将中间值的前一个值也踢出了下次寻找范围
        if (nums[mid] > target) {
            right = mid;  // 去左区间寻找
        } else if (nums[mid] < target) {
            left = mid + 1;   // 去右区间寻找
        } else {
            return mid;
        }
    }
    return -1;
};
```