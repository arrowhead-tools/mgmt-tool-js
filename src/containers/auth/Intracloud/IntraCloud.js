import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Button from '../../../components/CustomButtons/Button'
import ModalContainer from '../../../components/Modals/ModalContainer/ModalContainer'
import { hideModal, showModal } from '../../../actions/modal'
import AddIcon from '@material-ui/icons/Add'
import { deleteAuthEntry, getIntraCloudAuthData } from '../../../actions/auth'
import IntraCloudTabContainer from './IntraCloudTabContainer'

const styles = theme => ({
  root: {},
  grid: {},
  buttonMargin: {
    marginLeft: '10px',
    marginRight: '10px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

class IntraCloud extends Component {
  componentDidMount() {
    this.props.getIntraCloudAuthData()
  }

  handleAddClick = () => {
    this.props.showModal({
      open: true,
      closeModal: this.closeModal
    }, 'addAuthEntry')
  }

  deleteAuthEntry = (authEntryId) => () => {
    this.props.deleteAuthEntry(authEntryId)
  }

  render() {
    const { classes, auth } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
          <Button color='primary' onClick={this.handleAddClick}>
            <AddIcon />Add
          </Button>
        </div>
        <IntraCloudTabContainer consumerData={auth.groupByConsumer} providerData={auth.groupByProvider} serviceData={auth.groupByService} deleteAuthEntry={this.deleteAuthEntry} />
        <ModalContainer />
      </div>
    )
  }
}

IntraCloud.propTypes = {
  getIntraCloudAuthData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAuthEntry: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { auth } = state
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    getIntraCloudAuthData: () => {
      dispatch(getIntraCloudAuthData())
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    showModal: (modalProps, modalType) => {
      dispatch(showModal({ modalProps, modalType }))
    },
    deleteAuthEntry: (authEntryId) => {
      dispatch(deleteAuthEntry(authEntryId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(IntraCloud))
