import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import GridItem from '../../components/Grid/GridItem'
import Table from '../../components/Table/Table'
import { getFilteredServices, getServices } from '../../actions/serviceRegistry'
import Button from '../../components/CustomButtons/Button'
import ServiceSearch from '../../components/ServiceSearch/ServiceSearch'

const styles = theme => ({
  root: {
    width: '97%'
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

  state = {
    switchState: false
  }

  handleSwitchChange = () => event => {
    this.setState({ switchState: event.target.checked })
  }

  handleSearchClick = (systemSearch, serviceSearch, interfaceSearch) => {
    console.log(systemSearch, serviceSearch, interfaceSearch)
    let queryData = []
    if (systemSearch) {
      queryData.push({
        regularExpression: systemSearch,
        fieldName: 'systemName',
        partialMath: true
      })
    }
    if (serviceSearch) {
      queryData.push({
        regularExpression: serviceSearch,
        fieldName: 'serviceDefinition',
        partialMath: true
      })
    }
    if (interfaceSearch) {
      queryData.push({ regularExpression: interfaceSearch, fieldName: 'interfaces', partialMath: true })
    }

    this.props.getFilteredServices(queryData)
  }


  render() {
    const { classes, services } = this.props
    const serviceColumnData = [
      { id: 'service_definition', numeric: false, disablePadding: false, label: 'Service Definition' },
      { id: 'interfaces', numeric: false, disablePadding: false, label: 'Interfaces' },
      { id: 'service_uri', numeric: false, disablePadding: false, label: 'Service URI' },
      { id: 'udp', numeric: false, disablePadding: false, label: 'UDP' }
    ]

    const systemColumnData = [
      { id: 'system_name', numeric: false, disablePadding: false, label: 'System Name' },
      { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
      { id: 'port', numeric: false, disablePadding: false, label: 'Port' }
    ]
    return (
      <div className={classes.root}>
        <br /><br /><br />
        <Grid
          container direction='row' spacing={16} justify='space-between' alignItems='baseline'
          style={{ margin: '16px', maxWidth: '95%' }}>
          <GridItem style={{ display: 'flex' }}>
            <Typography style={{ paddingRight: '14px', display: 'flex', alignItems: 'center' }}><b>Group
              by:</b>&nbsp;Service</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.switchState}
                  onChange={this.handleSwitchChange()}
                  value={false}
                  color='primary'
                />
              }
              label='System' />
          </GridItem>
          <GridItem>
            <Button color='primary'>
              Add
            </Button>
          </GridItem>
        </Grid>
        <Grid
          container direction='column'
          justify='center' alignItems='center'
          style={{ paddingBottom: '10px', marginBottom: '20px' }}>
          <GridItem style={{ margin: '10px', marginTop: '20px' }}>
            <ServiceSearch
              handleSystemSearchOnChange={this.handleSystemSearchOnChange}
              handleServiceSearchOnChange={this.handleServiceSearchOnChange}
              handleInterfaceSearchOnChange={this.handleInterfaceSearchOnChange}
              handleSearchClick={this.handleSearchClick} />
          </GridItem>
        </Grid>
        {this.state.switchState && services && services.groupBySystems && services.groupBySystems.map(serviceData => (
          <ExpansionPanel key={serviceData.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{serviceData.systemName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.child}>
              <Typography><b>Address:</b> {serviceData.address}</Typography>
              <Typography><b>Port:</b> {serviceData.port}</Typography>
              <Typography><b>Authentication Info:</b> {serviceData.authenticationInfo || '-'}</Typography>
              <Table data={serviceData.services} columnData={serviceColumnData} system />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
        {!this.state.switchState && services && services.groupByServices && services.groupByServices.map(serviceData => (
          <ExpansionPanel key={serviceData.serviceDefinition}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{serviceData.serviceDefinition}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.child}>
              <Typography><b>Interface:</b> {serviceData.interface}</Typography>
              <Typography><b>Service URI:</b> {serviceData.serviceURI}</Typography>
              <Typography><b>UDP:</b> {serviceData.udp}</Typography>
              <Typography><b>Version:</b> {serviceData.version}</Typography>
              <Table data={serviceData.provider} columnData={systemColumnData} system={false} />
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
  getFilteredServices: PropTypes.func.isRequired,
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
    },
    getFilteredServices: (queryData) => {
      dispatch(getFilteredServices(queryData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ServiceRegistry))
