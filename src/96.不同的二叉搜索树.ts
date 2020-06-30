/**
 * 标签：动态规划
 * 这道题更像是一道找规律题
 * 
 * 给出数字n，二叉搜索树的节点的值范围在[1，n]里，求能组合成多少种形状
 */

/**
 * 
 * 
 * 
 * 根据推断得知，n节点只有两种情况：无左子树但有祖先节点、有左子树。
 * 所以结合这两种情况：
 * n节点有
 * (n - 1个祖先节点时，便有0个左子树的节点)。
 * (n - 2, 1)
 * (n - 3, 2)
 *   ......
 * (0, n - 1)
 * 所以 dp[n] = (dp[n - 1] * dp[0]) + (dp[n - 2] * dp[1]) + ... + (dp[0] * dp[n - 1])
 *            = 2 * [(dp[n - 1] * dp[0]) + (dp[n - 2] * dp[1]) + ... + (dp[mid] * dp[mid])] , n为偶数
 *            = 2 * [](dp[n - 1] * dp[0]) + (dp[n - 2] * dp[1]) + ... + (dp[mid] * dp[mid])] - (dp[mid] * dp[mid], n为奇数
 * 
 * 时间复杂度：O(n * n) 俩循环，外层O(n)，内层O(n / 2) = O(n)
 * 空间复杂度：O(1)
 */
function numTrees(n: number): number {
  if(n <= 2) {
    return n;
  };
  let dp = [1,1];
  for(let i = 2; i <= n; i++) {
    dp[i] = 0;
    const mid = Math.ceil(i / 2);
    for(let j = 1; j <= mid; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    };
    dp[i] *= 2;
    
    if(mid !== i / 2) {
      dp[i] -= dp[mid - 1] * dp[i - mid];
    }

  }
  return dp[n];
};