/**
 * 
 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：

插入一个字符
删除一个字符
替换一个字符
 

示例 1：

输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
示例 2：

输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/edit-distance
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * 思路：动态规划
 * 
 * 空间复杂度：O(m * n)
 * 时间复杂度：O(m * n)
 * 
 * 定义dp[i][j]为：字符串word1长度为i，字符串word2长度为j时，word1变为word2所需要的最少步骤。
 * 由于word1可以通过删除、增加、替换字符来变成word2，所以dp[i][j]应是dp[i - 1][j]（删除）、dp[i][j - 1]（增加）、dp[i - 1][j - 1]（替换），三者的最小值再加上 1 ，1即为步骤+1；若当前字符相同，则无需进行操作，dp[i][j] = dp[i - 1][j - 1]。
 * base case：字符串word2的长度为0时、字符串word1的长度为0时，答案分别是word1的长度、word2的长度
 * 状态转移方程：dp[i][j] = min(dp[i - 1][j], dp[i][j - 1], dp[i - 1]dp[j - 1])
*/
function minDistance(word1: string, word2: string): number {
  let dp: Array<Array<number>> = [];
  const LENGTH1 = word1.length;
  const LENGTH2 = word2.length;
  //base case
  for(let i = 0; i <= LENGTH1; i++) {
    dp[i] = [];
    dp[i][0] = i;
  } 
  for(let j = 0; j <= LENGTH2; j++) {
    dp[0][j] = j;
  }

  for(let i = 1; i <= LENGTH1; i++) 
    for(let j = 1; j <= LENGTH2; j++) 
      if(word1.charAt(i - 1) === word2.charAt(j - 1)) 
        dp[i][j] = dp[i - 1][j - 1];
      else 
        dp[i][j] = Math.min(dp[i - 1][j - 1] + 1, dp[i - 1][j] + 1, dp[i][j - 1] + 1);

  return dp[LENGTH1][LENGTH2];
};