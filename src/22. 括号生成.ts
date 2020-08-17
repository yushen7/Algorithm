// 标签：递归/动态规划



// 递归穷举所有的可能性
// 假如 n === 3
//                                                       [3, 3] <==>分别代表左右括号数量为3
//                                           [2,3]   <-          -> [3,2] => 这种情况不可能存在，因为已经使用的右括号数量大于左括号数量
//                             [1,3]  <-           -> [2,2]
//                    [0,3]<-   -> [1,2]     [1,2] <-      -> [1,2] => 这种情况不可能存在，因为已经使用的右括号数量大于左括号数量

// 递归的过程中，要记录生成左右括号的字符串，比如左括号能使用的数量减少1，相应地加上左括号
// 直到左右括号都被消耗完，便找到了一个答案
function generateParenthesis (n: number): string[] {
  const ans: string[] = []
  const helper = function helper (cur: string, l: number, r: number, ans: string[]) {
    // 左右括号消耗完了
    if (l === 0 && r === 0) {
      ans.push(cur)
      return
    }

    // 只有左括号大于0才能继续消耗左括号
    if (l > 0) {
      // 
      helper(cur + '(', l - 1, r, ans)
    }

    // 只有右括号大于0才能继续消耗右括号
    // 且左括号能使用的数量严格小于右括号时
    if (r > 0 && l < r) {
      helper(cur + '(', l, r - 1, ans)
    }
  }

  helper('', n, n, ans)
  return ans
}

function generateParenthesis2 (n: number): string[] {
  const dp: string[][] = [['']]


  for (let i = 1; i <= n; i++) {
    const arr: string[] = []
    for (let p = 0; p < i; p++) {
      const s1 = dp[p]
      const s2 = dp[i - 1 - p]
      for (const str1 of s1) {
        for (const str2 of s2) {
          arr.push('(' + str1 + ')' + str2)
        }
      }
    }
    dp.push(arr)
  }

  return dp[n]
};