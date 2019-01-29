import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import ServiceTable from './ServiceTable'

const styles = theme => ({
  root: {
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '5px',
    paddingRight: '5px'
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

const columnData = [
  { id: 'provider.systemName', disablePadding: false, label: 'Provider System Name' },
  { id: 'service.interfaces', disablePadding: false, label: 'Interface' },
  { id: 'consumer.systemName', disablePadding: false, label: 'Consumer System Name' },
  { id: 'actions', disablePadding: false, label: 'Actions', disableSort: true }
]

class ServiceTab extends Component {
  render() {
    const { serviceData, classes, deleteAuthEntry } = this.props
    return (<div className={classes.root}>
      {
        serviceData.map(serviceEntry => {
          return (
            <ExpansionPanel key={serviceEntry.service.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{serviceEntry.service.serviceDefinition}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.child}>
                <ServiceTable
                  data={serviceEntry.relation}
                  deleteAuthEntryById={deleteAuthEntry}
                  columnData={columnData}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })
      }
    </div>)
  }
}

ServiceTab.propTypes = {
  serviceData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  deleteAuthEntry: PropTypes.func.isRequired
}

export default withStyles(styles)(ServiceTab)
