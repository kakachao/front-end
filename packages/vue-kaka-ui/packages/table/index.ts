import type { App } from 'vue'
import CTable from './CTable.vue'

CTable.install = (app: App) => {
  app.component(CTable.__name as string, CTable)
}
export default CTable