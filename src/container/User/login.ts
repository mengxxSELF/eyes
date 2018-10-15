/*
 * @Author: mxx 表单登录
 * @Date: 2018-10-16 00:13:34 
 * @Last Modified by:   mxx 
 * @Last Modified time: 2018-10-16 00:13:34 
 */
import * as React from 'react'
import './index'
export default class Login extends React.Component {
  render () {
    return (
      <div>
          <input type='username' />
          <input type='password' />
      </div>
    )
  }
}