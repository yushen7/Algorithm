// 标签：栈



/**
 * 
  给定一个由 '(' 和 ')' 括号组成的字符串 S，我们需要添加最少的括号（ '(' 或是 ')'，可以在任何位置），以使得到的括号字符串有效。

  从形式上讲，只有满足下面几点之一，括号字符串才是有效的：

  它是一个空字符串，或者
  它可以被写成 AB （A 与 B 连接）, 其中 A 和 B 都是有效字符串，或者
  它可以被写作 (A)，其中 A 是有效字符串。
  给定一个括号字符串，返回为使结果字符串有效而必须添加的最少括号数。

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/minimum-add-to-make-parentheses-valid
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
  示例 1：

  输入："())"
  输出：1
  示例 2：

  输入："((("
  输出：3
  示例 3：

  输入："()"
  输出：0
  示例 4：

  输入："()))(("
  输出：4

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/minimum-add-to-make-parentheses-valid
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * 维护「左括号计数器」 left，类似于栈的思想
 * 
 * 
 * 1. 从左往右遍历
 *  1-1. 遇到左括号，left++
 *  2-1. 遇到右括号，判断left是否为0，如果为0，则ans++，否则left--
 * 2. 最后，ans加上剩余匹配不到「右括号」的「左括号」数量，如 `(())((`，遍历完后，此时 left为 2 ，需要加上2
 * 3. 返回ans
 */

/**
 * 
 * @param S 
 * 
 * 
 */

function minAddToMakeValid(S: string): number {
  let ans = 0, left = 0

  const last = S.length - 1
  for (let i = 0; i <= last; i++) {
    if (S.charAt(i) === '(') {
      left++
    } else {
      if (left === 0) {
        ans++
      } else {
        left--
      }
    }
  }
  ans += left
  return ans
};
