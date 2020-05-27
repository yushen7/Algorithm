/**
 * 
 * 
Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.

Example 1:

Input: [1,3,4,2,2]
Output: 2
Example 2:

Input: [3,1,3,4,2]
Output: 3
Note:

You must not modify the array (assume the array is read only).
You must use only constant, O(1) extra space.
Your runtime complexity should be less than O(n2).
There is only one duplicate number in the array, but it could be repeated more than once.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-the-duplicate-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * 看题解得出的答案，细细思考了一番： 快慢指针
 * 几个前提条件：
 *  1.数据的范围[1, n]，
 *  2.元素的个数为 n + 1
 * 这表明
 *  1.可以构造一个链表，再使用Floyd 判圈法判定快慢指针在环内的相遇点位置，
 *  2.再从这个相遇点再得到入口点的位置。 此入口点便为重复的数字（因为只有重复的数字才会让链表成环）
 * 从相遇点找入口点的逻辑：假设圈长为L，从起始点到环的入口点的距离为a，从入口点到相遇点的距离为b，从相遇点到终点（入口点）的距离为c有：
 *  1. L = b + c
 *  2.  
 *    当slow指针和fast指针相遇（假设快指针一次走两步，是慢指针一步的两倍，k表示快指针走的圈数）：
 *    1)slow指针走过的距离： a + b
 *    2)fast指针走过的距离： 2(a + b) = a + b + kL , a = kL - b => a = kL - b => a = (k- 1)L + c
 * 最终得出a与c的关系。
 * 如果我们知道了c的位置，则可以得出a，至于(k-1)L无关紧要，可以通过循环去除（只需要位移，不需要路程，走过了圈数只是在做循环）。
 * 所以第一步求出相遇点，第二步通过循环去除(k-1)L
 */
var findDuplicate = function(nums: number[]): number {
  let slow = nums[0], fast = nums[slow];

  while(slow !== fast) {
      slow = nums[slow];
      fast = nums[nums[fast]];
  }

  slow = 0;

  while(slow !== fast) {
      slow = nums[slow];
      fast = nums[fast];
  }


  return slow;
};