import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import { clientPublicRoutes, clientPrivateRoutes } from '../../routes/routes'
import { connect } from 'react-redux'
//  import PageHeader from '../../containers/header/Header'
//  import LoadingLayer from '../../components/LoadingLayer'
import classNames from 'classnames'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarVisible: false,
      pathname: this.props.location.pathname
    }
    this.unlistenHistoryChange = null
  }

  render() {
    const isLoggedIn = !!this.props.user

    return (
      <div className='app'>
        React Starter
      </div>
    )
  }
}

App.propTypes = {
  global: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
}

function mapStateToProps(state) {
  const { auth, global } = state
  return {
    user: auth ? auth.user : null,
    global: global || null
  }
}

export default withRouter(connect(mapStateToProps)(App))
