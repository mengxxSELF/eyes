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

启动方式

```js
npm run start
```

本地开发

```js
npm run devts
```
打包

```js
npm run buildts
```

#### 掉坑记录

* 无法使用webpack-dev-server

![server](https://user-gold-cdn.xitu.io/2018/10/16/1667c69b5b9ea73b?w=1234&h=392&f=png&s=95865)

需要安装 @types/webpack-dev-server

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

* postcss.config.js

在module 有用  postcss 的时候，记得添加一个 postcss.config.js 文件

不然会报错

```js
Cannot find module 'autoprefixer'
```

### other

把 react 等包依赖的 TypeScript 声明"@types/***"也放在 dependencies 里面，是因为虽然这些类型声明依赖不会被打包到最后的运行代码中

### webpack 基本配置完毕之后 将其调整为ts版本

之前代码参见 origin 分支

参考文章，[官网地址](https://webpack.docschina.org/configuration/configuration-languages/#typescript)

#### 储备知识

* [ts-node](https://www.npmjs.com/package/ts-node)

可以直接运行.ts文件 

* [ts版本使用方式见官网](https://webpack.docschina.org/configuration/configuration-languages/#typescript)

##### 掉坑记录

* es5

tsconfig.webpack.json中的配置直接按照官网中去写的

```js
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "esModuleInterop": true
  }
}
```

![](https://user-gold-cdn.xitu.io/2018/10/11/166612210267f4d1?w=1340&h=256&f=png&s=57116)

这里配置的是es5 将其调整为es6即可

或者使用 [webpack-merge](https://webpack.docschina.org/guides/production/#%E9%85%8D%E7%BD%AE) 进行模块合并

```js
  
const config: Configuration = merge(commonPlugin, {...})

```

* 关于 import 模块

项目中保留了一份 webpack.common.js的文件，发现在 import 模块的时候 会先找到 这个.js的 而不是 .ts

```js
import commonPlugin from './webpack.common'
```

ts.config 中有一个 allowJs 参数 如果设置为TRUE 则可以引入js文件 但是这个默认的是FALSE 所以应该不会有引入 js文件

所以很奇怪 - [文档](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

暂时将js文件名修改了

* import path from 'path'

发现在代码中 引入 path 会有提示 没有默认导出

可以调整 

```js
import * as path from 'path'
```

或者调整 tsconfig 参数

```js
    "moduleResolution": "node",
```



### 调整 server 中使用 routing-controllers 

之前代码参见 ts 分支

[routing-controllers](https://juejin.im/repo/5a7cab975188250cabc90fd0#working-with-json)

#### 掉坑记录

* 在 controller index.ts 中

```js
const app = createKoaServer({
  controllers: ['./*.ts'],
})
```

![](https://user-gold-cdn.xitu.io/2018/10/11/16662603f700e205?w=956&h=240&f=png&s=46549)

不明白为什么会找到外部的文件

暂时调整为指定的 main 

```js
const app = createKoaServer({
  controllers: ['./main.js'],
})
```

然而这么写了之后依旧有问题 main.js文件不会被正确加载进来

需要使用绝对路径处理才可以

```js
const app = createKoaServer({
  controllers: [path.resolve(__dirname, `./module/*.js`)],
})
```

* 不能使用 @render 

```js
  @Get('/')
  @Render('index')
  async index (
    @HeaderParam('device') device: string
  ) {
    console.log('device')
    return {
      title: 'i am title'
    }
  }
```

这样写了之后 后面的代码就无法运行了

[同事有提出这个问题](https://blog.jiasm.org/2018/08/26/TypeScript%E5%9C%A8react%E9%A1%B9%E7%9B%AE%E4%B8%AD%E7%9A%84%E5%AE%9E%E8%B7%B5/)

### 添加mysql配置

#### 本地安装

本地安装mysql,从官网下载并一路OK之后，到启动mysql阶段

* 环境变量的设置

命令行输入

```js
mysql -uroot -p
```

提示

```js
zsh: commod not found
```
需要将mysql添加到系统环境变量中

```js
cd /usr/local/mysql/bin
vim ~/.bash_profile

//添加

# mysql

export PATH=$PATH:/usr/local/mysql/bin
```

保存之后执行 source ~/.bash_profile （相当于重启）

关于环境变量部分知识 可阅读 [《Linux - 环境配置文件》](https://juejin.im/post/5b87a160e51d4538b2048fe0#heading-71)

但是一旦新开一个窗口执行mysql 依旧提示 zsh: commod not found 


因为安装zsh，~/.bash_profile就不会被执行

所以需要将刚刚的环境变量 也添加到  ~/.zshrc 才可以

* 链接mysql

在命令行输入

```js
mysql -uroot -p
```

然后提示

![mysql](https://user-gold-cdn.xitu.io/2018/10/12/16666d75c9ce2602?w=690&h=56&f=png&s=11738)

-------- --------

更换本地mysql安装方式

使用brew 安装

注意有的Mac可以直接使用 

```js
brew install mysql
```

但是我的一直安装失败，查阅资料发现，是因为系统没有升级，所以不能这么处理 需要指定安装mysql的版本

```js
brew search mysql

brew install mysql@5.7

brew services start mysql@5.7
```

安装之后启动时mysql

```
mysql.server start
```

关于其中会一直报错 命令找不到，需要调整 全局变量 修改了两个文件 

```
export PATH="/usr/local/opt/mysql@5.7/bin:$PATH"
```


登录mysql

```
mysql -u root -p
```
这个方式是需要输入 mysql 密码的，但是我注意到安装mysql的时候 有提示密码是什么。。。 


更换登录方式

```
mysql -u root mysql
```
这个命令虽然可以登录，但是我们想使用sequel pro 本地连接一，还是需要密码的，所以找了一个重置密码的方式

[参考文章](https://www.cnblogs.com/jiuyi/p/6211271.html)

```js
// 停止mysql
mysql.server stop

// 进入安全模式

sudo mysqld_safe --skip-grant-tables

// 登录mysql
mysql -u root mysql

// 切换数据库
use mysql; 

// 修改 密码 -- 密码字段为 authentication_string

UPDATE mysql.user SET authentication_string=PASSWORD('mypassword') where User='root';

// 刷新权限，使配置生效

flush privileges;

// 启动 MySQL

mysql.server start
```

总结一下，就是修改 mysql 库的user表中 User 为 root 的 authentication_string 字段值


#### 服务器安装

服务器安装就不要按照本地安装的套路，而是使用Linux自带的安装包工具 yum

[参考文章](https://blog.csdn.net/z13615480737/article/details/78906598)

##### 本地连接服务器上的mysql数据库

* 在服务器上的处理

1 登录数据库

```js
mysql -u root -p;
```

2 使用数据库 

```js
use mysql;
```

3 显示库中数据表
```js
show tables;
```

4 看下user表 中的信息

```js
select * from user \G;
```

\G 可以将返回的信息 改变格式 以树形结构返回 便于查看信息

[参考文章](https://blog.csdn.net/u011479200/article/details/78511073)

[参考文章](http://www.runoob.com/mysql/mysql-install.html)


5 在user表中添加一个 host 值为 % 的 用户 root -- 用于进行本地连接服务器 

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123' WITH GRANT OPTION;

* 使用sequel pro 连接

有三种链接方式
![](https://user-gold-cdn.xitu.io/2018/10/15/16675baf4f3d4b94?w=1132&h=754&f=png&s=83507)

我们需要使用的是 第三个 ssh 

![](https://user-gold-cdn.xitu.io/2018/10/15/16675bbb3b2ac661?w=974&h=1094&f=png&s=115070)

就相当于 ssh 登录到服务器之后 在去登录mysql

所以上部分填写mysql的信息 下部分是填写服务器的信息 

在填写上部分mysql信息的时候 host 使用的是 127.0.0.1  但是不可以使用localhost

![mysql](https://user-gold-cdn.xitu.io/2018/10/15/16675d5a5e3ded78?w=798&h=394&f=png&s=103861)

#### 项目中链接mysql库

```js
const mysql = require('mysql')

const mysqlConfig: MysqlConfig = {
  host: ['127.0.0.1'], // 网址ip
  port: 3306,  // 端口
  user: 'root',  // 用户
  password: '5211314mxx', // 密码
  database: 'activity', // 数据库
  key: 'mysql',
}
const pool = mysql.createPool(mysqlConfig)

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}
```

[参考文章](https://www.jianshu.com/p/dda014fbc2d8)

#### 调整为 sequelize 

不仅仅需要安装 sequelize 还需要 mysql2

![sequelize]](https://user-gold-cdn.xitu.io/2018/10/16/1667ca3eb19e8427?w=1186&h=230&f=png&s=47489)

```js
const Sequelize = require("sequelize")

const sequelizeObject = new Sequelize('activity', 'root', '5211314mxx', {
  host: 'localhost',    //数据库地址,默认本机
  port: '3306',
  dialect: 'mysql',
  pool: {   //连接池设置
    max: 5, //最大连接数
    min: 0, //最小连接数
    idle: 10000
  },
})

// 定义模型
const User = sequelizeObject.define('eyes_users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING(100), // 用户名
  password: Sequelize.INTEGER(100) // 密码
}, {
  timestamps: false
})

```

##### 调整为 sequelize-typescript 

sequelize-typescript


有的时候发现一直调试代码但是还是报错，可能是因为 你的旧代码文件没有删除 所以将scripts 调整为

```js
  "start": "rm -fr router; nodemon router/index.js",
```

每次重启自动删除文件夹



### 目前有坑

1 webpack-dev-sever 无法和后台服务保持一致

2 返回读取的文件内容 无法render到页面中

3 cons 没有什么用

