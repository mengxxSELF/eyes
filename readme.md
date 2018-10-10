### eyes

#### 技术框架

* react

* typescript

* webpack4


#### 项目信息

*  服务器地址

  47.104.231.146

* 端口

  6666



#### 掉坑记录

* hot属性

![](https://user-gold-cdn.xitu.io/2018/10/10/1665d123038aa2af?w=796&h=319&f=png&s=100094)

在webpack4中 webpack-dev-server的 hot 属性已经被废弃了

```js
 devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: 'localhost',
    hot: true,
    inline: true,
    port: 7777,
    before: function (app) {
      console.log('devserver')
    }
  },
```

将 hot 属性删除

可以直接配置在命令中

```js
"dev": "webpack-dev-server --open --hot --config webpack.dev.js --mode development"
```

* 模块找不到

![](https://user-gold-cdn.xitu.io/2018/10/10/1665d0f686710ad9?w=1304&h=612&f=png&s=169032)

解决方案 webpack - reaolve

```js
  extensions: ['.ts', '.tsx', '.json'], 
```

调整为

```js
  extensions: ['.ts', '.tsx', '.json', 'js'], 
```

* extract-text-webpack-plugin

使用 extract-text-webpack-plugin 来拆分css

但是一直在报错

![](https://user-gold-cdn.xitu.io/2018/10/10/1665da25b54385b8?w=721&h=78&f=png&s=16040)

参考 [issue](https://github.com/webpack/webpack/issues/6568)

安装

```
npm install --save-dev extract-text-webpack-plugin@next
```

或者更换为 [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)

这个使用起来更加方便

```js
{
  test: /\.s?css$/,
  use: [MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'sass-loader']
}

------

new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
})

```

