import * as React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  componentDidMount () {
    // 判断当前用户是否已经登录了
    
  }
  render () {
    return (
      <div className='header'>
        <img src={require('./logo.png')} alt='logo' />
        <Link to='/login'> to Login </Link>
      </div>
    )
  }
}