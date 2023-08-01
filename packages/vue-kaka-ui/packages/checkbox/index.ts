import type { App } from 'vue'
import Checkbox from './Checkbox.vue'
import CheckboxGroup from './CheckboxGroup.vue'

Checkbox.install = (app: App) => {
  app.component(Checkbox.__name as string, Checkbox)
}

CheckboxGroup.install = (app: App) => {
  app.component(CheckboxGroup.__name as string, CheckboxGroup)
}
export {
  Checkbox,
  CheckboxGroup
}