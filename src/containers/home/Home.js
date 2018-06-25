import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Home extends Component {
  render() {
    return (
      <div className='home-page page dynamic'>
        <h1>Home component</h1>
      </div>
    )
  }
}

Home.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  const { auth } = state
  return { user: auth.user }
}

export default connect(mapStateToProps)(Home)
