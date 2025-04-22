import { ctx } from '@yank-note/runtime-api'

export default ctx.i18n.createI18n({
  en: {
    dirTree_focus: 'focus',
    dirTree_unfocus: 'unfocus',
    dirTree_showTree: 'show tree',
    dirTree_showTree_full: 'show tree(full)',
    dirTree_findNode_fail: 'find node fail',
  },
  'zh-CN': {
    dirTree_focus: '聚焦',
    dirTree_unfocus: '取消聚焦',
    dirTree_showTree: '目录树',
    dirTree_showTree_full: '目录树（完整）',
    dirTree_findNode_fail: '查找节点失败',
  },
})
