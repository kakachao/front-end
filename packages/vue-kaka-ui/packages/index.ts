import 'virtual:svg-icons-register'
import type { App, Component } from 'vue'
// import SelectDropTable1 from './select-drop-table1'
// import SelectDropTable2 from './select-drop-table2'
import SvgIcon from './svg-icon'
import SIdentify from './s-identify'
import CBridge from './bridge'
import CButton from './button'
import { Checkbox, CheckboxGroup } from './checkbox'
import CForm from './form'
import CInput from './input'
import CInputNumber from './input-number'
import CModal from './modal'
import CPagination from './pagination'
import CRadioGroup from './radio'
import { CSelect, CSelectOption } from './select'
import CSteps from './steps'
import CTable from './table'
import { CTabs, CTabPane } from './tabs'
import CUpload from './upload'
import ImageViewer from './image-viewer'
import CalendarPicker from './calendar-picker'
import Loading from './loading'
import Message from './message'
import Confirm from './confirm'
// 所有组件列表
const components: {
  [propName: string]: Component
} = {
  // SelectDropTable1,
  // SelectDropTable2,
  SvgIcon,
  SIdentify,
  CBridge,
  CButton,
  Checkbox,
  CheckboxGroup,
  CForm,
  CInput,
  CInputNumber,
  CModal,
  CPagination,
  CRadioGroup,
  CSelect,
  CSelectOption,
  CSteps,
  CTable,
  CTabs,
  CTabPane,
  CUpload,
  ImageViewer,
  CalendarPicker
}
// 定义 install 方法
const install = (app: App) => {
  // 遍历注册所有组件
  for (const key in components) {
    app.component(key, components[key])
  }
}
for (const key in components) {
  console.log(key, 'key')
}
export {
  // SelectDropTable1,
  // SelectDropTable2,
  SvgIcon,
  SIdentify,
  CBridge,
  CButton,
  Checkbox,
  CheckboxGroup,
  CForm,
  CInput,
  CInputNumber,
  CModal,
  CPagination,
  CRadioGroup,
  CSelect,
  CSelectOption,
  CSteps,
  CTable,
  CTabs,
  CTabPane,
  CUpload,
  ImageViewer,
  CalendarPicker,
  Loading,
  Message,
  Confirm
}

export default {
  install
}