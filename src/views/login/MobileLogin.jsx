import { useState } from 'react'
import { Button, Form, Input, Space } from 'antd'
import { UserOutlined, VerifiedOutlined } from '@ant-design/icons'
import { message } from 'antd'
export default function UserLogin() {
  const [sendText, setSendText] = useState('发送验证码')
  const [isClick, setIsClick] = useState(false)
  const onFinish = (values) => {}
  // 生成form实例
  const [form] = Form.useForm()
  // 发送验证码
  const sendSMSCode = () => {
    // 调用服务端提供的接口传递手机号过去
    const mobile = form.getFieldsValue().mobile
    // 1、校验手机号是否合法
    if (/^1[3-9]\d{9}$/.test(mobile)) {
      // 2、发送请求服务端 发送给对应手机号验证码
      console.log(mobile + '已经发送验证码')
      setIsClick(true)
      // 3、倒计时操作  倒计时完毕后 重置按钮为可以点击
      let time = 60
      let counter = setInterval(() => {
        // 没执行一次扣除1s
        setSendText('重新获取(' + time-- + 's)')
        // console.log('倒计时:', time)
        if (time <= 0) {
          // 清除定时器
          clearInterval(counter)
          // 重置为点击
          setIsClick(false)
          // 重置按钮的显示内容
          setSendText('发送验证码')
        }
      }, 1000)
    } else {
      message.error('请输入正确的手机号', 1.5)
    }
  }
  return (
    // form 表单组件
    <Form onFinish={onFinish} form={form}>
      {/* 一个表单项 */}
      {/*  rule 校验规则  */}
      <Form.Item
        name="mobile"
        rules={[
          {
            required: true,
            message: '请输入手机号!'
          }
        ]}
      >
        <Input size="large" prefix={<UserOutlined />} placeholder="手机号" />
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
        <Button
          disabled={isClick}
          onClick={sendSMSCode}
          size="large"
          style={{ background: '#006666', color: 'white' }}
        >
          {sendText}
        </Button>
      </Space>
      <Form.Item>
        <Button block size="large" type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
