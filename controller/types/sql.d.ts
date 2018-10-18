export type MysqlConfig = {
  dialect: string
  host: Array<string>
  user: string
  password: string
  database: string
  port: number,
  pool?: any,
  logging?: boolean,
  modelPaths?: Array<string> 
}
