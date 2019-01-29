import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import CloudTable from './CloudTable'

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
  { id: 'serviceDefinition', disablePadding: false, label: 'Service Definition' },
  { id: 'service.interfaces', disablePadding: false, label: 'Interface' }
]

class CloudTab extends Component {
  render() {
    const { clouds, classes } = this.props
    console.log(clouds)
    return (
      <div className={classes.root}>
        {
          clouds.map(entry => {
            return (
              <ExpansionPanel key={entry.cloud.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>{entry.cloud.cloudName}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.child}>
                  <Typography><b>Operator:</b> {entry.cloud.operator}</Typography>
                  <Typography><b>Address:</b> {entry.cloud.address}</Typography>
                  <Typography><b>Port:</b> {entry.cloud.port}</Typography>
                  <CloudTable
                    data={entry.services}
                    columnData={columnData}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
        }
      </div>
    )
  }
}

CloudTab.propTypes = {
  classes: PropTypes.object.isRequired,
  clouds: PropTypes.array.isRequired
}

export default withStyles(styles)(CloudTab)
