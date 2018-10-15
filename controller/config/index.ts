interface MysqlConfig {
  key: string
  host: Array<string>
  user: string
  password: string
  database: string
  port: number
}

export const mysqlConfig: MysqlConfig = {
  host: ['127.0.0.1'], // 网址ip
  port: 3306,  // 端口
  user: 'root',  // 用户
  password: '5211314mxx', // 密码
  database: 'activity', // 数据库
  key: 'mysql',
}