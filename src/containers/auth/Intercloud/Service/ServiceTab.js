import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import ServiceTable from './ServiceTable'

const styles = (theme) => ({
  root: {
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium,
  },
  child: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const columnData = [
  { id: 'cloud.operator', disablePadding: false, label: 'Operator' },
  {
    id: 'cloud.name',
    disablePadding: false,
    label: 'Cloud Name',
  },
  {
    id: 'cloud.provider.systemName',
    disablePadding: false,
    label: 'System Name',
  },
  {
    id: 'cloud.provider.port',
    disablePadding: false,
    label: 'Port',
  },
  {
    id: 'cloud.provider.authenticationInfo',
    disablePadding: false,
    label: 'Authentication Info',
  },
  {
    id: 'cloud.provider.interfaces',
    disablePadding: false,
    label: 'Interfaces',
  },
  {
    id: 'actions',
    disablePadding: false,
    label: 'Actions',
    disableSort: true,
  },
]

class ServiceTab extends Component {
  render() {
    const { services, classes, deleteInterCloudEntry } = this.props
    return (
        <div className={classes.root}>
            {services.map((entry) => (
                <ExpansionPanel key={entry.service.id}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            {entry.service.serviceDefinition}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.child}>
                        <ServiceTable
                            data={entry.clouds}
                            columnData={columnData}
                            deleteInterCloudEntry={deleteInterCloudEntry}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    )
  }
}

ServiceTab.propTypes = {
  classes: PropTypes.object.isRequired,
  services: PropTypes.array.isRequired,
  deleteInterCloudEntry: PropTypes.func.isRequired,
}

export default withStyles(styles)(ServiceTab)
