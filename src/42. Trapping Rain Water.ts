/**Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.



来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/trapping-rain-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * 标签：单调栈
 * 
 * @param heights 
 * 
 *  时间复杂度：O(n) 每个元素出入栈一次
 *  空间复杂度：O(n) 
 * 
 *  思路：
 */

var trap = function(heights: number[]): number {

  let stk = [0];
  let water = 0;
  
  for(let i = 1; i < heights.length; i++) {
    while(stk.length > 0 && heights[i] > heights[stk[stk.length - 1]]) {
      const oldTop = stk.pop()!;


      if(stk.length === 0) {
        break;
      }

      const peek = stk[stk.length - 1]
      const len = i - peek - 1;
      const offsetHeight = Math.min(heights[peek], heights[i]) - heights[oldTop];
      
      water += offsetHeight * len;
    }

    stk.push(i);
  }

  return water;
};