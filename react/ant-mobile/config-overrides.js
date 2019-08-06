/* eslint-disable import/no-extraneous-dependencies */
const {
  override, fixBabelImports, addLessLoader, overrideDevServer, addWebpackAlias,
} = require('customize-cra')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const theme = require('./theme')

const isProduction = process.env.NODE_ENV === 'production'

const devServerConfig = () => config => ({
  ...config,
  proxy: {
    // '/apis': {
    //   target: 'xxxx',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/apis': '',
    //   },
    // },
  },
})

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      // style: 'css',
      style: true, // use less for customized theme
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, './src'),
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: theme,
    }),
    // 自定义配置
    config => {
      config.output.publicPath = isProduction ? './' : '/'

      if (isProduction) {
        const plugins = config.plugins.filter(plugin => !(plugin instanceof HtmlWebpackPlugin))
        /**
         * 修改HtmlWebpackPlugin配置, 输出index.html改成index.htm
         * 以下除template、filename自定义修改，其他配置字段均为create-react-app eject后的配置
         * 
         * 还有另外一种方式：package.json中，scripts字段修改为：
         * "build": "react-app-rewired build && mv build/index.html build/index.htm",
         */
        plugins.push(
          new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.htm',
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }),
        )
        return { ...config, plugins }
      }
      
      return config
    },
  ),
  devServer: overrideDevServer(
    devServerConfig(),
  ),
}
