/*
 * @Author: mxx 表单注册
 * @Date: 2018-10-16 00:13:34 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-19 19:10:33
 */
import * as React from 'react'
import './index.scss'
import { userRegister } from '../server'

export default class Login extends React.Component {
  register () {
    // 点击注册
    const name = (this.refs.name as HTMLInputElement).value
    const password = (this.refs.password as HTMLInputElement).value
    if (!name || !password) return
    userRegister(name, password).then((data) => {
      // console.log('data', data)
      // 将 jwt 存入 localStorage
      localStorage.setItem('jwt', data)
      // 进入网站首页
      location.hash = '/'
    })
  }
  render () {
    return (
      <div className='users'>
        <div className='loginBox'>
          <input placeholder='请输入用户名' ref='name' />
          <input placeholder='请输入密码' ref='password' />
          <button onClick={() => this.register()} > 注册 </button>
        </div>
      </div>
    )
  }
}