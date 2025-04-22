
/** @deprecated 这个函数已弃用 */
function addDirTreeDom (content) {
  // 设置目录树相关的样式
  const treeNodeDomList = document.getElementsByClassName('tree-node')
  if (treeNodeDomList.length === 0) {
    return
  }
  const treeNode = treeNodeDomList[0]
  const details = treeNode.children[0]

  details.setAttribute('style', 'overflow: auto; height: 100%;')

  // 构建目录树dom
  const titleDiv = document.createElement('div')
  titleDiv.innerHTML = '目录树'
  titleDiv.className = 'dir-tree-title'

  const contentDiv = document.createElement('div')
  contentDiv.className = 'dir-tree-content'
  contentDiv.innerHTML = '<pre>' + content + '</pre>'

  // 获取aside
  const list = document.getElementsByClassName('side')
  if (list.length === 0) {
    return
  }
  const aside = list[0]
  // 删除之前的dom
  const legacyDoms: any[] = []
  for (let i = 0; i < aside.children.length; i++) {
    const child = aside.children[i]
    if (child.className === 'dir-tree-title' || child.className === 'dir-tree-content') {
      legacyDoms.push(child)
    }
  }
  if (legacyDoms.length > 0) {
    for (let i = 0; i < legacyDoms.length; i++) {
      legacyDoms[i].remove()
    }
  }

  // 添加新的dom
  aside.appendChild(titleDiv)
  aside.appendChild(contentDiv)
}

/** @deprecated 这个函数已弃用 */
function clearDirTreeDom () {
  // 获取aside
  const list = document.getElementsByClassName('side')
  if (list.length === 0) {
    return
  }
  const aside = list[0]
  // 删除之前的dom
  const legacyDoms: any[] = []
  for (let i = 0; i < aside.children.length; i++) {
    const child = aside.children[i]
    if (child.className === 'dir-tree-title' || child.className === 'dir-tree-content') {
      legacyDoms.push(child)
    }
  }
  if (legacyDoms.length > 0) {
    for (let i = 0; i < legacyDoms.length; i++) {
      legacyDoms[i].remove()
    }
  }
}

// ctx.theme.addStyles(`
//     .side {
//       display: flex;
//       flex-direction: column;
//     }
//     .side .tree-node {
//       height: 70%;
//     }
//     .side .tree-node .name{
//       height: 100%;
//       overflow: auto;
//     }
//     .side .dir-tree-title {
//       border-bottom: 1px solid #ccc;
//       border-top: 1px solid #ccc;
//       height: 4%;
//       line-height: 30px;
//       font-size: 14px;
//       text-align: center;
//       color: var(--g-color-20);
//     }
//     .side .dir-tree-content {
//       height: 25%;
//     }
//     .side .dir-tree-content > pre {
//       font-size: 14px;
//       height: 100%;
//       overflow: auto;
//     }
//   `)
