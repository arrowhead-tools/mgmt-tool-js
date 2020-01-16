import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import { dashboardRoutes, clientPublicRoutes } from '../../routes/routes'
import { connect } from 'react-redux'
import Notifications from 'react-notification-system-redux'
import PrivateRoute from '../misc/PrivateRoute'

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
    return (
      <div className="app full-height">
        <Switch>
          {clientPublicRoutes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
          {dashboardRoutes.map((route, i) => (
            <PrivateRoute key={i} {...route} />
          ))}
        </Switch>
        <Notifications notifications={this.props.notifications} />
      </div>
    )
  }
}

App.propTypes = {
  global: PropTypes.object,
  dispatch: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  notifications: PropTypes.array
}

function mapStateToProps(state) {
  const { global, notifications } = state
  return {
    notifications,
    global: global || null
  }
}

export default withRouter(connect(mapStateToProps)(App))
