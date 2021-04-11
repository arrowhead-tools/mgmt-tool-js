import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ModalContainer from '../../../components/Modals/ModalContainer/ModalContainer'
import { hideModal, showModal } from '../../../actions/modal'
import {
  getInterCloudAuthData,
  deleteInterCloudEntry,
  addInterCloudEntry
} from '../../../actions/auth'
import InterCloudTabContainer from './InterCloudTabContainer'
import Button from '../../../components/CustomButtons/Button'
import AddIcon from '@material-ui/icons/Add'

const styles = (theme) => ({
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

class InterCloud extends Component {
  componentDidMount() {
    this.props.getInterCloudAuthData()
  }

  onAddClick = () => {
    this.props.showModal(
      {
        open: true,
        closeModal: this.props.hideModal,
        addInterCloudEntry: this.props.addInterCloudEntry
      },
      'InterCloudDialog'
    )
  }

  onDeleteClick = (entryId) => () => {
    this.props.deleteInterCloudEntry(entryId)
  }

  render() {
    const { auth, classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
          <Button color="primary" onClick={this.onAddClick}>
            <AddIcon />
            Add
          </Button>
        </div>
        <InterCloudTabContainer
          cloudData={auth.interCloudCloudData}
          serviceData={auth.interCloudServiceData}
          deleteInterCloudEntry={this.onDeleteClick}
        />
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
    },
    deleteInterCloudEntry: (entryId) => {
      dispatch(deleteInterCloudEntry(entryId))
    },
    addInterCloudEntry: (interCloudEntry) => {
      dispatch(addInterCloudEntry(interCloudEntry))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InterCloud))
