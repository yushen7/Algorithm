/**
 * 
给你一个字符串 S、一个字符串 T，请在字符串 S 里面找出：包含 T 所有字符的最小子串。

示例：

输入: S = "ADOBECODEBANC", T = "ABC"
输出: "BANC"
说明：

如果 S 中不存这样的子串，则返回空字符串 ""。
如果 S 中存在这样的子串，我们保证它是唯一的答案。
通过次数60,283提交次数158,138

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-window-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * S = "ADOBE CODEB ANC", T = "ABC"
 * left = 9 right = 12
 * S = "ADOBE CODEB ANC", T = "ABC"
 * 
 * 思路：双指针滑动窗口
 * 
 * 过程：两个指针：left和right，让right不断自增，
 *      当 s[left...right]包含了T所有的字符，
 *      进行缩小窗口的操作：此时不断地自增left，直到窗口不再包含T所有的字符，
 *      此时的窗口为当前能得到的最小窗口：right - left + 1，使用一个变量minLen保存最小窗口的长度，与当right - left + 1比较即可。
 * base case：当T的长度大于S时，S中不可能包含T所有的字符，返回空字符串；当S中的所有子串都不包含T的所有字符时，也返回空字符串。
 * 举例：
 * base case1：S = 'abcd' T = 'abcde' ret = ''
 * base case2: S = 'abc' T = 'd' ret = ''
 * normal case:  S = "ADOBE CODEB ANC", T = "ABC" ret = 'BANC' 第一个窗口：ADOBEC 第二个窗口：CODEBA 第三个窗口：BANC
 * 
 * 难点：
 *      1. 判断窗口包含T所有的字符
 *      2. 判断窗口不再包含T所有的字符
 *      用两个 map，
 *       一个map（needs）用于保存T中的字符，且保存字符中出现的次数（这个很关键），
 *       一个map（window）用于保存当前窗口包含的T中的字符，且保存字符出现的次数（这个很关键）。
 * 使用一个变量match记录当前窗口所匹配到的T中*不重复*的字符个数，当match与needs.size相等时，当前窗口便包含了T中所有字符，
 * 
 * 举个栗子：
 * S = 'ATFFC FBDCA C' T = 'ABCC' match = 0 needs = {A=>1, B=>1, C=>2} window = {A=>0, B=>0, C=>0} left = 0, right = 0
 * 
 * char = S.charAt(right) === A       
 * 1. needs有A，则window.A++，如果needs.A === window.A 那么match++，然后判断match与needs.size是否相等，很明显这里不相等
 * right++; char = S.charAt(right) === T     window = {A=>1, B=>0, C=>0} match = 1
 * 2. needs没有T，则不干任何事
 * right++; char = S.charAt(right) === F
 * 3.needs没有F，则不干任何事
 * right++;char = S.charAt(right) === F
 * 4.needs没有F，则不干任何事
 * right++;char = S.charAt(right) === C         
 * 5.needs有C，则window.C++，如果needs.C === window.C 那么match++，而window.C和needs.C不相等。
 * right++;char = S.charAt(right) === F  window = {A=>1, B=>0, C=>1} match = 1
 * 6.needs没有F，则不干任何事
 * right++;char = S.charAt(right) === B 
 * 7.needs有B，则window.B++，如果needs.B === window.B 那么match++，然后判断match与needs.size是否相等，明显不相等
 * right++;char = S.charAt(right) === D window = {A=>1, B=>1, C=>1} match = 2
 * 8.needs没有D，则不干任何事
 * right++;char = S.charAt(right) === C
 * 9.needs有C，则window.C++，如果needs.C === window.C 那么match++，而这里window.C和needs.C相等，match++，match与needs.size相等，
 *   window = {A=>1, B=>1, C=>2} match = 3 === needs.size:3
 * 
 *   至此，出现了第一个包含T所有字符的窗口：left = 0, right = 8 s[left...right] = ATFFCFBDC
 *   由于match === needs.size，那么进行缩小窗口的操作
     判断minLen和right - left + 1哪个小，进行赋值；判断needs是否含有left所在的字符tmpc，如果有，则window.tmpc--，如果window.tmpc < needs.tmpc，match--。
     最后：minLen = right - left + 1 = 9; start = left, 缩小后的窗口为：s[start...minLen - 1] = ATFFCFBDC，left++。

   10.到这一步，left=1，window = {A=>0, B=>1, C=>2},match = 2比needs.size小1。当前窗口为s[left...right] = TFFCFBDC。
   11.重复以上步骤。
   12.最后的结果为s.substr(start, minLen)


   时间复杂度：O(N + M) N为S的长度，M为T的长度，左右指针分别遍历1次字符串S，O(M)的时间初始化needs和window，map的set和get理论上是O(1)的时间。:)
   空间复杂度：O(M) M为T的长度，需要额外的O(2 * M)空间存放字符。 
 */
function minWindow(s: string, t: string): string {
  if(t.length > s.length) return '';
    let window: Map<string, number> = new Map(),
        needs: Map<string, number> = new Map(),
        match = 0, needLen = t.length, minLen = Infinity, start = 0;

  
  for(const c of t) {
      needs.set(c, needs.has(c) ? needs.get(c)! + 1 : 1);
      window.set(c, 0);
  };


  let right = -1, left = 0, c = '';
  while(c = s.charAt(++right)) {
      if (needs.has(c)) {
          window.set(c, window.get(c)! + 1);
          if (window.get(c) === needs.get(c)) {
              match++;
          }
      }

      while (match === needs.size) {
          //right为右边窗口字符的索引，left为左边窗口字符的索引，相减再加1得长度
          if (right - left + 1 < minLen) {
              start = left;
              minLen = right - left + 1;
          }
          const tmpc = s.charAt(left);
          if (needs.has(tmpc)) {
              window.set(tmpc, window.get(tmpc)! - 1);
              //这里必须要用‘＜’判断，不能用‘！=’，‘>’的情况是指当前窗口包含了多个T的字符。
              if (window.get(tmpc)! < needs.get(tmpc)!) {
                match--;
              }

          }
          //left自增建立在两种情况下：
          //1.tmpc不在t里，为了缩小窗口，那么left自然是要自增的
          //2.tmpc在t里，match自减，那么left也相应自增
          left++;
      }


  }
  //在返回值的时候要进行判断，s里不含有t，需要返回空字符串
  return minLen === Infinity ? '' :  s.substr(start, minLen);
};
