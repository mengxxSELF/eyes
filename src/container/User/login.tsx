/*
 * @Author: mxx 表单登录
 * @Date: 2018-10-16 00:13:34 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-10-16 13:47:53
 */
import * as React from 'react'
import './index.scss'

export default class Login extends React.Component {
  login () {

  }
  render () {
    return (
      <div className='login'>
        <input type='username' />
        <input type='password' />
        <button> login </button>
      </div>
    )
  }
}