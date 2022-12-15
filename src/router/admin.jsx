import { Switch, Route, useLocation } from 'react-router-dom'
// import Welcome from '@/views/dashboard/Welcome'
// import User from '@/views/dashboard/user/Index'
// import Film from '@/views/dashboard/film/Index'
import { lazy, Suspense, useEffect } from 'react'
import Loading from '@/components/Loading'
import 'animate.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

// 路由懒加载导入组件
const Welcome = lazy(() => import('@/views/dashboard/Welcome'))
const User = lazy(() => import('@/views/dashboard/user/Index'))
const UserAdd = lazy(() => import('@/views/dashboard/user/Add'))
const Film = lazy(() => import('@/views/dashboard/film/Index'))
const Cinema = lazy(() => import('@/views/dashboard/cinema/Index'))
export default function Admin() {
  const loc = useLocation()
  // const his = useHistory()
  // 路由配置中 进行拦截
  // const PreCheck = () => {
  //   // 是否有token
  //   if (!localStorage.getItem('token')) {
  //     message.error('请先登录', 1, () => {
  //       his.push('/login')
  //     })
  //     return
  //   }
  // }
  useEffect(() => {
    // 调用检测
    // PreCheck()
    return () => {}
  }, [])

  return (
    // 切换组件加载的过渡组件
    <Suspense fallback={<Loading />}>
      {/* 嵌套路由 */}
      <TransitionGroup>
        <CSSTransition
          timeout={700}
          classNames={{
            enterActive: 'animate__animated animate__fadeIn',
            exitActive: 'animate__animated animate__fadeOut'
          }}
          key={loc.pathname}
        >
          <Switch>
            <Route path="/dashboard/welcome" component={Welcome}></Route>
            <Route path="/dashboard/user/index" component={User}></Route>
            <Route path="/dashboard/user/add" component={UserAdd}></Route>
            <Route path="/dashboard/film/index" component={Film}></Route>
            <Route path="/dashboard/cinema/index" component={Cinema}></Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Suspense>
  )
}
