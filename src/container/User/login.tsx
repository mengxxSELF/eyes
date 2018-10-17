/*
 * @Author: mxx 表单登录
 * @Date: 2018-10-16 00:13:34 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-17 19:18:48
 */
import * as React from 'react'
import './index.scss'
import { userLogin } from '../server'

export default class Login extends React.Component {
  login () {
    // 点击登录
    const name = (this.refs.name as HTMLInputElement).value
    const password = (this.refs.password as HTMLInputElement).value
    if (!name || !password) return
    userLogin(name, password).then(() => {
      // 进入网站首页
      location.hash = '/'
    })
  }
  render () {
    return (
      <div className='users'>
        <div className='loginBox'>
          <input placeholder='请输入用户名' ref='name' type='username' />
          <input placeholder='请输入密码' ref='password' type='password' />
          <button onClick={() => this.login()} > 登录 </button>
        </div>
      </div>
    )
  }
}