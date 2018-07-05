
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Home component</h1>
      </div>
    )
  }
}

Dashboard.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  const { auth } = state
  return { user: auth.user }
}

export default connect(mapStateToProps)(Dashboard)
