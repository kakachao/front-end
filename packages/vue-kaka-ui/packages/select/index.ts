import type { App } from 'vue'
import CSelect from './CSelect.vue'
import CSelectOption from './CSelectOption.vue'

CSelect.install = (app: App) => {
  app.component(CSelect.__name as string, CSelect)
}
CSelectOption.install = (app: App) => {
  app.component(CSelectOption.__name as string, CSelectOption)
}


export { CSelect, CSelectOption }
