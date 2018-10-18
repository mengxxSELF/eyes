/*
 * @Author: 孟闲闲   eyes_info 
 * @Date: 2018-10-18 11:09:18 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-18 11:13:13
 */
import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  tableName: 'eyes_info'
})
export default class Info extends Model<Info> {
  @Column({
    primaryKey: true,
    comment: 'info id'
  })
  id: number

  @Column({
    comment: 'user id'
  })
  userId: number

  @Column({
    comment: 'birthday'
  })
  birthday: string
}

