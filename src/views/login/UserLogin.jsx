import React from 'react'
import { Button, Form, Input, Space, message } from 'antd'
import { LockOutlined, UserOutlined, VerifiedOutlined } from '@ant-design/icons'
import Captcha from '@/components/Captcha'
import url from '@/config/url'
import req from '@/services/req.js'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
export default function UserLogin() {
  // 生成ref
  // const ref = createRef()
  // react-redux hook 调用获取redux的state
  // redux中state通过immutable生成的map对象保存数据 所有再转为JS对象进行数据调用
  const key = useSelector((state) => state.toJS().key)
  const history = useHistory()
  const onFinish = (values) => {
    // 用户名:admin  密码:123456
    // 通过ref获取子组件实例并调用组件的key参数
    req
      // .post(url.login, { ...values, key: ref.current.state.key })
      .post(url.login, { ...values, key })
      .then((res) => {
        // console.log(res)
        if (res.data.errNo === 0) {
          // 存储登录后的信息并提示
          const { jwt, acl, expire } = res.data.context
          localStorage.setItem('token', jwt)
          localStorage.setItem('acl', JSON.stringify(acl))
          localStorage.setItem('expire', expire)
          message.success('登录成功', 1.5, () => {
            history.replace('/dashboard/welcome')
          })
        } else {
          message.error(res.data.errText, 1.5, () => {
            // 失败刷新页面
            // history.replace('/login')
            window.location.reload()
          })
        }
      })
  }
  return (
    // form 表单组件
    <Form onFinish={onFinish}>
      {/* 一个表单项 */}
      {/*  rule 校验规则  */}
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名!'
          }
        ]}
      >
        <Input size="large" prefix={<UserOutlined />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码!'
          }
        ]}
      >
        <Input
          size="large"
          prefix={<LockOutlined />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Space align="baseline">
        <Form.Item
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码!'
            }
          ]}
        >
          <Input
            size="large"
            prefix={<VerifiedOutlined />}
            placeholder="验证码"
          />
        </Form.Item>
        {/* 调用图片验证码 */}
        {/* 绑定ref */}
        {/* <Captcha ref={ref}></Captcha> */}
        <Captcha></Captcha>
      </Space>
      <Form.Item>
        <Button block size="large" type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
