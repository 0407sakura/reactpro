import React from 'react'
import { Tabs, Card } from 'antd'
import '@/assets/scss/Login.scss'
import UserLogin from './UserLogin'
import MobileLogin from './MobileLogin'
export default function Login() {
  return (
    <div className="container">
      <h2>数据中台运营系统</h2>
      <Card style={{ width: '25%' }}>
        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              label: '用户名登录',
              key: '1',
              children: <UserLogin />
            },
            {
              label: '手机号登录',
              key: '2',
              children: <MobileLogin />
            }
          ]}
        />
      </Card>
    </div>
  )
}
