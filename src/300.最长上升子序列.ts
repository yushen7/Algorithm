/**
 * 
给定一个无序的整数数组，找到其中最长上升子序列的长度。

示例:

输入: [10,9,2,5,3,7,101,18]
输出: 4 
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
说明:

可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
你算法的时间复杂度应该为 O(n2) 。
进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-increasing-subsequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * 思路：动态规划
 * 
 * 定义dp[i]为：前i个元素中，以nums[i]结尾的上升子序列的长度。
 * 
 * 状态转移方程：dp[i] = max(dp[j]) + 1 (nums[i] > dp[j])(0 <= j < i)
 * base case：初始的时候，只有一个元素的子序列的长度为1。
 * 
 * 如此这般定义dp[i]的好处是：在比较了nums[i]和nums[j]的关系之后，可以直接算出dp[i]的值（状态转移）。
 * 结合dp[0...j]中最大的值和nums[i]和nums[0...j]的关系算出dp[i]。
 * 所以，在求dp[i]时，需要做两件事：
 * 
 * 1. 遍历dp[0...i-1]
 * 2. 比较nums[i]与nums[j]。dp[i]需要满足nums[i] > nums[j]，才能满足dp[i]的定义，即以nums[i]结尾。找到了之后，将dp[j] + 1即为dp[i]的值
 * 
 * 问题的答案就是dp[i]中的最大值：max(dp[i])
 * 
 * 时间复杂度：O(n^2) 需要遍历nums数组，n为nums数组的长度，计算dp[i]时，需要O(n)的时间遍历dp[0...i-1]的状态。
 * 空间复杂度：O(n) dp数组的空间复杂度为O(n)
 */
function lengthOfLIS(nums: number[]): number {
  if(nums.length === 0) {
    return 0;
  }  

  let dp: Array<number> = new Array(nums.length);
  let max = 1;
  dp.fill(1);
  for(let i = 1; i < nums.length; i++) {
    for(let j = i - 1; j >= 0; j--) {
      if(nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    //找到最大的
    max = Math.max(max, dp[i]);
  }

  return max;
};