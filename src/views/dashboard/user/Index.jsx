import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  Table,
  Tag,
  Space,
  Button,
  message,
  Pagination
} from 'antd'
import url from '@/config/url'
import req from '@/services/req'
import { useHistory } from 'react-router-dom'
// excel导出
import ExportJsonExcel from 'js-export-excel'
import dayjs from 'dayjs'
export default function Index() {
  const [paginate, setPaginate] = useState({})
  const loadData = (page = 1) => {
    req.get(url.userList, { params: { page } }).then((res) => {
      // console.log(res)
      setPaginate(res.data.paginate)
    })
  }
  // 删除数据触发方法
  const del = (record) => {
    // console.log(record)
    req.delete(url.users + '/' + record.id).then((res) => {
      // console.log(res)
      if (res.data.errNo === 0 && res.data.deleted > 0) {
        message.success('删除成功', 0.7, () => {
          window.location.reload()
        })
      }
    })
  }
  // 表格的数据和映射字段数据
  // const dataSource = [
  //   {
  //     key: '1',
  //     name: '胡彦斌',
  //     age: 32,
  //     address: '西湖区湖底公园1号'
  //   },
  //   {
  //     key: '2',
  //     name: '胡彦祖',
  //     age: 42,
  //     address: '西湖区湖底公园1号'
  //   }
  // ]

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      // 列的排列方式
      align: 'center',
      // 列的渲染  text 当前字段的文本  record 当前条记录 index 索引
      render: (text, record, index) => {
        switch (text) {
          case '1':
            return <Tag color="geekblue">男</Tag>
          case '2':
            return <Tag color="pink">女</Tag>
          default:
            return <Tag color="yellow">保密</Tag>
        }
      }
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      align: 'center',
      render: (mobile) => mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      render: (email) => email.replace(/^(\w{1})\w{2}/, '$1***')
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text, record, index) => {
        return text === '1' ? (
          <Tag color="green">正常</Tag>
        ) : (
          <Tag color="red">禁用</Tag>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text, record, index) => {
        return (
          <Space>
            <Button type="dashed">编辑</Button>
            <Button type="primary" danger onClick={() => del(record)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  useEffect(() => {
    loadData()
    return () => {}
  }, [])
  const history = useHistory()
  // 导出excel并下载
  const downloadExcel = () => {
    // 表格数据
    const datas = paginate.data ? paginate.data : '' //表格数据
    // console.log(datas)
    // return
    var option = {}
    let dataTable = []
    // datas 完整的一页数据  data 每条数据
    if (datas) {
      datas.forEach((data) => {
        let obj = {
          id: data.id,
          username: data.username,
          gender: data.gender,
          mobile: data.mobile,
          email: data.email,
          userStatus: data.status,
          time: dayjs().format('YYYY-MM-DD hh:mm:ss')
        }
        dataTable.push(obj)
      })
    }
    // console.log(dataTable)
    // return
    // excel表格的配置
    option.fileName = '用户数据'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        // sheetFilter: [id, username, mobile, email, userStatus],
        sheetHeader: [
          '用户id',
          '用户名',
          '性别',
          '手机号',
          '邮箱',
          '用户状态',
          '导出时间'
        ]
      }
    ]

    var toExcel = new ExportJsonExcel(option)
    toExcel.saveExcel()
  }
  return (
    <div>
      <Breadcrumb style={{ marginButtom: 20 }}>
        <Breadcrumb.Item>管理后台</Breadcrumb.Item>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      </Breadcrumb>
      <Button
        onClick={() => history.push('/dashboard/user/add')}
        type="primary"
      >
        添加用户
      </Button>
      <Button onClick={downloadExcel} type="primary" danger>
        导出数据
      </Button>
      {/* dataSource 数据源  columns 字段映射 */}
      {/* rowKey 每一个行的唯一值key row 每一个数据对象  这里取数据的id为唯一值 */}
      <Table
        rowKey={(row) => row.id}
        dataSource={paginate.data}
        columns={columns}
        pagination={false}
      />
      {/* 注意Table组件内置的为前端分页  这里来实现服务端后端分页 */}
      {/*
         分页 当数据无法一次性加载渲染时,就需要进行分页操作
              加载渲染太多数据,会造成页面的卡顿
         前端分：一次性从服务端获取数据,分批渲染  请求一次  截取渲染数据的方式
                 slice  splice  
         后端分：根据传递页码数 从服务端按需加载每页的数据  请求多次  每次按需请求并返回  
                 服务端截取从数据库取出的数据组数据  php java
                 查询数据的时候就分页查询  
                 sql语法中 limit(跳过几条,取几条)
                 mongo语法 db.users.find().skip(跳过几条).limit(取几条)
      */}
      {/* 
         defaultCurrent 默认选中页码
         current 当前选中页码
         total 总数据量
         onChange 当页面点击切换时触发 
      */}
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          defaultCurrent={1}
          current={paginate.current_page}
          total={paginate.total}
          onChange={(page) => loadData(page)}
        />
      </div>
    </div>
  )
}
