import React from 'react'
import * as PropTypes from 'prop-types'
import ModalContainer from '../../../components/Modals/ModalContainer/ModalContainer'
import BackupListTab from './BackupList/BackupListTab'
import {
  getOrchestrationStoreData,
  savePriorities,
  deleteService,
  addStoreEntry,
  deleteStoreEntry,
  editStoreEntry
} from '../../../actions/orchestrator'
import { connect } from 'react-redux'
import Button from '../../../components/CustomButtons/Button'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { hideModal, showModal } from '../../../actions/modal'

const styles = (theme) => ({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

class OrchestratorStore extends React.Component {
  componentDidMount() {
    this.props.getOrchestrationStoreData()
  }

  onAddClick = () => {
    this.props.showModal(
      {
        open: true,
        closeModal: this.props.hideModal,
        addStoreEntry: this.props.addStoreEntry
      },
      'OrchStoreDialog'
    )
  }

  onEditClick = (storeEntry, storeEntryId) => {
    this.props.showModal(
      {
        open: true,
        closeModal: this.props.hideModal,
        editStoreEntry: this.props.editStoreEntry,
        isEdit: true,
        data: storeEntry,
        id: storeEntryId
      },
      'OrchStoreDialog'
    )
  }

  render() {
    const {
      orchestrator,
      savePriorities,
      deleteService,
      classes,
      deleteStoreEntry
    } = this.props

    return (
      <div>
        <div className={classes.buttonContainer}>
          <Button color="primary" onClick={this.onAddClick}>
            <AddIcon />
            Add
          </Button>
        </div>
        <BackupListTab
          data={orchestrator.backup}
          savePriorities={savePriorities}
          deleteService={deleteService}
          deleteStoreEntry={deleteStoreEntry}
          onEditClick={this.onEditClick}
        />
        <ModalContainer />
      </div>
    )
  }
}

OrchestratorStore.propTypes = {
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  getOrchestrationStoreData: PropTypes.func.isRequired,
  orchestrator: PropTypes.object.isRequired,
  savePriorities: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  addStoreEntry: PropTypes.func.isRequired,
  deleteStoreEntry: PropTypes.func.isRequired,
  editStoreEntry: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { orchestrator } = state

  return { orchestrator }
}

function mapDispatchToProps(dispatch) {
  return {
    getOrchestrationStoreData: () => {
      dispatch(getOrchestrationStoreData())
    },
    savePriorities: (priorityData) => {
      dispatch(savePriorities(priorityData))
    },
    deleteService: (serviceId) => {
      dispatch(deleteService(serviceId))
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    showModal: (modalProps, modalType) => {
      dispatch(showModal({ modalProps, modalType }))
    },
    addStoreEntry: (entry) => {
      dispatch(addStoreEntry(entry))
    },
    deleteStoreEntry: (id) => {
      dispatch(deleteStoreEntry(id))
    },
    editStoreEntry: (storeEntry, id) => {
      dispatch(editStoreEntry(storeEntry, id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OrchestratorStore))
