import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ModalContainer from '../../components/Modals/ModalContainer/ModalContainer'
import { hideModal, showModal } from '../../actions/modal'
import {
  getEventHandlerData,
  createSubscription,
  deleteSubscription,
  modifySubscription
} from '../../actions/eventHandler'
import CustomButton from '../../components/CustomButtons/Button'
import AddIcon from '@material-ui/icons/Add'
import EventHandlerTab from './EventHandler/EventHandlerTab'

const styles = theme => ({
  root: {
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: '10px'
  }
})

class EventHandler extends Component {
  componentDidMount() {
    this.props.getEventHandlerData()
  }

  onEventHandlerAddClick = () => {
    this.props.showModal(
      {
        open: true,
        closeModal: this.props.hideModal,
        createSubscription: this.props.createSubscription
      },
      'eventHandlerDialog'
    )
  }

  onEventHandlerDeleteClick = eventHandlerId => () => {
    this.props.deleteSubscription(eventHandlerId)
  }

  onEventHandlerModifyClick = event => () => {
    this.props.showModal(
      {
        open: true,
        closeModal: this.props.hideModal,
        isEdit: true,
        event,
        modifySubscription: this.props.modifySubscription
      },
      'eventHandlerDialog'
    )
  }

  render() {
    const { eventHandler, classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
          <CustomButton color="primary" onClick={this.onEventHandlerAddClick}>
            <AddIcon />
            Add
          </CustomButton>
        </div>
        <EventHandlerTab
          events={eventHandler.data}
          deleteEventHandler={this.onEventHandlerDeleteClick}
          modifyEventHandler={this.onEventHandlerModifyClick}
        />
        <ModalContainer />
      </div>
    )
  }
}

EventHandler.propTypes = {
  getEventHandlerData: PropTypes.func.isRequired,
  createSubscription: PropTypes.func.isRequired,
  deleteSubscription: PropTypes.func.isRequired,
  modifySubscription: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  eventHandler: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { eventHandler } = state
  return { eventHandler }
}

function mapDispatchToProps(dispatch) {
  return {
    getEventHandlerData: () => {
      dispatch(getEventHandlerData())
    },
    createSubscription: subscriptionData => {
      dispatch(createSubscription(subscriptionData))
    },
    deleteSubscription: eventHandlerId => {
      dispatch(deleteSubscription(eventHandlerId))
    },
    modifySubscription: (subscriptionData, id) => {
      dispatch(modifySubscription(subscriptionData, id))
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    showModal: (modalProps, modalType) => {
      dispatch(showModal({ modalProps, modalType }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EventHandler))
