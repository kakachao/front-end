import type { App } from 'vue'
import CInput from './CInput.vue'

CInput.install = (app: App) => {
  app.component(CInput.__name as string, CInput)
}
export default CInput