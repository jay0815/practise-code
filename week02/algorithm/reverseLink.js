var reverseList = function(head) {
  let link = null;
  const dfs = (node) => {
    if (node.next) {
      let n = dfs(node.next);
      node.next = null; // 断开连接
      n.next = node;
      n = n.next;
      return n;
    } else {
      link = node;
      return node;
    }
  }
  // 递归栈 保存 数据
  head && dfs(head);
  return link;
};