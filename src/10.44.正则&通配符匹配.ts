/**
 * 
 * 
 * 
 * 10.正则匹配
 * 
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

说明:

s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
示例 1:

输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
示例 2:

输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
示例 3:

输入:
s = "ab"
p = ".*"
输出: true
解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
示例 4:

输入:
s = "aab"
p = "c*a*b"
输出: true
解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
示例 5:

输入:
s = "mississippi"
p = "mis*is*p*."
输出: false
通过次数96,763提交次数324,951

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/regular-expression-matching
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


 * 1. 匹配s和p字符相等
 * 例如：s = 'abc' p = 'abc' s === p
 *      s = 'abc' p = 'ab' s !== p
 * 2. 匹配s和p字符`.`相等
 * 例如： s = 'abc' p ='.bc' s === p match
 *       s = 'abc' p ='.abc' s=== p match
 * 3. 匹配s和p字符`*`相等
 * 例如： s = 'abc' p = 'aa*bc' s === p 0个a
 *       s = 'abc' p = 'a*bc' s === p 1个a
 *       s = 'aabc' p = 'a*bc' s === p 2个a
 *       s = ''
 */
// 从前往后
function isMatch(s: string, p: string): boolean {

  return _isMatch(s, 0, p, 0);
};

function _isMatch(s: string, i: number, p: string, j: number): boolean {
  const n = s.length, m = p.length;
  if(j === m) {
    return i === n;
  };

  //判断情况1和2
  if(j === m - 1 || p.charAt(j + 1) !== '*') 
    return i < n && (s.charAt(i) === p.charAt(j) || p.charAt(j) === '.') && _isMatch(s, i + 1, p, j + 1);

  //j必须小于m-1，才有(x*)这样的组合
  if(j < m - 1 && p.charAt(j + 1) === '*') {
    //进入(x*)的模式，x为p.charAt(j)，判断x与当前s.charAt(i)是否相符
    //由于i每次都会递增，所以相当于构造了1...n个x，只要x与s.charAt(i)相等，就会一直比较下去。
    while(i < n && (s.charAt(i) === p.charAt(j) || p.charAt(j) === '.')) {
      //回溯，j + 2表示(x*)的下一个字符：next
      //如果从next字符开始，匹配s和p为true，说明s和p匹配
      if(_isMatch(s, i, p, j + 2)) {
        return true;
      }
      //表示1个，2个，3个...n个前面的字符
      i++;
    }
  }
  //表示0个前面的字符的情况或i >= n了
  return _isMatch(s, i, p, j + 2);
}

function isMatch(s: string, p: string): boolean {

  const m = s.length, n = p.length;
  let dp: Array<boolean[]> = new Array(m + 1);
  dp.fill(new Array(n + 1));

  //1.base case
  // 对于长度为0的s和p字符串，它们肯定是匹配的
  dp[0][0] = true;
  // 对于长度为0的s，以及p的 '*' 组合， 它们肯定是匹配的，前提条件为dp[0][j-2]为true。
  for(let j = 1; j <= n; j++) {
    dp[0][j] = j > 1 && p.charAt(j - 1) === '*' && dp[0][j - 2];
  };



  for(let i = 1; i <= m; i++) {
    const sChar = s.charAt(i - 1);

    for(let j = 1; j <= n; j++) {
      const pChar = p.charAt(j - 1);
      //状态转移
      //dp[i-1][j-1]为true，且当前字符匹配，那么dp[i][j]为true
      if(pChar !== '*') {
        dp[i][j] = dp[i - 1][j - 1] && _isMatch(sChar, pChar);
      }else {
        //const beforeStarChar = p.charAt(j - 2);
        //*组合表示0个字符的情况：dp[i][j - 2]
        //*组合表示1...k个字符的情况：dp[i - 1][j] && _isMatch(sChar, pChar))
        dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && _isMatch(sChar,  p.charAt(j - 2)));
      }
    }
  }

  return dp[m][n];
};

function _isMatch(sChar: string, pChar: string) {
  return sChar === pChar || pChar === '.';
}


/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 44.通配符匹配
给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。

'?' 可以匹配任何单个字符。
'*' 可以匹配任意字符串（包括空字符串）。
两个字符串完全匹配才算匹配成功。

说明:

s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 ? 和 *。
示例 1:

输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
示例 2:

输入:
s = "aa"
p = "*"
输出: true
解释: '*' 可以匹配任意字符串。
示例 3:

输入:
s = "cb"
p = "?a"
输出: false
解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。
示例 4:

输入:
s = "adceb"
p = "*a*b"
输出: true
解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".
示例 5:

输入:
s = "acdcb"
p = "a*c?b"
输出: false
通过次数39,456提交次数133,059

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/wildcard-matching
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 
 * 
 */


 /**
  * 

  */
function isMatch(s: string, p: string){
  const m = s.length, n = p.length;
    let dp: Array<boolean[]> = new Array(m + 1);
    for(let i = 0; i <= m; i++) {
      dp[i] = new Array(n + 1).fill(false);
    }
  
    //1.base case
    dp[0][0] = true;
    for(let j = 1; j <= n ; j++) {
      dp[0][j] = p.charAt(j - 1) === '*' && dp[0][j - 1];
    };
    for(let i = 1; i <= m; i++) {
      for(let j = 1; j <= n; j++) {
        if(p.charAt(j - 1) !== '*') {
          dp[i][j] = dp[i - 1][j - 1] && _isMatch(s.charAt(i - 1), p.charAt(j - 1));
        }else {
          //使用这个星号 dp[i - 1][j]
          //不使用这个星号 dp[i][j - 1]
          dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
        }
      }
    };
      
    return dp[m][n];
  };
  
  function _isMatch(sChar: string, pChar: string): boolean {
    return sChar === pChar || pChar === '?';
  }