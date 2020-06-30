/**
 * 难度：简单
 * 
 * 一道简单题提交失败三次，说到底还是懒得用笔写，情况没考虑完备
 * 
 * 
 * 思路：拿str中每个单词与pattern中每个字母逐个配对，
 * pattern当前的字符：curPattern；str中当前的单词：word
 *    1. 判定条件：curPattern != map.get(word) 
 *    返回false，map中存储了key:word和value:patternLetter的映射关系，set存储已出现的pattern字符
 *    需要处理判断的两种情况，根据set判断curPattern是否是一个新字符：
 *      a. curPattern是一个新的字符，则需要先设置一下map.set(word, curPattern)
 *      b. curPattern是一个已有字符，则什么也不做
 *    2. 需要注意str中单词的个数和pattern的长度关系，如果不相等则直接返回false。
 * 
 * 
 * 时间复杂度： O(n)
 * 空间复杂度： O(k) k为不重复的单词个数
 */

function wordPattern(pattern: string, str: string): boolean {
  if(!pattern || !str) {
    return false;
  }

  // const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';

  let map = new Map();
  let pos = 0, letterPos = 0, patPos = 0, lowerRecord = new Set();
  let cur = str.charAt(pos), curPattern = pattern.charAt(patPos);

  while(cur !== '' && curPattern) {
    let word = '';
    while(cur.charCodeAt(0) !== 32 && cur !== '') {
      word += cur;
      cur = str.charAt(++pos);
    }

    //curPattern是新的，添加，并且检查映射里word是否有curPattern
    if(!lowerRecord.has(curPattern)) {
      !map.has(word) && map.set(word, curPattern);   
      lowerRecord.add(curPattern);
    }
    if(curPattern !== map.get(word) ) {
      return false;
    };
    


  curPattern = pattern.charAt(++patPos);
  //pos当前指向'wordx wordy'中'wordx'后的空格或指向'wordy'后的空字符
  cur = str.charAt(++pos);
  }

  if(pattern.charAt(patPos) !== '' || cur !== '') {
    return false;
  }
  
  return true;
};