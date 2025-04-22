export function generateTreeText (data, prefix = '', full = false) {
  let result = ''

  data.forEach((item, index) => {
    if (!full) {
      if (item.type !== 'dir' && item.name.indexOf('.md') < 0) {
        return ''
      } else if (item.type === 'dir' && item.name === 'FILES') {
        return ''
      }
    }

    const isEnd = index === data.length - 1
    const currentPrefix = isEnd ? '└─ ' : '├─ '

    // 添加当前节点
    result += prefix + currentPrefix + item.name + '\n'

    // 递归处理子节点
    if (item.children) {
      const childPrefix = prefix + (isEnd ? '   ' : '│  ')
      result += generateTreeText(item.children, childPrefix, full)
    }
  })

  return result
}
