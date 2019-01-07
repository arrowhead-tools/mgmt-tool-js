import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import AddModal from '../ModalTypes/AddModal'
import ServiceSearchModal from '../ModalTypes/ServiceSearch'
import AddSREntry from '../ModalTypes/AddSREntry'

const MODAL_TYPES = {
  'add': AddModal,
  'serviceSearch': ServiceSearchModal,
  'addSREntry': AddSREntry
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '460px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '10px'
  }
})

class ModalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }

    this.closeModal = this.closeModal.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        modalIsOpen: nextProps.modalProps.open
      })
    }
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    if (!this.props.modalType) {
      return null
    }
    const SpecifiedModal = MODAL_TYPES[this.props.modalType]
    return (<Modal
      open={this.state.modalIsOpen}
      onClose={this.closeModal}>
      <div style={{
        top: '50%',
        left: '50%',
        maxHeight: '100%',
        transform: 'translate(-50%, -50%)',
        overflowX: 'auto'
      }} className={this.props.classes.paper}>
        <SpecifiedModal closeModal={this.closeModal} {...this.props.modalProps} />
      </div>
    </Modal>)
  }
}

ModalContainer.propTypes = {
  modalType: PropTypes.object.isRequired,
  modalProps: PropTypes.object.isRequired,
  classes: PropTypes.object
}

const mapStateToProps = state => ({
  ...state.modal
})

export default connect(mapStateToProps, null)(withStyles(styles)(ModalContainer))
