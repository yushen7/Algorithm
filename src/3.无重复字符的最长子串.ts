/**
 * 
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * 
 * 时间复杂度： O(N) 左右指针分别遍历字符串一次
 * 空间复杂度： O(N) 
 */
var lengthOfLongestSubstring = function(s: string): number {
  if(!s) return 0

  const window: {[key: string]: number} = Object.create(null)

  let max = 0
  for(let i = 0, left = 0, c; c = s.charAt(i); i++) {

    if(window[c] > -1) {
      let start = left
      left = window[c] + 1

      while(start < left) {
        window[s.charAt(start)] = -1
        start++
      }
    }
    window[c] = i


    max = Math.max(max, i - left + 1)
  }
  return max
};