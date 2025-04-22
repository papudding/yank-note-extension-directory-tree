import { registerPlugin } from '@yank-note/runtime-api'
import ShowTreeContent from '@/components/ShowTreeContent.vue'
import { generateTreeText } from './file-tree'
import { h } from 'vue'
import i18n from './i18n'

const extensionName = __EXTENSION_ID__

declare type TreeNode = {
  type: 'file' | 'dir';
  mtime?: number | undefined;
  birthtime?: number | undefined;
  marked?: boolean | undefined;
  children?: TreeNode[] | undefined;
  level: number;
  name: string;
  repo: string;
  path: string;
  focused?: boolean | undefined;
}
function findNode (tree: TreeNode[], match: string): TreeNode | undefined {
  if (!tree) {
    return undefined
  }
  for (const node of tree) {
    if (node.name === match) {
      return node
    } else if (node.children) {
      const result = findNode(node.children, match)
      if (result) {
        return result
      }
    }
  }
}

function setLevel (tree: TreeNode[], level: number) {
  for (const node of tree) {
    node.level = level
    if (node.children) {
      setLevel(node.children, level + 1)
    }
  }
}

registerPlugin({
  name: extensionName,
  register (ctx) {
    ctx.tree.tapContextMenus((items, node) => {
      items.push({ type: 'separator' })
      items.push(
        {
          id: `${extensionName}-focus`,
          label: i18n.t('dirTree_focus'),
          onClick: () => {
            const tree = ctx.store.state.tree as TreeNode[]
            const tmpNode = findNode(tree, node.name)
            if (!tmpNode) {
              ctx.ui.useToast().show('warning', i18n.t('dirTree_findNode_fail'))
              return
            }
            if (tmpNode.level !== 1) {
              setLevel([tmpNode], 1)
            }
            tmpNode.focused = true
            ctx.store.state.tree = [tmpNode] as any
          }
        },
      )
      if ((node as TreeNode).focused) {
        items.push(
          {
            id: `${extensionName}-unfocus`,
            label: i18n.t('dirTree_unfocus'),
            onClick: () => {
              ctx.tree.refreshTree()
            }
          }
        )
      }
      if ((node as TreeNode).type === 'dir') {
        items.push(...[
          {
            id: `${extensionName}-dirTree`,
            label: i18n.t('dirTree_showTree'),
            onClick: () => {
              ctx.ui.useModal().alert({
                title: i18n.t('dirTree_showTree'),
                component: h(ShowTreeContent, { content: generateTreeText([node]) }),
                modalWidth: '600px'
              })
            }
          },
          {
            id: `${extensionName}-dirTree-full`,
            label: i18n.t('dirTree_showTree_full'),
            onClick: () => {
              ctx.ui.useModal().alert({
                title: i18n.t('dirTree_showTree_full'),
                component: h(ShowTreeContent, { content: generateTreeText([node], '', true) }),
                modalWidth: '600px'
              })
            }
          }
        ])
      }
    })
  }
})
