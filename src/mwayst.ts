
function splitInChunks<T>(arr: T[], size = 5) {
  const results: T[][] = []
  let curr = 0
  while (curr < arr.length) {
    results.push(arr.slice(curr, curr + size))
    curr += size
  }
  return results
}

interface TreeNode<T> {
  values: T[];
  children?: TreeNode<T>[];
}

function createNode<T>(values: T[] = [], children: TreeNode<T>[] = []) {
  return {
    values, children,
  } as TreeNode<T>
}

function buildTree<T>(arr: T[], nodeSize = 5) {
  if (!arr.length) {
    return null
  }

  const middle = Math.floor((arr.length - 1) / 2)
  const low = Math.max(middle - Math.floor((nodeSize - 1) / 2), 0)
  const high = Math.min(middle + Math.floor((nodeSize - 1) / 2), arr.length - 1)
  const values = arr.slice(low, high)

  const node = createNode(values)

  const leftArr = arr.slice(0, low)
  const rightArr = arr.slice(high + 1)

  splitInChunks<T>(leftArr, Math.max(Math.floor(leftArr.length / 5), nodeSize))
    .map(chunk => buildTree<T>(chunk, nodeSize))
    .forEach(tree => node.children.push(tree))
  splitInChunks<T>(rightArr, Math.max(Math.floor(rightArr.length / 5), nodeSize))
    .map(chunk => buildTree<T>(chunk, nodeSize))
    .forEach(tree => node.children.push(tree))

  return node;
}

function searchNodeValues<T>(node: TreeNode<T>, value: T): boolean {
  if (!node) {
    return false
  }
  for (const val of node.values) {
    if (value === val) {
      return true
    }
  }
  return false
}

function searchNode<T>(node: TreeNode<T>, value: T): boolean {
  if (!node?.values?.length) {
    return false
  }
  if (searchNodeValues(node, value)) {
    return true
  }

  if (!node.children?.length) {
    return false
  }
  const middle = Math.ceil((node.children.length - 1) / 2)
  const middleChildren = node.children[middle]
  if (!middleChildren?.values?.length) {
    return false
  }
  if (value < middleChildren.values[0]) {
    for (const nd of node.children.slice(0, middle)) {
      if (searchNode(nd, value)) {
        return true
      }
    }
  } else if (value > middleChildren.values[middleChildren.values.length - 1]) {
    for (const nd of node.children.slice(middle + 1)) {
      if (searchNode(nd, value)) {
        return true
      }
    }
  } else {
    return searchNodeValues(middleChildren, value)
  }
  return false
}

const tree = buildTree([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
console.log(`m-way tree: ${JSON.stringify(tree, null, 2)}`)
console.log(`m-way search: ${searchNode(tree, 8)}`)
// const largeTest = Array(10000).fill(null).map(_ => randomInt(100000))
// largeTest.push(80)
// const tree2 = buildTree(largeTest.sort((a, b) => a - b), 30);
// (async () => {
//   const { writeFile } = await import('fs/promises')
//   await writeFile('bla.json', JSON.stringify(tree2, null, 2))
// })()
// console.log(`largeMWAY: ${searchNode(tree2, 80)}`)
// console.log(splitInChunks([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2))