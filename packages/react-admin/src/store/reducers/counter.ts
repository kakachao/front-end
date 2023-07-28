import { INCREMENT, DECREMENT } from '../contant/index'

const initialState = 1
type Acion = { type: string, data: number }
export default function counter(preState = initialState, action: Acion) {
  const { type, data } = action
  switch (type) {
    case INCREMENT:
      return preState + data;
    case DECREMENT:
      return preState - data;
    default:
      return preState;
  }
}