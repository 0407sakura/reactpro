import axios from 'axios'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
class Captcha extends Component {
  state = {
    key: '',
    img: ''
  }
  static propTypes = {
    type: PropTypes.string
  }
  static defaultProps = {
    type: 'math'
  }
  componentDidMount() {
    this.loadData()
  }
  // 请求获取验证码
  loadData = () => {
    // console.log(this.props)
    axios
      .get('https://reactapi.iynn.cn/captcha/api/' + this.props.type)
      .then((res) => {
        const { key, img } = res.data
        // console.log(res.data)
        this.setState({ key, img })
        // 存储到redux的store中
        this.props.saveKey(key)
      })
  }
  render() {
    return (
      <img
        style={{ cursor: 'pointer' }}
        src={this.state.img}
        alt=""
        onClick={this.loadData}
      />
    )
  }
}
function mapStateToProps(state) {
  return { state }
}
const mapDispatchToProps = {
  saveKey(payload) {
    return {
      type: 'saveKey',
      payload
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Captcha)
