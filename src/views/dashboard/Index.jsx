import React, { useState, useEffect } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AreaChartOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  TwitterOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, Popconfirm } from 'antd'
import '../../assets/css/Dashboard.css'
import url from '@/config/url'
import req from '@/services/req'
import { message } from 'antd'
import { useLocation, useHistory } from 'react-router-dom'
// 导入路由配置
import Routes from '@/router/admin'
// 导入必须在最上面
const { Header, Sider, Content, Footer } = Layout
export default function Index() {
  // 控制左侧菜单  隐藏 显示
  const [collapsed, setCollapsed] = useState(false)
  const [accountInfo, setAccountInfo] = useState({
    username: '',
    last_ip: '',
    last_login_addr: {}
  })
  const [items, setItems] = useState([])
  const history = useHistory()
  // 将菜单图标存储为一个数组
  const icons = [
    <AreaChartOutlined />,
    <UserOutlined />,
    <VideoCameraOutlined />,
    <UploadOutlined />,
    <TwitterOutlined />
  ]
  // 菜单结构处理函数
  const parseItems = () => {
    let acl = JSON.parse(localStorage.getItem('acl'))
    // console.log(acl)
    let items = acl.map((item, index) => {
      // 判断是否具有二级菜单
      if (item.children.length > 0) {
        let temp = item.children.map((item1) => {
          if (item1.is_nav === 1) {
            return {
              key: item1.auth_path,
              icon: icons[index],
              label: item1.auth_name,
              onClick: () => {
                history.push(item1.auth_path)
              }
            }
          }
          return null
        })
        return {
          key: item.auth_path,
          icon: icons[index],
          label: item.auth_name,
          children: temp
        }
      } else {
        return {
          key: item.auth_path,
          icon: icons[index],
          label: item.auth_name,
          onClick: () => {
            history.push(item.auth_path)
          }
        }
      }
    })
    // console.log(items)
    // 设置更新后的菜单
    setItems(items)
  }
  const location = useLocation()
  // 获取路径并设置给选中菜单  打开菜单和选中菜单
  const defaultSelectedKeys = [location.pathname]
  const defaultOpenKeys = [location.pathname.replace('/index', '')]
  useEffect(() => {
    // 判断没有token就不要发请求了
    if (localStorage.getItem('token')) {
      req.get(url.adminInfo).then((res) => {
        // console.log(res)
        if (res.data.errNo !== 0) {
          message.error('请先登录', 1, () => {
            history.push('/login')
            localStorage.removeItem('acl')
            localStorage.removeItem('token')
            localStorage.removeItem('expire')
          })
        } else {
          setAccountInfo(res.data.accountInfo)
        }
      })
    } else {
      message.error('请先登录', 1, () => {
        history.push('/login')
        localStorage.removeItem('acl')
        localStorage.removeItem('token')
        localStorage.removeItem('expire')
      })
    }
    // 获取服务端的数据 根据acl菜单权限列表组合菜单数据
    // 判断没有acl列表就不遍历菜单
    if (localStorage.getItem('acl')) {
      parseItems()
    }
    return () => {}
    // useEffect 第三段 如果监控的state或者props变化时 才会执行useEffect
  }, [])
  const logout = () => {
    localStorage.removeItem('acl')
    localStorage.removeItem('token')
    localStorage.removeItem('expire')
    message.success('退出登录成功!', 1, () => {
      history.push('/login')
    })
  }
  return (
    <>
      {/* 整个布局 */}
      <Layout>
        {/* 左侧 */}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="logo"></div>
            {collapsed ? null : (
              <h2 style={{ color: 'white' }}>
                数据中台
                <br />
                管理系统
              </h2>
            )}
          </div>
          {/* defaultSelectedKeys 默认选中高亮的菜单 */}
          {/* item菜单配置项 key 匹配选中哪个菜单唯一值  icon 小图标  label 菜单名称  chidren 子菜单 下级菜单 */}
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={defaultOpenKeys}
            defaultSelectedKeys={defaultSelectedKeys}
            items={items}
          />
        </Sider>
        {/* 右侧 */}
        <Layout className="site-layout">
          {/* 头部 */}
          <Header
            className="site-layout-background"
            style={{
              padding: 0
            }}
          >
            {/* {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed)
              }
            )} */}
            {collapsed ? (
              <MenuUnfoldOutlined
                className="trigger"
                onClick={() => setCollapsed(!collapsed)}
              ></MenuUnfoldOutlined>
            ) : (
              <MenuFoldOutlined
                className="trigger"
                onClick={() => setCollapsed(!collapsed)}
              ></MenuFoldOutlined>
            )}
            {/* 登录信息 */}
            <span>
              欢迎登录【{accountInfo.username}】 上次登录IP为:
              {accountInfo.last_ip} 上次登录地址:
              {accountInfo.last_login_addr.state} 运营商:
              {accountInfo.last_login_addr.isp}
            </span>
            <Popconfirm
              title="忍心退出吗?"
              onConfirm={logout}
              okText="立即退出"
              cancelText="等一会儿"
            >
              <Button type="primary" style={{ marginLeft: 10 }}>
                注销
              </Button>
            </Popconfirm>
          </Header>
          {/* 主体 */}
          <Content
            className="site-layout-background mymain"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280
            }}
          >
            {/* 调用路由配置 */}
            <Routes></Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            数据中台运营系统 ©2022 Power by TY-HTML5-JY-2204
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}
