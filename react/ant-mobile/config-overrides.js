/* eslint-disable import/no-extraneous-dependencies */
const {
  override, fixBabelImports, addLessLoader, overrideDevServer,
} = require('customize-cra')

const theme = require('./theme')

const devServerConfig = () => config => ({
  ...config,
  proxy: {},
})

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      // style: 'css',
      style: true, // use less for customized theme
    }),
  
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: theme,
    }),
  ),
  devServer: overrideDevServer(
    devServerConfig(),
  ),
}
