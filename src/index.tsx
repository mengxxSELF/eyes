import * as React from 'react'
import * as ReactDOM from "react-dom"
import { Route, Switch, HashRouter } from 'react-router-dom'
import './index.scss'

import {Index, Login} from './container'

class Main extends React.Component {
  render () {
    return (
      <HashRouter>
        <Route path='/' component={Index} />
        <Route path='/login' component={Login} />
      </HashRouter>
    )
  }
}

const rootDom = document.querySelector('#app') as HTMLElement

ReactDOM.render(<Main />, rootDom)