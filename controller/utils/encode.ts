/*
 * @Author: 孟闲闲 用户密码加密解密
 * @Date: 2018-10-17 14:28:57 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-17 16:23:06
 */

import crypto from 'crypto' 
import { decodeConfig } from 'utils'

const secret: string = 'mxx'

/** 
* md5加密 
* @param password 需要加密的字符串
* @returns string 
*/

let decodeFn: decodeConfig
decodeFn = (password: string): string => {
  let hmac = crypto.createHmac('md5', secret)
  // crypto.createHash('md5')创建一个md5加密的hash，因为创建的md5加密只能对每个加密字符串使用一次，所以需要每次加密的时候都创建一个新的md5加密块
  // update告诉md5加密需要对哪个字符串进行加密
  // 调用digest()对update传入的字符串或者二进制数据进行加密，可以传入加密后显示的格式作为参数，可接受的参数：hex(16进制)、base64(base64格式)等，一般选用的是hex格式，一旦调用了digest之后，这个md5加密串就完成使命了，再次调用md5.update或者digest都会提示错误
  return hmac.update(password).digest('base64')
}

export default decodeFn