import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogin } from '../../actions/actionCreators'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from '../../theme/theme.js'
import Grid from '@material-ui/core/Grid';
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
const admin_email = "testadmin@aitia.ai"

class Login extends Component {
  handleSubmit = values => {
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
      <MuiThemeProvider muiTheme={muiTheme}>
    <form onSubmit={this.handleSubmit}>
    <div style={{textAlign: "center", padding: 70}}>
        <Grid container direction="column" spacing= {16}>
        <Grid item xs={12}>
                <AppBar style={{backgroundColor: '#004676'}}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" align="center">
                            Arrowhead Framework
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item xs={12}>
                <img src={require('../../res/arrowhead_logo.png')} style={ { height: '150px', width: '150px'}}/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="email" type="string" floatingLabelText="Email" autocomplete secondary />
                <br/>
                <TextField id="pwd" type="password" floatingLabelText="Password"  />
            </Grid>
            <Grid item xs={12}>
                <RaisedButton type="submit" label="Login" primary={true} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subheading" color="inherit">
                    If you are unable to sign in, please contact your local cloud administrator: {admin_email}
                </Typography>
            </Grid>
        </Grid>
    </div>
    </form>
</MuiThemeProvider>
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
