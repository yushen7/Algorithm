/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {

  //binary tree
  let node;
  let stack = [];
  stack.push(root);
  while(stack[stack.length - 1]) {
      node = stack.pop();
      //swap
      if(node.left || node.right) {
          const tmp = node.left;
          node.left = node.right;
          node.right = tmp;
      }

      node.left && stack.push(node.left);
      node.right && stack.push(node.right);

  }

  return root;
};