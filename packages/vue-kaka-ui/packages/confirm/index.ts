import { createVNode, render } from 'vue'
import Confirm from './Confirm.vue'

interface ConfirmProps {
  title?: string;
  content?: string;
  onOk?(): void;
  onCancel?(): void;
}
// 创建一个挂载点
const div = document.createElement('div')
document.body.appendChild(div)

const renderConfirm = (type, options: ConfirmProps) => {
  const submitCallback = () => {
    options.onOk && options.onOk()
    render(null, div)
  }
  // 点击取消按钮
  const cancelCallback = () => {
    options.onCancel && options.onCancel()
    render(null, div)
  }
  const vnode = createVNode(Confirm, { type, submitCallback, cancelCallback, title: options.title, content: options.content })
  render(vnode, div)
}

export default {
  error: (options: ConfirmProps) => {
    renderConfirm('error', options)
  },
  warn: (options: ConfirmProps) => {
    renderConfirm('warn', options)
  },
  success: (options: ConfirmProps) => {
    renderConfirm('success', options)
  },
  info: (options: ConfirmProps) => {
    renderConfirm('info', options)
  },
}
