
import { createVNode, render } from "vue";
import CMessage from "./CMessage.vue";

const div = document.createElement('div')
// 添加到body上
document.body.appendChild(div)

// 定时器标识
let timer: any = null

// 渲染虚拟dom
const renderMessage = (vnode: any, timeout: number) => {
  render(null, div);
  render(vnode, div);
  clearTimeout(timer);
  timer = setTimeout(() => {
    render(null, div);
  }, timeout);
};

export const MESSAGE_TIMEOUT = 2000;
export default {
  error: (text: string, timeout: number = MESSAGE_TIMEOUT) => {
    const vnode = createVNode(CMessage, { type: "error", text, timeout });
    renderMessage(vnode, timeout);
  },
  warn: (text: string, timeout: number = MESSAGE_TIMEOUT) => {
    const vnode = createVNode(CMessage, { type: "warn", text, timeout });
    renderMessage(vnode, timeout);
  },
  success: (text: string, timeout: number = MESSAGE_TIMEOUT) => {
    const vnode = createVNode(CMessage, { type: "success", text, timeout });
    renderMessage(vnode, timeout);
  },
  info: (text: string, timeout: number = MESSAGE_TIMEOUT) => {
    const vnode = createVNode(CMessage, { type: "info", text, timeout });
    renderMessage(vnode, timeout);
  },
};

