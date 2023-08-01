//事件总线第三方库：
import mitt from 'mitt';
type ValidateFunc = () => boolean

export const emitter = mitt<{
  formItemCreated: ValidateFunc,
  // optionClick: string | number
}>()