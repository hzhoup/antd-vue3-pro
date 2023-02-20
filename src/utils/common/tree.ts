interface flatTree {
  id: number
  parentId: number
  children?: flatTree[]
}

/**
 * 扁平化树结构转树
 */
export function listToTree(list: flatTree[], parentId = -1) {
  const result: flatTree[] = []
  for (const node of list) {
    if (node.parentId === parentId) {
      const children = listToTree(list, node.id)
      if (children.length) node.children = children
      result.push(node)
    }
  }
  return result
}

/**
 * 查找第一个树叶节点
 * @param branch 树枝
 */
export function findFirstLeaves(branch: flatTree) {
  return branch.children?.length ? findFirstLeaves(branch.children[0]) : branch
}
