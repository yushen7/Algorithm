/**
 * 
 * 
 * 
    反转一个单链表。

    示例:

    输入: 1->2->3->4->5->NULL
    输出: 5->4->3->2->1->NULL
    进阶:
    你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
 */
/**
Definition for singly-linked list.
 */
class ListNode {
    val: number 
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}
//迭代
function reverseList1(head: ListNode | null): ListNode | null {
  let pre = null;
  while (head) {
    const next: ListNode = head.next!;
    head.next = pre;
    pre = head;
    head = next;  
  };
  return pre;
};


//递归
function reverseList2(head: ListNode | null): ListNode | null {
  return recurse(null, head);
};
function recurse(pre: ListNode | null, cur: ListNode | null): ListNode | null {
  if(!cur) return pre;
  const next = cur.next;
  cur.next = pre;
  return recurse(cur, next);
}




/**
92. 反转链表 II


反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明:
1 ≤ m ≤ n ≤ 链表长度。

示例:

输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
通过次数58,997提交次数116,598

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-linked-list-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 */

function reverseBetween(head: ListNode | null, m: number, n: number): ListNode | null {
  if (head === null || head.next === null) return head;
  if (n === m) return head;

  let beforeNode: ListNode = new ListNode();
  beforeNode.next = head;

  let cur: ListNode | null = head, pre = beforeNode;
  //循环干了两件事：
  //1. 找到要 反转链表的前一个节点，将其赋值给beforeNode，这里是pre，pre需要初始化为beforeNode
  //2. 反转第m~n的链表
  for(let i = 1; cur && i <= n; i++) {
    const tmp: ListNode | null = cur.next;
    if(i === m) beforeNode = pre; 
    else if(i > m) cur.next = pre;
    pre = cur;
    cur = tmp;
  }
  //反转的链表尾是beforeNode.next，需要连接cur
  beforeNode.next!.next = cur;
  //如果m为1，那么反转链表的头pre即为head
  //反之，head还是head，且要连接反转的链表头pre
  if(m === 1) 
    head = pre;
  else 
    beforeNode.next = pre;
  
  return head;
};