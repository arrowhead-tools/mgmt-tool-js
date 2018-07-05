import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Typography from '@material-ui/core/Typography'
import { startLogin } from '../../actions/auth'

class Login extends Component {
  handleSubmit = (event) => {
    this.props.startLogin(event.target.email.value, event.target.password.value)
  }

  adminEmail = 'testadmin@aitia.ai'

  render() {
    const { user } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    if (user) {
      return (
        <Redirect to={from} push />
      )
    }

    return (
      <form className='login full-height' onSubmit={this.handleSubmit}>
        <img src={require('../../assets/img/arrowhead_logo.png')} />
        <Grid container direction='column' spacing={16}>
          <Grid item>
            <TextField name='email' type='string' floatingLabelText='Email' secondary='true' required />
            <br />
            <TextField name='password' type='password' floatingLabelText='Password' required />
          </Grid>
          <Grid item>
            <RaisedButton type='submit' label='Login' primary />
          </Grid>
          <Grid item>
            <Typography variant='subheading' color='inherit'>
              If you are unable to sign in, please contact your local cloud administrator: {this.adminEmail}
            </Typography>
          </Grid>
        </Grid>
      </form>
    )
  }
}

Login.propTypes = {
  startLogin: PropTypes.func,
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

function mapDispatchToProps(dispatch) {
  return {
    startLogin: (email, password) => {
      dispatch(startLogin(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
