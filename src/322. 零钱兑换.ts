// 标签：动态规划/回溯

/**
 * 
  给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

   

  示例 1:

  输入: coins = [1, 2, 5], amount = 11
  输出: 3 
  解释: 11 = 5 + 5 + 1
  示例 2:

  输入: coins = [2], amount = 3
  输出: -1
   

  说明:
  你可以认为每种硬币的数量是无限的。

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/coin-change
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



 */



/**
* 方案1：回溯 + 剪枝

  1. 将coins从小到大排序
  2. 从最大面值的硬币开始试探，然后逐次「减少」硬币面值，进入下一层递归（面值更小的尝试）
     如，k = amount / coin 则是需要 k 个 coin 的硬币，余下的金额则等于 amount - k * coin
      减少硬币面值，进入下一层递归
  3. 下一层递归不行，那么尝试回溯，减少「大面值」硬币的数量，即 k--
  4. 当 amount === 0时，则说明找到一个答案，与之前找到的答案取最小值即可~


  剪枝：
    1. k + count < ans 时，才进入下一层递归，count为 k 的累加
*/

/**
 * 
 * @param coins 
 * @param amount 
 * 
 * 时间复杂度：O(S^n) S为总金额，S^n/c1 * c2 * c... * cn
 * 空间复杂度：在最坏的情况下，递归的最大深度是 nn。因此，我们需要系统递归堆栈使用 O(n) 的空间。
 */

function coinChange(coins: number[], amount: number): number {
  let ans = Infinity
  coins.sort((a, b) => a - b)
  function dfs (amount: number, coinIndex: number, count: number, coins: number[]) {
    if (amount === 0) {
      ans = Math.min(ans, count)
      return
    }
    if (coinIndex === -1) {
      return
    }

    for (let i = amount / coins[coinIndex] | 0; i >= 0 && i + count < ans; i--) {
      const rest = amount - coins[coinIndex] * i
      if (rest < 0) {
        continue
      }
      // if (rest === 0) {
      //   ans = Math.min(ans, count + i)
      //   return
      // }
      dfs(rest, coinIndex - 1, count + i, coins)
    }

  }

  dfs(amount, coins.length - 1, 0, coins)
  return ans === Infinity ? -1 : ans
};



/**
 * 方案2：自下而上的动态规划
 * 
 * 1. 状态定义：定义 dp[i] 为凑成金额 i 的最小硬币数量
 * 2. 状态转移方程：dp[i] = Math.min(dp[i - cj] + 1)，cj代表第 j 枚硬币的面值；其中 j的取值为：0 <= j < n 
 *    状态转移解释：
 *      dp[i] 表示能从 [i - cj] 的金额中多加 1 枚金额为 cj 的硬币得到，即 dp[i - cj] + 1
 *      找到需要硬币最少的那个状态，并且能从这个状态转移过来，即满足 [i - cj]
 *      将最小值赋给 dp[i]
 * 3. base case：刚开始所有状态都是Infinity的，方便状态转移取最小值。
 */

/**
 * 
 * @param {Array} coins 
 * @param {Number} amount 
 * 
 * 时间复杂度：O(n * S) n 为 coins 的长度，S 为 amount 的大小
 * 空间复杂度：O(S) DP 数组需要开长度为总金额 SS 的空间。
 */

 function coinChange2 (coins: number[], amount: number): number {
    let dp = new Array(amount + 1).fill(Infinity)
    const clen = coins.length
    for(let i = 1; i <= amount; i++) {
      let tmpMin = Infinity
      for (const coin of coins) {
        tmpMin = Math.min(tmpMin, dp[i - coin] + 1)
      }
      dp[i] = tmpMin
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
 }