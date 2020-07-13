/** 
 * 给定一个整数数组 nums，返回区间和在 [lower, upper] 之间的个数，包含 lower 和 upper。
区间和 S(i, j) 表示在 nums 中，位置从 i 到 j 的元素之和，包含 i 和 j (i ≤ j)。

说明:
最直观的算法复杂度是 O(n2) ，请在此基础上优化你的算法。

示例:

输入: nums = [-2,5,-1], lower = -2, upper = 2,
输出: 3 
解释: 3个区间分别是: [0,0], [2,2], [0,2]，它们表示的和分别为: -2, -1, 2。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/count-of-range-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/


/**
 * 
 * @param nums 整数数组
 * @param lower 下界
 * @param upper 上界
 * 
 * 时间复杂度：O(NlogN) partition需要O(logN)时间，每次partition的merge需要O(N)时间以及求前缀和的差落在区间内的个数需要O(N)时间，总的是O(N * logN)
 * 空间复杂度：O(N) 额外O(N)空间辅助排序，以及额外O(logN)函数栈的空间
 * 
 * 思路：
 *  求某数组的区间和符合lower和upper区间的个数，可以转化为求 两个有序前缀和数组的元素的差符合lower和upper区间的个数，归并排序，依次求解
 *  如，求[1,2,3]的区间和符合lower = 1，upper = 3的个数
 *      输出：4
 *      解释：[0],[1],[0,1],[2]这三个子数组符合要求，它们的和分别为1,2,3,3
 *   如果转化为求前缀和的差的话：
 *       前缀和数组：[0,1,3,6] （必须多一个元素）
 *       先进行partition：([0]，[1]) ([3],[6])
 *        求([0]，[1])：1 - 0  = 1属于 [1,3]，即有1个，进行merge，([0]，[1]) => ([0,1])
 *        求([3],[6])：6 - 3 = 3 属于[1,3]，加上之前的1个，现在是2个，进行merge，([3],[6]) => ([3,6])
 *        求([0,1], [3,6])：3 - 0，3 - 1符合，加上之前的2个，现在是4个，进行merge，([0,1,3,6])
 *        结果便为4个
 * 
 * 所以归并排序 + 前缀和的思路步骤分为：
 *   1. 初始化前缀和数组，要多一个元素，存放0
 *   2. 对前缀和数组，进行归并排序，在partition完毕之后，由于现在得到的两个数组均有序，所以进行求前缀和差个数的工作
 *   3. 对前缀和数组进行merge
 * 
 */
function countRangeSum(nums: number[], lower: number, upper: number): number {
  const len = nums.length

  //前缀和 + 归并排序
  //1.初始化前缀和数组，必须多一个空间
  const tmp: number[] = new Array(len + 1)
  const sums: number[] = new Array(len + 1)

  sums[0] = 0
  for(let i = 1; i <= len; i++) {
    sums[i] = sums[i - 1]  + nums[i - 1]
  }

  return partition(sums, 0, len, [lower, upper], tmp)  
};


function partition(sums: number[], lo: number, hi: number, range: number[], tmp: number[]): number {
  //limit
  if(hi <= lo) return 0
  
  const mid = lo + (hi - lo) / 2 | 0
  let count: number = partition(sums, lo, mid, range, tmp) + partition(sums, mid + 1, hi, range, tmp)
         
  // 2. 对于两个有序数组，计算他们的sums[j] - sums[i] 在 range 区间的个数
  for(let left = lo, i = mid + 1, j = mid + 1; left <= mid; left++) {
    while(i <= hi && sums[i] - sums[left] < range[0]) i++
    while(j <= hi && sums[j] - sums[left] <= range[1]) j++
    count += j - i
  }
  // 3. merge，其实最后一步的merge可以舍去，直接return
  merge(sums, lo, mid, hi, tmp)
  return count
}

function merge(sums: number[], lo: number, mid:number, hi: number, tmp: number[]) {
  for(let i = lo; i <= hi; i++) {
    tmp[i] = sums[i]
  }
  for(let k = lo, i = lo, j = mid + 1; k <= hi; k++) {

    if(i > mid) {
      sums[k] = tmp[j]
      j++
    }else if(j > hi) {
      sums[k] = tmp[i]
      i++
    }else if(tmp[i] <= tmp[j]) {
      sums[k] = tmp[i]
      i++
    }else {
      sums[k] = tmp[j]
      j++
    }
  }
}
