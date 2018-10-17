import { Controller, Render, Get, HeaderParam, Param, QueryParam } from "routing-controllers"
import fs from 'fs'
import path from 'path'

// Sequelize
import { Sequelize } from 'sequelize-typescript'
import User from '../models/User'

// md5加密解密
import {encode} from '../utils'
import { bodyConfig } from 'server'

// jwt
import {dealJwt} from '../utils'
const { encodeJwt, decodeJwt } = dealJwt

// const sequelizeObject = new Sequelize({
//   database: 'activity',
//   dialect: 'mysql',
//   username: 'root',
//   password: '5211314mxx',
//   logging: false // 控制台不要输出 mysql 语句
//   // modelPaths: [__dirname + '/models']
// })
// 以上可以简写
const sequelizeObject = new Sequelize('mysql://root:5211314mxx@127.0.0.1/activity')
sequelizeObject.addModels([path.resolve(__dirname, `../models/`)])

@Controller()
export default class {
  @Get('/')
  async index (
    @HeaderParam('device') device: string
  ) {
    const body = fs.readFileSync(path.resolve('dist', 'index.html'))
    return body
  }

  /**
   * @api {get} /login 用户登录
   * @apiExample {curl} Example usage:
   *    curl -i localhost:7777/login?name=tom&password=123
   * @apiName login
   * @apiGroup users 用户组
   * 
   * @apiParam {Number} name 用户名
   * @apiParam {Number} password 用户密码
   * @apiSuccess {Number} code 200 success 500 failture
  */

  @Get('/login')
  async user(
    @QueryParam('name') name: string,
    @QueryParam('password') password: string,
  ) {

    // 密码加密处理
    const encodePwd = encode(password)

    // 首先判断用户是否存在当前表中
    const isUser = await isExist(name)
    if (!isUser) return { code: 400, msg: '该用户名不存在' }

    // 判断用户名 与 密码 对应规则是否一致
    const user = await User.findOne({
      where: {
        name
      },
      attributes: ['password']
    })

    const {password: secret} = user

    // console.log(encodePwd, 'encodePwd', secret)
    
    let bodyObj: bodyConfig 
    if (encodePwd == secret) {
      
      bodyObj = {
        code: 200,
        messgae: '登录成功',
        jwtToken
      }
    } else {
      bodyObj = {
        code: 500,
        messgae: '登录失败'
      }
    }

    return bodyObj
  }

  /**
   * @api {get} /register 用户注册
   * @apiExample {curl} Example usage:
   *    curl -i localhost:7777/register?name=tom&password=123
   * @apiName register
   * @apiGroup users 用户组
   * 
   * @apiParam {Number} name 用户名
   * @apiParam {Number} password 用户密码
   * @apiSuccess {Number} code 200 success 500 failture
  */
 
  @Get('/register')
  async insertUser (
    @QueryParam('name') name: string,
    @QueryParam('password') password: string
  ) {
    // 首先判断用户是否存在当前表中
    const isUser = await isExist(name)
    if (isUser) return {code: 400, msg: '该用户名已存在'}

    // 密码加密处理
    const encodePwd = encode(password)

    // 接受到 name 和  password 放入mysql库
    try {
      await User.create({
        name,
        password: encodePwd
      })

      // 生成jwt 
      const jwtToken = encodeJwt(name)

      return {
        code: 200,
        jwtToken
      }
    } catch (e) {
      return {
        code: 500
      }
    }
  }
}


/**
 *
 * isExist 判断该用户名字是否已经存在
 * @param {string} name
 * @returns
 */
async function isExist (name: string) {
  const end = await User.findOne({
    where: {
      name
    }
  })
  return end
}