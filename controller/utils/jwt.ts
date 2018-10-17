/*
 * @Author: 孟闲闲   jwt 加密解密
 * @Date: 2018-10-17 19:31:26 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-17 19:41:49
 */
import jwt from 'jsonwebtoken'
import moment from 'moment'

const SECRET = 'mxx'

/**
 * encodeJwt 生成jwt
 *
 * @param {string} username
 */
const encodeJwt = (username: string) => {
  let expTime = moment().add(50, 'minutes').unix()
  let token = jwt.sign({
    name: username,
    exp: expTime
  }, SECRET)
  return token
}

/**
 * decodeJwt 解密jwt
 *
 * @param {string} username
 */
const decodeJwt = (token: string) => {
  let result = jwt.verify(token, SECRET)
  let exp = (result as any).exp
  // 当前时间戳
  const nowTime = moment().unix()
  if (exp < nowTime) {
    // 已过期
    return false
  } 
  return result
}

export default {
  encodeJwt,
  decodeJwt
}