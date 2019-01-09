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
import ModalContainer from '../../components/Modals/ModalContainer/ModalContainer'
import { hideModal, showModal } from '../../actions/modal'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import _ from 'lodash'
import { red } from '@material-ui/core/colors'

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
  },
  removeButton: {
    color: 'white',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700]
    }
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
})

class ServiceRegistry extends Component {
  componentDidMount() {
    this.props.getServices()
  }

  state = {
    switchState: false,
    open: false
  }

  handleSwitchChange = () => event => {
    this.setState({ switchState: event.target.checked })
  }

  handleAddClick = () => {
    this.props.showModal({
      open: true,
      closeModal: this.closeModal
    }, 'addSREntry')
  }

  handleServiceSearchClick = () => {
    this.props.showModal({
      open: true,
      closeModal: this.closeModal
    }, 'serviceSearch')
  }

  handleServiceSearchClearClick = () => {
    this.props.getServices()
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, services } = this.props
    const serviceColumnData = [
      { id: 'service_definition', disablePadding: false, label: 'Service Definition' },
      { id: 'interfaces', disablePadding: false, label: 'Interface' },
      { id: 'service_uri', disablePadding: false, label: 'Service URI' },
      { id: 'udp', disablePadding: false, label: 'UDP' }
    ]

    const systemColumnData = [
      { id: 'system_name', disablePadding: false, label: 'System Name' },
      { id: 'address', disablePadding: false, label: 'Address' },
      { id: 'port', disablePadding: false, label: 'Port' },
      { id: 'interface', disablePadding: false, label: 'Interface' },
      { id: 'service_uri', disablePadding: false, label: 'Service URI' },
      { id: 'udp', disablePadding: false, label: 'UDP' },
      { id: 'version', disablePadding: false, label: 'Service Version' }
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
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              {!_.isEmpty(services.queryData) &&
              <Button color='primary' className={classes.removeButton} onClick={this.handleServiceSearchClearClick}>
                <ClearIcon />Clear Filter
              </Button>
              }
              <Button
                color='primary'
                onClick={this.handleServiceSearchClick}
                style={{ marginLeft: '10px', marginRight: '10px' }}>
                <SearchIcon />Search
              </Button>
              <Button color='primary' onClick={this.handleAddClick}>
                <AddIcon />Add
              </Button>
            </div>
          </GridItem>
        </Grid>
        {this.state.switchState && services && services.groupBySystems && services.groupBySystems.map((serviceData, index) => (
          <ExpansionPanel key={index}>
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
        {!this.state.switchState && services && services.groupByServices && services.groupByServices.map((serviceData, index) => (
          <ExpansionPanel key={index}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{serviceData.serviceDefinition}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.child}>
              <Table data={serviceData.provider} columnData={systemColumnData} system={false} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
        <ModalContainer />
      </div>
    )
  }
}

ServiceRegistry.propTypes = {
  classes: PropTypes.object.isRequired,
  getServices: PropTypes.func.isRequired,
  services: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
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
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    showModal: (modalProps, modalType) => {
      dispatch(showModal({ modalProps, modalType }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ServiceRegistry))
