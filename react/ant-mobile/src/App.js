import React, { Component } from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'

import IndexRoute from './routes'

import './styles/App.less'


class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Router>
          <Switch>
            <IndexRoute />
          </Switch>
        </Router>
      </>
    )
  }
}

export default App
