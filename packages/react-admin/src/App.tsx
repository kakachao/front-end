import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import router from './router'
import { useEffect } from 'react'
import { message } from 'antd'
function ToLogin() {
  const navagate = useNavigate()
  useEffect(() => {
    navagate('/login')
    message.warning("您还没有登录，请登录后在访问！")
  }, [])
  return <div></div>
}
function ToHome() {
  const navagate = useNavigate()
  useEffect(() => {
    navagate('/demo1')
  }, [])
  return <div></div>
}
function BeforeRouterEnter() {
  const outlet = useRoutes(router)
  const location = useLocation()
  const token = localStorage.getItem('token') || ''
  /*
    后台管理系统两种经典的跳转情况
    1.访问登陆页面 有token 跳转到首页
    2.访问其它页面 没有token 跳转到登录页
  */
  if (location.pathname === '/login' && token) {
    //这里不能直接用useNavigate来实现跳转
    return <ToHome />
  } else if (location.pathname !== '/login' && !token) {
    return <ToLogin />
  }
  return outlet
}

function App() {
  return (
    <div className="App">
      <BeforeRouterEnter />
    </div>
  );
}

export default App;
