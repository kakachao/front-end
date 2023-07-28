
import { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Home from "@/components/home"
const Login = lazy(() => import('@/pages/login'))
const Demo1 = lazy(() => import('@/pages/demo/demo1'))
const Demo2 = lazy(() => import('@/pages/demo/demo2'))
const Demo301 = lazy(() => import('@/pages/demo/demo3/demo301'))
const Demo302 = lazy(() => import('@/pages/demo/demo3/demo302'))
const Demo303 = lazy(() => import('@/pages/demo/demo3/demo303'))
const Demo401 = lazy(() => import('@/pages/demo/demo4/demo401'))
const Demo402 = lazy(() => import('@/pages/demo/demo4/demo402'))
const Error404 = lazy(() => import('@/pages/error/404'));



const withLoadingComponent = (comp: JSX.Element) => (
  <Suspense fallback={<div>loading...</div>}>
    {comp}
  </Suspense>
)

const routes = [
  {
    path: '/',
    element: <Navigate to="/demo1" />
  },
  {
    path: '/login',
    element: withLoadingComponent((<Login />))
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'demo1',
        element: withLoadingComponent((<Demo1 />))
      }, 
      {
        path: 'demo2',
        element: withLoadingComponent((<Demo2 />))
      },
      {
        path: 'demo3/demo301',
        element: withLoadingComponent((<Demo301 />))
      },
      {
        path: 'demo3/demo302',
        element: withLoadingComponent((<Demo302 />))
      },
      {
        path: 'demo3/demo303',
        element: withLoadingComponent((<Demo303 />))
      },
      {
        path: 'demo4/demo401',
        element: withLoadingComponent((<Demo401 />))
      },
      {
        path: 'demo4/demo402',
        element: withLoadingComponent((<Demo402 />))
      },
      {
        path: '*',
        element: withLoadingComponent((<Error404 />))
      },
    ]
  }
]
export default routes