import { useAppSelector } from '@/store/hook'
const Demo2: React.FC = () => {
  const counter = useAppSelector((state) => state.counter)
  return (
    <div>
      <hr />
      <div>{counter}</div>
    </div>
  )
}
export default Demo2