/**
 * 
 * 
 * 
 * 
 * 给定一个字符串 s ，找到其中最长的回文子序列，并返回该序列的长度。可以假设 s 的最大长度为 1000 。

 

    示例 1:
    输入:

    "bbbab"
    输出:

    4
    一个可能的最长回文子序列为 "bbbb"。

    示例 2:
    输入:

    "cbbd"
    输出:

    2
    一个可能的最长回文子序列为 "bb"。

     

    提示：

    1 <= s.length <= 1000
    s 只包含小写英文字母

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/longest-palindromic-subsequence
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
  * 
  * 思路：动态规划
  * 
  * 时间复杂度：O(n * n)
  * 空间复杂度：O(n * n)
  */
function longestPalindromeSubseq(s: string): number {
  if(s.length === 0) return 0;
    const n = s.length;
    let dp: Array<Array<number>> = new Array(n);

    for(let i = 0; i < n; i++) {
      dp[i] = new Array(n);
      dp[i].fill(0);
      dp[i][i] = 1;
    }

    for(let i = n - 2; i >= 0; i--) {
      for(let j = i + 1; j < n; j++) {
        if(s.charAt(i) === s.charAt(j)) {
          dp[i][j] = dp[i + 1][j - 1] + 2;
        }else {
          dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
        }
      }
    }

    return dp[0][n - 1];
};