import { useAppDispatch, useAppSelector } from '@/store/hook'
import { increment, decrement, asyncIncrement } from '@/store/actions/counter'
import { Button } from 'antd';
const Demo1: React.FC = () => {
  const state = useAppSelector((state) => ({ ...state }))
  const dispatch = useAppDispatch()
  // console.log(state)
  const incrementClick = () => {
    dispatch(increment(1))
  }
  const decrementClick = () => {
    dispatch(decrement(1))
  }
  const asyncIncrementClick = () => {
    dispatch(asyncIncrement(1, 2000))
  }
  return (
    <div>
      <h1>你好，{state.user.username}!</h1>
      <hr />
      <h1>{state.counter}</h1>
      <hr />
      <Button onClick={incrementClick}>加1</Button>
      <Button onClick={decrementClick}>减1</Button>
      <Button onClick={asyncIncrementClick}>异步加1</Button>
    </div>
  )
}
export default Demo1