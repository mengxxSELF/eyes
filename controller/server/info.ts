/*
 * @Author: 孟闲闲 - 补充身份信息
 * @Date: 2018-10-18 16:49:45 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-19 18:39:18
 */

import { Controller, Post, Body, Get, Param } from "routing-controllers"
// 使用Info模型处理 
import { Info } from '../models' 

import { bodyConfig } from 'server'

@Controller()
export default class {
  @Post('/info')
  async add(
    @Body() info: any
  ) {
    const { id: userId, birthday} = info
    // console.log(userId, birthday)
    // 增加数据 或者 调整
    let body: bodyConfig 
    await Info.upsert({
      birthday,
      userId
    }, {
      fields: ['birthday']
    }).then(() => {
      body = { code: 200, message: 'success' }
    }).catch(() => {
      body = { code: 500, message: 'failture' }
    })
    return body
  }


  /**
   * @api {get} /group 获取用户参与组
   * @apiExample {curl} Example usage:
   *    curl -i localhost:7777/group/2
   * @apiName remove
   * @apiGroup users 用户组
   * 
   * @apiSuccess {Number} code 200 success 500 failture
  */
  @Get('/group/:groupid')
  async group(
    @Param('groupid') groupid:number
  ){
    // 连表查询


  }

}