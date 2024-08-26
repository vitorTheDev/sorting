interface TreeNode<T> {
  val: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

function buildTree<T>(arr: T[]) {
  if (!arr.length) {
    return null
  }

  const middle = Math.floor((arr.length - 1) / 2)
  const node: TreeNode<T> = { val: arr[middle] }

  const leftArr = arr.slice(0, middle)
  const rightArr = arr.slice(middle + 1)

  node.left = buildTree(leftArr)
  node.right = buildTree(rightArr)

  return node;
}

function searchNode<T>(node: TreeNode<T>, value: T): boolean {
  if (!node) {
    return false
  }
  if (value === node.val) {
    return true
  }
  if (value < node.val) {
    return searchNode(node.left, value)
  } else {
    return searchNode(node.right, value)
  }
}

const tree = buildTree([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
console.log(`btree: ${JSON.stringify(tree, null, 2)}`)
console.log(`btree search: ${searchNode(tree, 8)}`)