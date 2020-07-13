/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
const ret: number[][] = [];

function pathSum(root: TreeNode | null, sum: number): number[][] {
  dfs(root, sum, []);
  return ret;
};

function dfs(root: TreeNode | null, sum: number, path: number[]){
  if(!root) return [];

  //这是你留下的足迹
  path.push(root.val);

  if(sum === root.val && !root.left && !root.right) {
      //回溯，你是万中选一的路径，把你推进去
      //
      ret.push(path.slice(0));
      //同样地，你也不要去影响别的路径
      //撤销选择
      path.pop();
      return [[root.val]];
  };
    //选择left和right
    root.left && dfs(root.left, sum - root.val, path);
    root.right && dfs(root.right, sum - root.val, path);

    //不要去影响别的路径
    //撤销选择
    path.pop();
}






/**
 * 
 * 
 * 437. 路径总和 III
 * 给定一个二叉树，它的每个结点都存放着一个整数值。

找出路径和等于给定数值的路径总数。

路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。

示例：

root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1

返回 3。和等于 8 的路径有:

1.  5 -> 3
2.  5 -> 2 -> 1
3.  -3 -> 11

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/path-sum-iii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
let count: Map<number, number> = new Map();

function pathSum(root: TreeNode | null, sum: number): number {
  count.set(0, 1);
  return dfs(root, sum, 0);
};

function dfs(root: TreeNode | null, sum: number, prefixSum: number): number {
  if(!root) return 0;

  prefixSum += root.val;

  let ans = 0;
  ans += mapGet(count, prefixSum - sum);
  const tmpVal = count.has(prefixSum) ? count.get(prefixSum)! + 1 : 1;
  
  count.set(prefixSum, tmpVal);
  ans += dfs(root.left, sum, prefixSum) + dfs(root.right, sum, prefixSum);
  count.set(prefixSum, count.get(prefixSum)! - 1);

  return ans;
}

function mapGet<T>(map: Map<T, any>, key: T) {
  return map.has(key) ? map.get(key) : 0;
}


