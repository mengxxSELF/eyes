import * as React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  state = { login: false }
  componentDidMount () {
    // 判断当前用户是否已经登录了
    const jwtTpken = localStorage.getItem('jwt')
    if (jwtTpken) {
      this.setState({ login: true })
    }
  }
  componentWillReceiveProps () {

  }
  render () {
    const { login } = this.state
    return (
      <div className='header'>
        {
          login ? <Link to='/user'> 个人中心 </Link> : <Link to='/register'> 注册/登录 </Link>
        }
        
        <div className='logo'>
          <img src={require('./logo.png')} alt='logo' />
        </div>
      </div>
    )
  }
}