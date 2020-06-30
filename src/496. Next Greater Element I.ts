/**
 * You are given two arrays (without duplicates) nums1 and nums2 where nums1’s elements are subset of nums2. Find all the next greater numbers for nums1's elements in the corresponding places of nums2.

The Next Greater Number of a number x in nums1 is the first greater number to its right in nums2. If it does not exist, output -1 for this number.

Example 1:
Input: nums1 = [4,1,2], nums2 = [1,3,4,2].
Output: [-1,3,-1]
Explanation:
    For number 4 in the first array, you cannot find the next greater number for it in the second array, so output -1.
    For number 1 in the first array, the next greater number for it in the second array is 3.
    For number 2 in the first array, there is no next greater number for it in the second array, so output -1.
Example 2:
Input: nums1 = [2,4], nums2 = [1,2,3,4].
Output: [3,-1]
Explanation:
    For number 2 in the first array, the next greater number for it in the second array is 3.
    For number 4 in the first array, there is no next greater number for it in the second array, so output -1.
Note:
All elements in nums1 and nums2 are unique.
The length of both nums1 and nums2 would not exceed 1000.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/next-greater-element-i
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
  * 标签：单调栈
  * 
  * @param nums1 
  * @param nums2 
  * 
  * 时间复杂度：O(m + n) m为nums1的长度，n为nums2的长度
  * 空间复杂度：O(n) n为nums2的长度
  * 
  * 思路：
  */
var nextGreaterElement = function(nums1: number[], nums2: number[]): number[] {
  let stk = [];
  let map = new Map();
  

  for(let i = 0;i < nums2.length; i++) {
    while(stk.length > 0 && nums2[i] > stk[stk.length - 1]) {
      const num = stk.pop();
      map.set(num, nums2[i]);
    }

    stk.push(nums2[i]);
  }

  const greaterArr = [];
  for(const num of nums1) {
    const greater = map.get(num);
    greaterArr.push(greater ? greater : -1);
  }

  return greaterArr;
};