/**
 * 
给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

注意:

可以认为区间的终点总是大于它的起点。
区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
示例 1:

输入: [ [1,2], [2,3], [3,4], [1,3] ]

输出: 1

解释: 移除 [1,3] 后，剩下的区间没有重叠。
示例 2:

输入: [ [1,2], [1,2], [1,2] ]

输出: 2

解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
示例 3:

输入: [ [1,2], [2,3] ]

输出: 0

解释: 你不需要移除任何区间，因为它们已经是无重叠的了。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/non-overlapping-intervals
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * 思路：贪心算法
 * 
 * 该思路基于一个点：区间的终点越小，可选取的不重叠区间个数越多。所以每次都在做选择的都选择终点最小的区间，到最后，能选择的不重叠区间便是最多的。当然，有一个前提是下一个区间的起点必须小于当前区间的终点，才能继续选择下一个区间。
 * 
 * 时间复杂度：O(nlogn)  排序需要O(nlogn)的时间，遍历需要O(n)的时间，总的便是O(nlogn)。
 * 空间复杂度：O(1) 只需要常数级的空间
 */
function eraseOverlapIntervals(intervals: number[][]): number {
  if(intervals.length === 0) return 0; 
  intervals.sort((a, b)=> {
    return a[1] > b[1] ? 1 : a[1] === b[1] ? 0 : -1;
  });
  let count = 1;
  let max_end = intervals[0][1];
  for(const interval of intervals) {
    if(interval[0] >= max_end) {
      max_end = interval[1];
      count++;
    }
  }
  return intervals.length - count;
};

/**
 * 思路：动态规划
 * 
 */