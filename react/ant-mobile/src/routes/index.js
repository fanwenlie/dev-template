import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Homepage from '@/views/Homepage'

import { fetchServerTime } from '@/store/actions'

class IndexRoute extends Component {
  state = {
    logged: true,
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    Promise.all([this.props.fetchServerTime()])
      .then(() => this.setState({ logged: false }))
      .catch(err => console.error(err))
  }

  render() {
    const { logged } = this.state

    if (logged) {
      return <div className="text-center margin-top10">Loading...</div>
    }

    return (
      <>
        <Route
          path="/"
          exact
          component={Homepage}
        />
      </>
    )
  }
}

export default connect(
  null,
  { fetchServerTime },
)(IndexRoute)
