import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import { ChromeFilled } from '@ant-design/icons'
const Container = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default function Loading(props) {
  return (
    <Container>
      <Spin size="large" tip={props.tip}></Spin>
      {/* <Spin
        size="large"
        indicator={
          <ChromeFilled
            style={{
              fontSize: 30,
              color: 'red'
            }}
            spin
          />
        }
      ></Spin> */}
    </Container>
  )
}
// props类型约束
Loading.propTypes = {
  tip: PropTypes.string.isRequired
}
// 默认值
Loading.defaultProps = {
  tip: '加载中...'
}
