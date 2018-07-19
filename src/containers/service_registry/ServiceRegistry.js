import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from '../../components/Table/Table'
import { getServices } from '../../actions/serviceRegistry'

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

class ServiceRegistry extends Component {
  componentDidMount() {
    this.props.getServices()
  }

  render() {
    const { classes, services } = this.props
    const columnData = [
      { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
      { id: 'service_definition', numeric: false, disablePadding: false, label: 'Service Definition' },
      { id: 'interfaces', numeric: false, disablePadding: false, label: 'Interfaces' },
      { id: 'port', numeric: true, disablePadding: false, label: 'PORT' },
      { id: 'service_uri', numeric: false, disablePadding: false, label: 'Service URI' },
      { id: 'udp', numeric: false, disablePadding: false, label: 'UDP' }
    ]
    return (
      <div className={classes.root}>
        {services && services.data && services.data.items && services.data.items.map(serviceData => (
          <ExpansionPanel key={serviceData.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{serviceData.systemName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.child}>
              <Typography><b>ID:</b> {serviceData.id}</Typography>
              <Typography><b>Address:</b> {serviceData.address}</Typography>
              <Typography><b>Port:</b> {serviceData.port}</Typography>
              <Typography><b>Authentication Info:</b> {serviceData.authenticationInfo}</Typography>
              <Table data={serviceData.services} columnData={columnData} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>

    )
  }
}

ServiceRegistry.propTypes = {
  classes: PropTypes.object.isRequired,
  getServices: PropTypes.func.isRequired,
  services: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { services } = state
  return { services }
}

function mapDispatchToProps(dispatch) {
  return {
    getServices: () => {
      dispatch(getServices())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ServiceRegistry))
