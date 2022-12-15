// 配置信息可以参考：https://www.npmjs.com/package/customize-cra
const {
  override,
  disableEsLint,
  addWebpackAlias,
} = require('customize-cra')
const path = require('path')

module.exports = override(
  // 在webpack中禁用eslint
  disableEsLint(),

  // 添加webpack别名
  addWebpackAlias({
    // 添加路径对@符号的支持
    ['@']: path.resolve('./src')
  })
)
