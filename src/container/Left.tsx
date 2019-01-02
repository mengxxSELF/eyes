
import * as React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

import { lefts } from '../common'

export default class Left extends React.Component {
  render () {
    return (
      <div className='left'>
        {
          Object.keys(lefts).map((item, index) => {
            return <Link to={item} key={index}> <Icon type="align-right" /> {lefts[item]}  </Link>
          })
        }
      </div>
    )
  }
}