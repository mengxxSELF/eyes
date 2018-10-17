import webpack from 'webpack'
import CleanPlugin from 'clean-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'
import UglifyjsWebpackPlugin from 'uglifyjs-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'

export default [
  // clearn
  new CleanPlugin(
    'dist/*', 
    {
      verbose: false, 
      root: process.cwd()
    }
  ),
  // 压缩
  new UglifyjsWebpackPlugin(),
  // css
  // new ExtractTextPlugin({
  //   filename: 'index.css',
  //   disable: false,
  //   allChunks: true
  // }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
  // 合并CSS与js到 html
  new HtmlPlugin({
    filename: 'index.html',
    template: './index.html'
  }),

  // hot
  new webpack.HotModuleReplacementPlugin()
]