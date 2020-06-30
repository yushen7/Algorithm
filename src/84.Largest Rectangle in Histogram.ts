/**
 * 标签：单调栈
 */

/**
 * 
 * 
 * 
 * Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/largest-rectangle-in-histogram
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


    
 */


 /**
  * 
  * @param heights 矩形的高度数组，每个矩形的宽度都为1
  * 
  * 时间复杂度： O(n) 一重循环，虽然for里面有个while，但不影响整体时间复杂度
  * 空间复杂度： O(n)  最坏情况下，需要O(n)空间存储栈
  * 
  * 思路：
  * 
  * 启发：
  */
var largestRectangleArea = function(heights: number[]): number {
  if(heights.length <= 1) {
    return heights[0] ? heights[0] : 0;
  };


  const n = heights.length;
  let stk = [], max = 0;

  for(let i = 0; i <= n; i++) {
    while(stk.length > 0 && (i == n || heights[i] < heights[stk[stk.length - 1]])) {

      const height = heights[<number>stk.pop()];
      const width = stk.length > 0 ? i - 1 - stk[stk.length - 1] : i;

      max = Math.max(max, height * width);
    }

    stk.push(i);
  }

  return max;

};