/**
 * 
给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。

若这两个字符串没有公共子序列，则返回 0。

 

示例 1:

输入：text1 = "abcde", text2 = "ace" 
输出：3  
解释：最长公共子序列是 "ace"，它的长度为 3。
示例 2:

输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc"，它的长度为 3。
示例 3:

输入：text1 = "abc", text2 = "def"
输出：0
解释：两个字符串没有公共子序列，返回 0。
 

提示:

1 <= text1.length <= 1000
1 <= text2.length <= 1000
输入的字符串只含有小写英文字符。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-common-subsequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**状态：dp[i][j]代表text1的前i位与text2的前j位的最长公共子序列的长度为dp[i][j]
 * 选择：text1[i-1]与text2[j-1]相等时，dp[i][j] = 
 * dp[i][j] = 
 */
function longestCommonSubsequence(text1: string, text2: string): number {
  let dp: Array<Array<number>> = [];
  const n1 = text1.length, n2 = text2.length;
  for(let i = 0; i <= n2; i++) {
    dp[i] = new Array(n1 + 1);

    dp[i][0] = 0;
  }
  dp[0].fill(0);

  for(let i = 1; i <= n2; i++) {
    for(let j = 1; j <= n1; j++) {
      if(text2.charAt(i - 1) === text1.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }


  return dp[n2][n1];
};