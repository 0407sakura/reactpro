import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './views/login/Login'
import Dashboard from './views/dashboard/Index'
import './assets/css/App.css'
export default function App() {
  useEffect(() => {
    document.title = '数据中台运营系统'
    return () => {}
  }, [])

  return (
    <div>
      <Switch>
        <Redirect from="/" to="/login" exact></Redirect>
        <Route path="/login" component={Login}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
      </Switch>
    </div>
  )
}
