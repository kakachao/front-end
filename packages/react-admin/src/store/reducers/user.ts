import { LOGIN, LOGOUT } from "../contant";
import type { User } from "@/interface";

type Acion = { type: string, data: User }
const initialState: User = {
  username: '',
  password: '',
}
export default function user(preState = initialState, action: Acion) {
  const { type, data } = action
  switch (type) {
    case LOGIN:
      localStorage.setItem('token', 'admin')
      return {
        ...preState,
        username: data.username,
        password: data.password
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...preState,
        username: '',
        password: ''
      }
    default:
      return preState;
  }
}