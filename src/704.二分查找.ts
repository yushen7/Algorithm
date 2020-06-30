function search(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  
  while(left <= right) {
    const mid = right - Math.floor((right - left) / 2);
    if(target > nums[mid]) {
      left = mid + 1;
    }else if(target < nums[mid]) {
      right = mid - 1;
    }else {
      return mid;
    }
  }

  return -1;
};