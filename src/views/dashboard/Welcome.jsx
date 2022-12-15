import React, { useEffect, useState } from 'react'
import url from '../../config/url'
import req from '../../services/req'
import { Breadcrumb } from 'antd'
// 导入饼状图
import Pie from '@/components/Pie'
// 导入仪表盘图
import Gauge from '../../components/Gauge'
export default function Welcome() {
  const [data, setData] = useState({ accessFrom: [], area: [], gender: [] })
  const loadData = () => {
    req.get(url.userData).then((res) => {
      // console.log(res)
      if (res.data.errNo === 0) {
        setData(res.data.data)
      }
    })
  }
  useEffect(() => {
    // 调用请求方法
    loadData()
    return () => {}
  }, [])
  return (
    <>
      <Breadcrumb style={{ marginButtom: 20 }}>
        <Breadcrumb.Item>管理后台</Breadcrumb.Item>
        <Breadcrumb.Item>欢迎页面</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Gauge></Gauge>
      </div>
      {/* 调用饼状图封装的组件 */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        {/* 访问渠道来源 */}
        {data.accessFrom.length > 0 ? (
          <Pie
            id="Pie1"
            title="访问用户来源渠道分布"
            data={data.accessFrom}
          ></Pie>
        ) : null}
        {/* 访问地区分布 */}
        {data.area.length > 0 ? (
          <Pie id="Pie2" title="访问用户地区分布" data={data.area}></Pie>
        ) : null}
        {/* 访问性别分布 */}
        {data.gender.length > 0 ? (
          <Pie id="Pie3" title="访问用户性别分布" data={data.gender}></Pie>
        ) : null}
      </div>
    </>
  )
}
