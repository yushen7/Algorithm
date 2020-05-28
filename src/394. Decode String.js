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