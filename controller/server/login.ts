import { Controller, Render, Get, HeaderParam, Param, QueryParam, Ctx, ContentType } from "routing-controllers"
import fs from 'fs'
import path from 'path'
import cons from 'consolidate'
// Sequelize - model
import {User} from '../models'

// md5加密解密
import {encode} from '../utils'
import { bodyConfig } from 'server'

// jwt
import {dealJwt} from '../utils'

const { encodeJwt, decodeJwt } = dealJwt

// text/html  直接修改文件的content-type 类型

@Controller()
export default class {
  @Get('/')
  @ContentType('text/html')
  async index (
    @HeaderParam('device') device: string,
  ) {
    // console.log('// COMBAK: ')
    // console.log(path.resolve(__dirname, '../../dist/index.html'))
    return cons.swig(path.resolve(__dirname, '../../dist/index.html'))
    // const body = fs.readFileSync(path.resolve('dist', 'index.html'))
    // const body = fs.readFileSync(path.resolve('dist', 'index.html'), 'utf-8')
    // return body
    // return 200
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
      // 生成jwt
      const jwtToken = encodeJwt(name)

      bodyObj = {
        code: 200,
        message: '登录成功',
        jwtToken
      }
    } else {
      bodyObj = {
        code: 500,
        message: '登录失败'
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
    let bodyObj: bodyConfig

    try {
      await User.create({
        name,
        password: encodePwd
      })

      // 生成jwt
      const jwtToken = encodeJwt(name)

      bodyObj = {
        code: 200,
        message: '注册成功',
        jwtToken
      }
    } catch (e) {
      bodyObj = {
        code: 500,
        message: '注册失败'
      }
    }

    return bodyObj
  }

  /**
   * @api {get} /remove 用户注销信息
   * @apiExample {curl} Example usage:
   *    curl -i localhost:7777/remove/1
   * @apiName remove
   * @apiGroup users 用户组
   *
   * @apiSuccess {Number} code 200 success 500 failture
  */
  @Get('/remove/:id')
  async remove (
    @Param('id') id: any
  ) {
    console.log('wwww  ------- wwww', id, typeof id)
    let body: bodyConfig
    await User.destroy({
      where: {id}
    }).then(() => {
      body = { code: 200, message: 'success' }
    }).then(() => {
      body = { code: 500, message: 'failture' }
    })
    return body
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
