import { LOGIN, LOGOUT } from "../contant";
import type { User } from "@/interface";
export const login = (data: User) => ({ type: LOGIN, data })
export const logout = () => ({ type: LOGOUT })