import type { App } from 'vue'
import CButton from './CButton.vue'
// 使用install方法，在app.use挂载
CButton.install = (app: App) => {
  app.component(CButton.__name as string, CButton)
}
export default CButton