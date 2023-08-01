import CButton from "./lib/packages/button/CButton.vue"
import CBridge from "./lib/packages/bridge/CBridge.vue"
import CalendarPicker from "./lib/packages/calendar-picker/CalendarPicker.vue"
import Checkbox from "./lib/packages/checkbox/Checkbox.vue"
import CheckboxGroup from "./lib/packages/checkbox/CheckboxGroup.vue"
import CForm from "./lib/packages/form/CForm.vue"
import ImageViewer from "./lib/packages/image-viewer/ImageViewer.vue"
import CInput from "./lib/packages/input/CInput.vue"
import CInputNumber from "./lib/packages/input-number/CInputNumber.vue"
import CModal from "./lib/packages/modal/CModal.vue"
import CPagination from "./lib/packages/pagination/CPagination.vue"
import CRadioGroup from "./lib/packages/radio/CRadioGroup.vue"
import SIdentify from "./lib/packages/s-identify/SIdentify.vue"
import CSelect from "./lib/packages/select/CSelect.vue"
import CSteps from "./lib/packages/steps/CSteps.vue"
import SvgIcon from "./lib/packages/svg-icon/SvgIcon.vue"
import CTable from "./lib/packages/table/CTable.vue"
import CTabs from "./lib/packages/tabs/CTabs.vue"
import CTabPane from "./lib/packages/tabs/CTabPane.vue"
import CUpload from "./lib/packages/upload/CUpload.vue"

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CButton: typeof CButton;
    CBridge: typeof CBridge;
    CalendarPicker: typeof CalendarPicker;
    Checkbox: typeof Checkbox;
    CheckboxGroup: typeof CheckboxGroup;
    CForm: typeof CForm;
    ImageViewer: typeof ImageViewer;
    CInput: typeof CInput;
    CInputNumber: typeof CInputNumber;
    CModal: typeof CModal;
    CPagination: typeof CPagination;
    CRadioGroup: typeof CRadioGroup;
    SIdentify: typeof SIdentify;
    CSelect: typeof CSelect;
    CSteps: typeof CSteps;
    SvgIcon: typeof SvgIcon;
    CTable: typeof CTable;
    CTabs: typeof CTabs;
    CTabPane: typeof CTabPane;
    CUpload: typeof CUpload;
  }
}
export { }