/**
 * 
 * 定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

注意:

每个数组中的元素不会超过 100
数组的大小不会超过 200
示例 1:

输入: [1, 5, 11, 5]

输出: true

解释: 数组可以分割成 [1, 5, 5] 和 [11].
 

示例 2:

输入: [1, 2, 3, 5]

输出: false

解释: 数组不能分割成两个元素和相等的子集.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/partition-equal-subset-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * 思路：动态规划
 * 
 * 定义dp[i][j]为：是否有一种方法，在前i个数中选择，使得某一个子集总和恰好为j。
 * 而集合被分为两个子集，这两个子集各自所有元素的总和相等，即sum / 2。
 * 所以，答案便是：是否有一种方法，在前N个数中选择，使得某一个子集总和恰好为sum / 2。
 * 
 * 边界条件：   当总和为0时，已经达到总和，dp[0...N][0]为true；当无数可选时，没办法达到总和，dp[0][0...sum/2]为false。
 * 状态转移方程：dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
 * 
 *  
 * 
 * 
 */
function canPartition(nums: number[]): boolean {
  //如果总数是奇数，则不能被分为两个相等的整数和
  let sum = 0; 
  for(const num of nums) sum += num;
  if(sum % 2 !== 0) return false;

  const half = sum / 2;

  let dp: Array<boolean> = new Array(half + 1);
  dp.fill(false);
  dp[0] = true;
  const n =nums.length;
  
  for(let i = 0; i < n; i++) {
    for(let j = half; j >= 1; j--) {
      if(dp[half]) return true;
      if(j - nums[i] >= 0) dp[j] = dp[j] || dp[j - nums[i]];
    }
  }
  return dp[half];
};