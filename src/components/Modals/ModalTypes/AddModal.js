import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'

const AddModal = ({ closeModal }) => {
  return (
    <div>
      <Typography variant='headline' id='modal-title'>
        Text in a modal
      </Typography>
      <Typography variant='subheading' id='simple-modal-description'>
        Sample text
      </Typography>
    </div>
  )
}

AddModal.propTypes = {
  closeModal: PropTypes.func
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal)
