import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogin } from '../../actions/actionCreators'

class Login extends Component {
  onSubmit = values => {
    this.props.dispatch(startLogin(values.email, values.password))
  }

  render() {
    const { user } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/home' } }

    if (user) {
      return (
        <Redirect to={from} push />
      )
    }

    return (
      <div>TODO: Niki</div>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  location: PropTypes.object
}

function mapStateToProps(state) {
  const { auth } = state
  if (auth) {
    return {
      user: auth.user
    }
  }
  return {
    user: null
  }
}

export default connect(mapStateToProps)(Login)
