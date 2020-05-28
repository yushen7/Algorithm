/**
 * 
 * @param {Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].

Examples:

s = "3[a]2[bc]", return "aaabcbc".
s = "3[a2[c]]", return "accaccacc".
s = "2[abc]3[cd]ef", return "abcabccdcdcdef".

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/decode-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。} s 
 */
/**
 * @param {string} s
 * @return {string}
 * 
 * 
 * 这个题解抄@krahets 的
 * 
 * 整理思路： 需要处理：1.多组嵌套encode string，所以用栈保存上一组string的状态（也可以用递归） 2.多位数字 
 *   将整个encode string当成：lastString + currentString * count，完事
 *   stack保存count和lastString。
 *   1.遇到左括号的时候入栈，push lastString以及currentString的count
 *    * 如果遇到嵌套左括号，如3[asd2[cvb3[dfg]]]，stack就像['',3,'asd',2,'cvb',3]
 *   2.遇到右括号的时候出栈，pop lastString和currentString的count，结合currentString，构造ret，这个ret将作为下一次入栈的lastString
 *   3.遇到字符，将字符插到ret末尾，把ret当成currentString和lastString
 *   4.遇到数字，则构造count
 *
 * 坑：
 *  自己刚开始写的时候遇到数字就入栈...，需要在遇到左中括号的时候再进行入栈操作，不能遇到数字就入栈，数字不止一位数
 *  
 */
var decodeString = function(s) {
  let ret = '', stk = [], count = '';
  for(const c of s) {
      if(c === '[') {
        stk.push(ret);
        stk.push(+count);
        ret = '';
        count = '';
      }else if(c === ']') {
        const curCount = stk.pop();
        const last = stk.pop();
        ret = last + ret.repeat(curCount) 
      }else if(c >= '0' && c <= '9') {
          count += c;
      }else {
          ret += c;
      }
  }
  return ret;
};