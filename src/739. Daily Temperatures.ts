/**
 * 标签：单调栈
 */


/**
 * Given a list of daily temperatures T, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 instead.

For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], your output should be [1, 1, 4, 2, 1, 1, 0, 0].

Note: The length of temperatures will be in the range [1, 30000]. Each temperature will be an integer in the range [30, 100].

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/daily-temperatures
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /** */



 /**
  * 
  * @param T 温度数组
  * 
  * 时间复杂度： O(n)，每个元素各入栈出栈一次
  * 空间复杂度： O(n)，需要额外O(n)空间保存栈
  */
 var dailyTemperatures = function(T: number[]): number[] {

  
  let stk: number[] = [];
  let days: number[] = [];



  for(let i = 0;i < T.length; i++) {
    while(stk.length > 0 && T[i] > T[stk[stk.length - 1]]) {
      const top = <number>stk.pop();
      days[top] = i - top; 
    }  
    stk.push(i);
  }

  while(stk.length > 0) {
    days[<number>stk.pop()] = 0;
  };

  return days;
};