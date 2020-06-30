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



 /** 1.递归
  * 时间复杂度： O(n) n为二叉树的节点个数
  * 空间复杂度： O(n) n为二叉树的节点个数，除了节点的O(n)空间外，还需要O(n)空间存放根节点index信息，以及O(h)空间（h为二叉树高度）表示递归栈空间，
  *             由于h < n，则总的为O(n)
  */
let map2root: {
  val: number
} = Object.create(null); 
var buildTree = function(preorder: [], inorder: []): TreeNode | null {

  const n = preorder.length;
  for(let i = 0;i < n; i++) {
      map2root[inorder[i] + ''] = i;
  };

  const _buildTree = function(preorder: [], inorder: [],
      preLeft: number, preRight: number, 
      inLeft: number, inRight: number): (TreeNode | null) {

      if(preLeft > preRight){
          return null;
      }

      const preRootIndex = preLeft;
      const preRootVal = preorder[preRootIndex];
      const inRootIndex = map2root[preRootVal + ''];
      const leftSize = inRootIndex - inLeft;

      let root = new TreeNode(preorder[preRootIndex]);
      
      root.left = _buildTree(preorder, inorder, preRootIndex + 1, preRootIndex + leftSize, inLeft, inRootIndex - 1);
      root.right = _buildTree(preorder, inorder, preRootIndex + leftSize + 1, preRight, inRootIndex + 1, inRight);
      return root;
  }

  return _buildTree(preorder, inorder, 0, n - 1, 0, n - 1);
};


/**
 * 2.迭代
 * 
 * @param preorder 前序遍历二叉树的数组
 * @param inorder  中序遍历二叉树的数组
 * 
 * 时间复杂度： O(n)， n为二叉树的节点个数
 * 空间复杂度： O(n)， 除结果O(n)空间以外，还需要O(h)存栈（h为二叉树高度），最坏情况下h = n，总的为：O(n)
 */
var buildTree = function(preorder: number[] = [], inorder: number[] = []): TreeNode | null {
  if(preorder.length === 0) {
      return null;
  }
  const rootVal = preorder[0];
  let root = new TreeNode(rootVal);
  let stk = [root];
  
  let inIndex = 0;
  for(let i = 1;i < preorder.length; i++) {
      //node作为当前的节点，用于1.连接左节点 
      let node: TreeNode = stk[stk.length - 1];

      if(node.val !== inorder[inIndex]) {
          node.left = new TreeNode(preorder[i]);
          stk.push(node.left);
      }else {
          while(stk.length > 0 && stk[stk.length - 1].val === inorder[inIndex]) {
              //2.找到当前节点的祖先节点，连接右节点
              node = <TreeNode>stk.pop();
              inIndex++;
          }
          //如果循环一次都没执行，说明值的节点为当前节点的右孩子；否则为祖先节点的右孩子
          node.right = new TreeNode(preorder[i]);

          //同样将该右节点进栈，进行同样的操作
          stk.push(node.right);
      }
  }

  return root;
};