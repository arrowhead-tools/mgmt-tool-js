import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Dashboard extends Component {
  render() {
    return <div style={{ padding: '20px' }} />
  }
}

Dashboard.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  const { pageAuth } = state
  return { user: pageAuth.user }
}

export default connect(mapStateToProps)(Dashboard)
