import axios from 'axios'
// axios.defaults = {
//   baseURL: 'https://reactapi.iynn.cn'
// }
axios.interceptors.request.use((cfg) => {
  // 统一携带token并请求
  let token = localStorage.getItem('token')
  if (token) {
    cfg.headers.Authorization = token
  }
  return cfg
})

axios.interceptors.response.use((res) => {
  try {
    // 将返回的token进行存储
    if (res.data.context.expire && res.data.context.jwt) {
      // console.log('统一存储设置token')
      localStorage.setItem('expire', res.data.context.expire)
      localStorage.setItem('token', res.data.context.jwt)
    }
  } catch (e) {
    // console.log(e)
  }
  return res
})

export default axios
