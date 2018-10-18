/*
 * @Author: 孟闲闲  -- utils中所有项目的声明文件
 * @Date: 2018-10-18 17:33:55 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-18 17:38:32
 */


// 加密解密 encode 的声明文件
export type decodeConfig = (password: string) => string 

// jwt 的声明文件
export type jwtConfig = (params: string) => string | any