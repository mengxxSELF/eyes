import * as React from 'react'
import './index.scss'

export default class Header extends React.Component {
  render () {
    return (
      <div className='header'>
        <img src={require('./logo.png')} alt='logo' />
        1234
      </div>
    )
  }
}