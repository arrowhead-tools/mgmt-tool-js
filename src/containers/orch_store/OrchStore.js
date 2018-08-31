import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
//icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
//core
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
//actions
import { getOrchStoreData } from '../../actions/orchStore'
//components
import TableOrchStore from '../../components/Table/TableOrchStore'


const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium
  },
  child: {
    display: 'flex',
    flexDirection: 'column'
  }
})

class OrchestrationStore extends Component {

  componentDidMount() {
    this.props.getOrchStoreData()
  }

  render() {
    const { classes, orchStoreData } = this.props
    const columnData = [
      { id: 'priority', numeric: true, disablePadding: false, label: 'Priority' },
      { id: 'provider_id', numeric: false, disablePadding: false, label: 'Provider ID' },
      { id: 'provider_name', numeric: false, disablePadding: false, label: 'Provider Name' },
      { id: 'provider_address', numeric: false, disablePadding: false, label: 'Provider Address' },
      { id: 'provider_port', numeric: true, disablePadding: false, label: 'Port' },
      { id: 'service_id', numeric: true, disablePadding: false, label: 'Service ID' },
      { id: 'service_def', numeric: false, disablePadding: false, label: 'Service Definition' },
      { id: 'interfaces', numeric: false, disablePadding: false, label: 'Interfaces' },
      { id: 'provider_auth_info', numeric: false, disablePadding: false, label: 'Provider Auth Info' }
    ] 
    return (
     
      <div className={classes.root}>
      <br/><br/>
        {orchStoreData && orchStoreData.data && orchStoreData.data.items && orchStoreData.data.items.map(orchData => (
          <ExpansionPanel key={orchData.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{orchData.id + " " + orchData.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.child}>
              <Typography><b>ID:</b> {orchData.id}</Typography>
              <Typography><b>Address:</b> {orchData.address}</Typography>
              <Typography><b>Port:</b> {orchData.port}</Typography>
              <Typography><b>Name:</b> {orchData.name}</Typography>
              <Typography><b>Instruction:</b> {orchData.instruction}</Typography>
              <Typography><b>Last updated:</b> {orchData.lastUpdated}</Typography>
              <Typography style = {{overflow:'hidden', textOverflow:'ellipsis'}}><b>Authentication Info:</b> {orchData.authenticationInfo}</Typography>
              <TableOrchStore data={orchData.providers} columnData={columnData} />

            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>


    )
  }
}

OrchestrationStore.propTypes = {
  classes: PropTypes.object.isRequired,
  getOrchStoreData: PropTypes.func.isRequired,
  orchStoreData: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { orchStoreData } = state
  return { orchStoreData }
}

function mapDispatchToProps(dispatch) {
  return {
    getOrchStoreData: () => {
      dispatch(getOrchStoreData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrchestrationStore))
