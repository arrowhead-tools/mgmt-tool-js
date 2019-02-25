import React from 'react'
import * as PropTypes from 'prop-types'
import ModalContainer from '../../../components/Modals/ModalContainer/ModalContainer'
import BackupListTab from './BackupList/BackupListTab'
import {
  getOrchestrationStoreData,
  savePriorities,
  deleteService
} from '../../../actions/orchestrator'
import { connect } from 'react-redux'

class OrchestratorStore extends React.Component {
  componentDidMount() {
    this.props.getOrchestrationStoreData()
  }

  render() {
    const { orchestrator, savePriorities, deleteService } = this.props

    return (
      <div>
        <BackupListTab
          data={orchestrator.backup}
          savePriorities={savePriorities}
          deleteService={deleteService}
        />
        <ModalContainer />
      </div>
    )
  }
}

OrchestratorStore.propTypes = {
  getOrchestrationStoreData: PropTypes.func.isRequired,
  orchestrator: PropTypes.object.isRequired,
  savePriorities: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired
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
    savePriorities: priorityData => {
      dispatch(savePriorities(priorityData))
    },
    deleteService: serviceId => {
      dispatch(deleteService(serviceId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrchestratorStore)
