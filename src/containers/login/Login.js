import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { startLogin } from '../../actions/pageAuth'
import { withStyles } from '@material-ui/core'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { errorText: '', valid: false, value: props.value }
  }

  handleSubmit = (event) => {
    if(this.state.valid) {this.props.startLogin(event.target.email.value, event.target.password.value)}
  }
  adminEmail = 'testadmin@aitia.ai'
  emailRegex = "^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"

 
  onChange(event) {
    if (event.target.value.match(this.emailRegex)) {
      this.setState({ errorText: '', valid: true })
    } else {
      this.setState({ errorText: 'Not a valid email address', valid: false })
    }
  }
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
            <TextField name='email' type='text' floatingLabelText='Email' secondary='true' required errorText= {this.state.errorText} onChange={this.onChange.bind(this)} />
            <br />
            <TextField name='password' type='password' floatingLabelText='Password'  required />
          </Grid>
          <Grid item>
            <Button type='submit' label='Login' primary />
          </Grid>
          <Grid item>
            <Typography variant='subtitle1' color='inherit'>
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
  const { pageAuth } = state
  if (pageAuth) {
    return {
      user: pageAuth.user
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
