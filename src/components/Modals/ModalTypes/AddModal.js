import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddSystem from './AddSystem'
import AddService from './AddService'

const AddModal = ({ closeModal }) => (
    <div>
        <AddSystem />
        <AddService />
    </div>
)

AddModal.propTypes = {
  closeModal: PropTypes.func,
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal)
