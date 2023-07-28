import { INCREMENT, DECREMENT } from '../contant/index'
import type { Dispatch, AnyAction } from 'redux'
export const increment = (data: number) => ({ type: INCREMENT, data })
export const decrement = (data: number) => ({ type: DECREMENT, data })
export const asyncIncrement = (data: number, time: number): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    setTimeout(() => {
      dispatch(increment(data));
    }, time)
  }
}
