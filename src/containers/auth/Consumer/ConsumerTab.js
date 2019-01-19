import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import ConsumerTable from './ConsumerTable'

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
  { id: 'provider.systemName', disablePadding: false, label: 'Providing System Name' },
  { id: 'actions', disablePadding: false, label: 'Actions', disableSort: true }
]

class ConsumerTab extends Component {
  render() {
    const { consumerData, classes, deleteAuthEntry } = this.props
    return (<div className={classes.root}>
      {
        consumerData.map(consumerEntry => {
          return (
            <ExpansionPanel key={consumerEntry.consumer.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{consumerEntry.consumer.systemName}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.child}>
                <Typography><b>Address:</b> {consumerEntry.consumer.address}</Typography>
                <Typography><b>Port:</b> {consumerEntry.consumer.port}</Typography>
                <ConsumerTable
                  data={consumerEntry.relation}
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

ConsumerTab.propTypes = {
  consumerData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  deleteAuthEntry: PropTypes.func.isRequired
}

export default withStyles(styles)(ConsumerTab)
