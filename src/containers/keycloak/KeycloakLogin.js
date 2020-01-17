/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2020. 01. 16.
 */

import React, { Component } from "react";
import { keycloak } from '../../services/keycloakInstance'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { loginSuccess } from '../../actions/keycloak'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

class KeycloakLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    console.log(keycloak);
    keycloak
      .init({ onLoad: "login-required", promiseType: "native" })
      .then(authenticated => {
        this.props.loginSuccess(keycloak.token)
        this.setState({ keycloak: keycloak, authenticated: authenticated });
      });
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated)
        return <Redirect to="/"/>
      else return <div>Unable to authenticate!</div>;
    }
    return <LoadingSpinner />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginSuccess: (token) => {
      dispatch(loginSuccess(token))
    }
  }
}

export default connect(null, mapDispatchToProps)(KeycloakLogin);
