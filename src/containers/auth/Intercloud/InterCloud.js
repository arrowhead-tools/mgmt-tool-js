import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ModalContainer from '../../../components/Modals/ModalContainer/ModalContainer'
import { hideModal, showModal } from '../../../actions/modal'
import { getInterCloudAuthData } from '../../../actions/auth'
import CloudTab from './Cloud/CloudTab'

const styles = theme => ({})

class InterCloud extends Component {
  componentDidMount() {
    this.props.getInterCloudAuthData()
  }

  render() {
    const { auth } = this.props
    return (
      <div>
        <CloudTab clouds={auth.cloud} />
        <ModalContainer />
      </div>
    )
  }
}

InterCloud.propTypes = {
  getInterCloudAuthData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { auth } = state
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    getInterCloudAuthData: () => {
      dispatch(getInterCloudAuthData())
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    showModal: (modalProps, modalType) => {
      dispatch(showModal({ modalProps, modalType }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InterCloud))
