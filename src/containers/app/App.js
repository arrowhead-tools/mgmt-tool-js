import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import dashboardRoutes from '../../routes/routes'
import { connect } from 'react-redux'
import PrivateRoute from '../misc/PrivateRoute'
import { loginSuccess, loginFailure } from '../../actions/pageAuth'
import Notifications from 'react-notification-system-redux'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarVisible: false,
      pathname: this.props.location.pathname
    }
    this.unlistenHistoryChange = null
  }

  componentDidMount() {
    const userData = JSON.parse(window.localStorage.getItem('user'))
    if (userData) {
      this.props.dispatch(loginSuccess(userData))
    }
  }

  render() {
    return (
      <div className='app full-height'>
        <Switch>
          {dashboardRoutes.map((route, i) => (
            <Route key={i} {...route} />
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
  user: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  notifications: PropTypes.array
}

function mapStateToProps(state) {
  const { pageAuth, global, notifications } = state
  return {
    notifications,
    user: pageAuth ? pageAuth.user : null,
    global: global || null
  }
}

export default withRouter(connect(mapStateToProps)(App))
