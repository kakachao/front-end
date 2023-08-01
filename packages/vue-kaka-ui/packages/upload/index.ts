import type { App } from 'vue'
import CUpload from './CUpload.vue'

CUpload.install = (app: App) => {
  app.component(CUpload.__name as string, CUpload)
}

export default CUpload