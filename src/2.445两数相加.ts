//2. 两数相加
/**
 * 
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
通过次数471,212提交次数1,248,587

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-two-numbers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */


/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function addTwoNumbers1(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  //base case
  if(l1 === null) return l2;
  if(l2 === null) return l1;




  const newListHead = new ListNode();
  let newNode = newListHead;
  let carry = 0;
  let node1: ListNode | null = l1, node2: ListNode | null = l2;
  while(node1 || node2 || carry === 1) {
    const node1Val = node1 ? node1.val : 0
    const node2Val = node2 ? node2.val : 0;
    const tmp = node1Val + node2Val + carry;
    
    carry = Math.floor(tmp / 10);
    newNode.next = new ListNode(tmp % 10);
    newNode = newNode.next;

    node1 && (node1 = node1.next);
    node2 && (node2 = node2.next);
  };
  return newListHead.next;
};


// 445. 两数相加  II

/**
 * 
给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。

你可以假设除了数字 0 之外，这两个数字都不会以零开头。

 

进阶：

如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。

 

示例：

输入：(7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 8 -> 0 -> 7

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-two-numbers-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
function addTwoNumbers2(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if(l1 === null) return l2;
  if(l2 === null) return l1;


  const stk1: Array<number> = [];
  const stk2: Array<number> = [];

  while(l1) {
    stk1.push(l1.val);
    l1 = l1.next;
  };
  while(l2) {
    stk2.push(l2.val);
    l2 = l2.next;
  };

  let head: ListNode | null = null;
  let carry = 0;
  while(stk1.length || stk2.length || carry) {

    let val1 = stk1.pop();
    let val2 = stk2.pop();
    val1 = val1 ? val1 : 0;
    val2 = val2 ? val2 : 0;


    const sum = val1! + val2! + carry;
    carry = sum >= 10 ? 1 : 0;

    const next = new ListNode(sum % 10);
    next.next = head;
    head = next;
  };

  return head;
};