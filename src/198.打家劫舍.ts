/**
 * 思路：动态规划
 * 
 * 
 * 定义：dp[i]为前i间房屋所能偷窃的最高金额
 * 状态转移方程：dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
 * base case：dp[0] = nums[0]， dp[1] = max(nums[0], nums[1])
 * 
 * 时间复杂度：O(n) 
 * 空间复杂度：O(1)
 */
function rob(nums: number[]): number {
  if(nums.length < 2) return nums[0] || 0;


  const n = nums.length;
  let rob2 = nums[0], rob1 = Math.max(nums[0], nums[1]), rob = rob1;

  for(let i = 2; i < n; i++) {
    rob = Math.max(rob1, rob2 + nums[i]);

    rob2 = rob1;
    rob1 = rob;
  }

  return rob;
};

/**
 * 
 * @param nums 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

示例 1:

输入: [2,3,2]
输出: 3
解释: 你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
示例 2:

输入: [1,2,3,1]
输出: 4
解释: 你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/house-robber-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * 思路：动态规划
 * 
 * 
 * 定义：dp[i]为前i间房屋所能偷窃的最高金额
 * 状态转移方程：dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
 * base case：dp[0] = nums[0]， dp[1] = max(nums[0], nums[1])
 * 
 * 问题答案是：max(dp[0...n-2],dp[1...n-1]),因为首尾的房屋不能同时被抢劫，所以有三种情况：1.首尾都没被抢劫 2.首被抢劫了，尾没被抢劫 3.尾被抢劫了，首没被抢劫
 * 
 * 这道题相当于多加了一道限制：首尾不能被同时抢劫，所以问题不能从dp[0...n-1]中找最大值，而是要在dp[0...n-2]和dp[1...n-1]中找最大值
 * 时间复杂度：O(n) 
 * 空间复杂度：O(1)
 */
function robLoop(nums: number[]): number {
  const n = nums.length;
  if(n < 2) return nums[0] || 0; 

  return Math.max(robOne(nums, 0, n - 1), robOne(nums, 1, n));
};
function robOne(nums: number[], start: number, end: number): number {
  // 2 - 0 = 2 3 - 1 = 2
  if(end - start < 2) return nums[start] || 0;

  const n = nums.length;
  let rob2 = nums[start], rob1 = Math.max(nums[start], nums[start + 1]), rob = rob1;

  for(let i = start + 2; i < end; i++) {
    rob = Math.max(rob1, rob2 + nums[i]);
    rob2 = rob1;
    rob1 = rob;
  }

  return rob;
}