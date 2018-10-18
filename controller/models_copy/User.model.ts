/* 
 * @Author: 孟闲闲  -- 定义User模型
 * @Date: 2018-10-16 20:10:22 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-18 19:44:25
 */
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
  tableName: 'eyes_users'
})
export default class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    comment: 'user id'
  })
  id: number

  @Column({
    comment: 'user name',
    defaultValue: null
  })
  name: string

  @Column({
    // type: DataType.NUMBER,
    comment: 'user password'
  })
  password: string
}