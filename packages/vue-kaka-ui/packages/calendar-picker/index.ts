import type { App } from 'vue'
import CalendarPicker from './CalendarPicker.vue'
CalendarPicker.install = (app: App) =>{
  app.component(CalendarPicker.__name as string, CalendarPicker)
}
export default CalendarPicker