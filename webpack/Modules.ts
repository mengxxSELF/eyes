// const ExtractTextPlugin = require("extract-text-webpack-plugin")
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
  rules: [
    // 处理css
    {
      test: /\.s?css$/,
      use: [MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'sass-loader']
      // use: ExtractTextPlugin.extract({
      //   fallback: 'style-loader',
      //   use: ['css-loader', 'postcss-loader', 'sass-loader']
      // })
      // use: [
      //   'style-loader',
      //   {
      //     loader: 'css-loader'
      //   },
      //   {
      //     loader: 'postcss-loader'
      //   },
      //   {
      //     loader: 'sass-loader',
      //   }
      // ]
    },

    // 处理tsx
    {
      test: /\.(ts|tsx)?$/,
      // include: /src/,
      use: [
        {
          loader: 'ts-loader',
        }
      ]
    },

    // 处理JSon文件
    {
      test: /\.json$/,
      use: ['json-loader']
    },

    // 处理图片
    {
      test: /\.(png|jpg|jpeg|gif|svg)/,
      use: {
        loader: 'url-loader',
        options: {
          outputPath: 'images/', // 图片输出的路径
          limit: 5 * 1024
        }
      }
    },
    
  ]
}