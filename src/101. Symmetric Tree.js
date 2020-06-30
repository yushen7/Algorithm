/**
 * 
 * Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/symmetric-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean} 
 * 
 * 
 * 原理：
 * 
 * 时间复杂度：O(n) 每个节点入队出队一次
 * 空间复杂度：O(1) ，队列中的节点数不会超过n，渐进空间复杂度为O(n) 
 * 
 * 
 */
var isSymmetric = function(root) {
  if(!root) {
    return true;
  }
  let q = [root.left, root.right];

  let n1, n2;

  while(q.length > 1) {
    n1 = q.shift(); n2 = q.pop();

    if(!n1 && !n2) {
      continue;
    }
    if((!n1 || !n2) || n1.val !== n2.val) {
      return false;
    }

    q.unshift(n1.left); q.push(n2.right);
    q.unshift(n1.right); q.push(n2.left);
  }

  return true;
};