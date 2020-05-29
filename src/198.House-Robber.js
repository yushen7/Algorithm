/**
 * You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

Example 1:

Input: [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.
Example 2:

Input: [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
             Total amount you can rob = 2 + 9 + 1 = 12.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/house-robber
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


 * 思路：问题可以转化为求数组(长度为n)不相邻的元素加和的最大值。
  k < n
  1.边界条件：
    当k=1时，最大值为nums[0]
    当k=2时，最大值为max(nums[0], num[1])
  
  2.当k>=3时（k < n），只有两种情况：
    1) dp[k - 2] + nums[k] > nums[k - 1], dp[k] = dp[k - 2] + nums[k]
    2) dp[k - 2] + nums[k] < nums[k - 1], dp[k] = dp[k - 1]
    得出状态转移方程：
      dp[k] = max(nums[k - 1], nums[k] + nums[k - 2])

    由于取得dp[k]只需要dp[k - 1]和 dp[k - 2]，所以可以用三个变量代替dp数组的当前dp值、前一个dp值、前第二个dp值。
 *  
 * 
 * @param {number[]} nums
 * @return {number}
 * 
 * 
 */
var rob = function(nums) {
  const n = nums.length;
  let cur = 0;
  let step2 = 0, step1 = 0;
  for(let i = 0;i < n; i++) {
      cur = Math.max(step1, step2 + nums[i]);
      step2 = step1;
      step1 = cur;
  };

  return cur;
};