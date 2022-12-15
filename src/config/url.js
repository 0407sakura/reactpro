/***
 *  服务端接口地址管理
 *
 *
 *
 */
const prefix = 'https://reactapi.iynn.cn'
const url = {
  // 用户名密码登录
  login: prefix + '/api/common/auth/login',
  // 获取管理员信息
  adminInfo: prefix + '/api/common/auth/adminInfo',
  // 获取用户统计数据
  userData: prefix + '/api/users/statistics/getData',
  // 用户列表
  userList: prefix + '/api/users',
  // 用户操作
  users: prefix + '/api/users',
  // 用户添加
  userAdd: prefix + '/api/users/add'
}
export default url
