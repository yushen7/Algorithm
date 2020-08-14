/**
 * 
 * 思路：动态规划
 * 
 * 
 * 时间复杂度：O(N) O(N)时间初始化dp数组，O(N)时间遍历数组。
 * 空间复杂度：O(N) dp数组需要O(N)的空间
 */
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length;
  if(m === 0) return 0;
  const n = obstacleGrid[0].length;
  if(n === 0) return 0;

  //m行，n列
  let dp: Array<number> = new Array(n + 1);
  
  dp[0] = 0;
  dp[1] = obstacleGrid[0][0] ? 0 : 1;
  for(let j = 2; j <= n; j++) {
    dp[j] = obstacleGrid[0][j - 1] ? 0 : dp[j - 1]; 
  };
  
  for(let i = 1; i < m; i++) {
    for(let j = 1; j <= n; j++) {
      dp[j] = obstacleGrid[i][j - 1] ? 0 : (dp[j] + dp[j - 1]);
    }
  }
  return dp[n];
};

