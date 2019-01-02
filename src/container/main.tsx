// export { default as Index } from './Main'
// export { default as Login } from './User/login'
// export { default as Register } from './User/register'
// export { default as User } from './User/Person'

import * as React from 'react'
import Left from './Left'
import Article from './Article'
import Banners from './Banners'
import { lefts } from '../common'

export default class Main extends React.Component<{}, {}> {
  state = { type: 'article' }
  choose (type) {
    // 判断在不在lefts
    let isExist = (Object.keys(lefts) as any).includes(type)
    if (!isExist) return
    this.setState({ type })
  }
  render () {
    let { type } = this.state
    return (
      <div>
        <Left />
        {
          type == 'article' && <Article />
        }
        {
          type == 'banner' && <Banners />
        }
      </div>
    )
  }
}