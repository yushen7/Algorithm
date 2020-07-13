/**
 * 
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

 

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
通过次数1,173,203 提交次数2,399,645

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
//1.暴力法 找出两两可能的组合，非排列（同一个元素不能使用两遍）
// nums[x] + nums[y] = target
//时间复杂度：O(n^2) 遍历数组O(n)，每次寻找y需要O(n - x)的时间
//空间复杂度：O(1)

// var twoSum = function(nums, target) {
//     //固定nums[x]，寻找nums[y]
//     const n = nums.length;
//     for(let x = 0; x < n; x++) {
//       for(let y = x + 1; y < n; y++) {
//         if(nums[x] + nums[y] === target) return [x, y];  
//       }
//     }

//     return [];
// };

//2.哈希表 空间换时间
//将target - nums[i]的结果存入哈希表中，此后只要判断nums[i...n-1]是否在哈希表中
//时间复杂度：O(n) 遍历数组需要O(n)时间，每次计算需要一次哈希表添加值O(1)时间、判断哈希表是否有对应值O(1)时间
//空间复杂度：O(n) 需要O(n)额外空间的哈希表
var twoSum = function(nums, target) {
  //
  const map = new Map();
  for(let i = 0; i < nums.length; i++) {

    if(map.has(nums[i])) return [map.get(nums[i]), i];
    //存储target - nums[i]的值以及其对应的索引，因为结果要[一对,索引]
    map.set(target - nums[i], i);
  }
  return [];
}













