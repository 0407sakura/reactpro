import React from 'react'
import { Button, Form, Input, message, Select } from 'antd'
import { LockOutlined, UserOutlined, VerifiedOutlined } from '@ant-design/icons'
import url from '@/config/url'
import req from '@/services/req'
import { useHistory } from 'react-router-dom'
export default function Add() {
  const history = useHistory()
  const onFinish = (values) => {
    // console.log(values)
    req.post(url.userAdd, values).then((res) => {
      // console.log(res)
      if (res.data.errNo === 0) {
        message.success('添加用户成功', 0.7, () => {
          history.push('/dashboard/user/index')
        })
      } else {
        message.error('添加用户失败', 0.7, () => {
          window.locaction.reload()
        })
      }
    })
  }
  return (
    <div style={{ width: '30%' }}>
      <Form onFinish={onFinish}>
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
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: '请输入邮箱!'
            }
          ]}
        >
          <Input
            size="large"
            prefix={<VerifiedOutlined />}
            placeholder="邮箱"
          />
        </Form.Item>
        <Form.Item label="性别" name="gender">
          <Select>
            <Select.Option value="1">男</Select.Option>
            <Select.Option value="2">女</Select.Option>
            <Select.Option value="3">保密</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="mobile"
          rules={[
            {
              required: true,
              message: '请输入手机号!'
            }
          ]}
        >
          <Input
            size="large"
            prefix={<VerifiedOutlined />}
            placeholder="手机号"
          />
        </Form.Item>
        <Form.Item>
          <Button block size="large" type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
