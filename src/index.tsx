import * as React from 'react'
import * as ReactDOM from "react-dom"
import { Route, Switch, HashRouter } from 'react-router-dom'
import './index.scss'

// import { Index, Login, Register, User } from './container'
import Index from './container/main'
// import Banners from './container/Banners'

class Main extends React.Component {
  componentDidMount () {
    // 处理rem布局
    const deviceWidth = document.body.clientWidth
    const ratio = 100 * deviceWidth / 750
    document.documentElement.style.fontSize = ratio + 'px'
  }
  render () {
    return (
      <HashRouter>
        <Switch>
          {/* <Route path='/register' component={Register} /> */}
          {/* <Route path='/login' component={Login} /> */}
          <Route path='/' component={Index} />
        </Switch>
      </HashRouter>
    )
  }
}

const rootDom = document.querySelector('#app') as HTMLElement

ReactDOM.render(<Main />, rootDom)