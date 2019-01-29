import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import ProviderTable from './ProviderTable'

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
  { id: 'service.serviceDefinition', disablePadding: false, label: 'Service Definition' },
  { id: 'service.interfaces', disablePadding: false, label: 'Interface' },
  { id: 'consumer.systemName', disablePadding: false, label: 'Consumer System Name' },
  { id: 'actions', disablePadding: false, label: 'Actions', disableSort: true }
]

class ProviderTab extends Component {
  render() {
    const { providerData, classes, deleteAuthEntry } = this.props
    return (<div className={classes.root}>
      {
        providerData.map(providerEntry => {
          return (
            <ExpansionPanel key={providerEntry.provider.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{providerEntry.provider.systemName}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.child}>
                <Typography><b>Address:</b> {providerEntry.provider.address}</Typography>
                <Typography><b>Port:</b> {providerEntry.provider.port}</Typography>
                <ProviderTable
                  data={providerEntry.relation}
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

ProviderTab.propTypes = {
  providerData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  deleteAuthEntry: PropTypes.func.isRequired
}

export default withStyles(styles)(ProviderTab)
