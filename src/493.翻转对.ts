/**
 * 给定一个数组 nums ，如果 i < j 且 nums[i] > 2*nums[j] 我们就将 (i, j) 称作一个重要翻转对。

你需要返回给定数组中的重要翻转对的数量。

示例 1:

输入: [1,3,2,3,1]
输出: 2
示例 2:

输入: [2,4,3,5,1]
输出: 3
注意:

给定数组的长度不会超过50000。
输入数组中的所有数字都在32位整数的表示范围内。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-pairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
//数组长度上限为50000

/**
 * 时间复杂度：O(N \log N)O(NlogN)。

 * 空间复杂度：O(N)O(N)。
 */
let tmp: number[]


function reversePairs(nums: number[]): number {
  if(nums.length < 2) return 0

  const n = nums.length
        tmp = new Array(n)

  return partition(nums, 0, n - 1)
};

function partition(nums: number[], lo: number, hi: number): number {
  if(hi === lo) return 0

  const mid = lo + (hi - lo) / 2 | 0

  let count = partition(nums, lo, mid) + partition(nums, mid + 1, hi)

  for(let left = mid, j = hi; left >= lo; left--) {
    while(j > mid  && nums[left] <= 2 * nums[j] ) {
      j--
    }

    count += j - mid
  }
  merge(nums, lo, mid, hi)

  return count
}

function merge(nums: number[], lo: number, mid:number, hi: number) {
  for(let i = lo; i <= hi; i++) {
    tmp[i] = nums[i]
  }

  for(let k = lo, i = lo, j = mid + 1; k <= hi; k++) {
    if(i > mid) {
      nums[k] = tmp[j]
      j++
    }else if(j > hi) {
      nums[k] = tmp[i]
      i++
    }else if(tmp[i] <= tmp[j]) {
      nums[k] = tmp[i]
      i++
    }else {
      nums[k] = tmp[j]
      j++
    }
  }
}