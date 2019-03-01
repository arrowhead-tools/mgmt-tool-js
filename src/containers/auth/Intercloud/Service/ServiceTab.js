import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
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
  { id: 'operator', disablePadding: false, label: 'Operator' },
  {
    id: 'cloudName',
    disablePadding: false,
    label: 'Cloud Name'
  },
  {
    id: 'address',
    disablePadding: false,
    label: 'Address'
  },
  {
    id: 'port',
    disablePadding: false,
    label: 'Port'
  },
  {
    id: 'gatekeeperServiceURI',
    disablePadding: false,
    label: 'Gatekeeper Service URI'
  },
  {
    id: 'authenticationInfo',
    disablePadding: false,
    label: 'Authentication Info'
  },
  {
    id: 'secure',
    disablePadding: false,
    label: 'Secure'
  },
  {
    id: 'actions',
    disablePadding: false,
    label: 'Actions',
    disableSort: true
  }
]

class ServiceTab extends Component {
  render() {
    const { services, classes, deleteInterCloudEntry } = this.props
    return (
      <div className={classes.root}>
        {services.map(entry => {
          return (
            <ExpansionPanel key={entry.service.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {entry.service.serviceDefinition}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.child}>
                <Typography>
                  <b>Interfaces:</b> {entry.service.interfaces.join(', ')}
                </Typography>
                <ServiceTable
                  data={entry.clouds}
                  columnData={columnData}
                  deleteInterCloudEntry={deleteInterCloudEntry}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
      </div>
    )
  }
}

ServiceTab.propTypes = {
  classes: PropTypes.object.isRequired,
  services: PropTypes.array.isRequired,
  deleteInterCloudEntry: PropTypes.func.isRequired
}

export default withStyles(styles)(ServiceTab)
