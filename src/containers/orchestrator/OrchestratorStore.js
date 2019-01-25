import React from 'react'
import PropTypes from 'prop-types'
import ModalContainer from '../../components/Modals/ModalContainer/ModalContainer'
import OrchestrationStoreTabContainer from './OrchestrationStoreTabContainer'
import { getOrchestrationStoreData } from '../../actions/orchestrator'
import { connect } from 'react-redux'

class OrchestratorStore extends React.Component {
  componentDidMount() {
    this.props.getOrchestrationStoreData()
  }

  render() {
    const { orchestrator } = this.props

    return <div>
      <OrchestrationStoreTabContainer backupList={orchestrator.backup} />
      <ModalContainer />
    </div>
  }
}

OrchestratorStore.propTypes = {
  getOrchestrationStoreData: PropTypes.func.isRequired,
  orchestrator: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { orchestrator } = state

  return { orchestrator }
}

function mapDispatchToProps(dispatch) {
  return {
    getOrchestrationStoreData: () => {
      dispatch(getOrchestrationStoreData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrchestratorStore)
