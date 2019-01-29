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
import Table from '../../components/Table/TableSR'
import { getFilteredServices, getServices, deleteServiceById } from '../../actions/serviceRegistry'
import Button from '../../components/CustomButtons/Button'
import ModalContainer from '../../components/Modals/ModalContainer/ModalContainer'
import { hideModal, showModal } from '../../actions/modal'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import _ from 'lodash'
import { red } from '@material-ui/core/colors'
import ServiceRegistryTabContainer from './ServiceRegistryTabContainer'

const styles = theme => ({
  root: {
    width: '97%',
    paddingBottom: '10px',
    paddingLeft: '5px'
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
  },
  grid: {
    marginBottom: '10px'
  },
  buttonMargin: {
    marginLeft: '10px',
    marginRight: '10px'
  },
  title: {
    paddingRight: '14px',
    display: 'flex',
    alignItems: 'center'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
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

  handleServiceDelete = (serviceId) => () => {
    this.props.deleteServiceById(serviceId)
  }

  handleServiceEdit = (serviceId) => () => {
    this.props.showModal({
      open: true,
      isEdit: true,
      serviceId,
      closeModal: this.closeModal
    }, 'addSREntry')
  }

  handleClose = () => {
    this.setState({ open: false })
  }


  render() {
    const { classes, services } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
          {!_.isEmpty(services.queryData) &&
          <Button color='primary' className={classes.removeButton} onClick={this.handleServiceSearchClearClick}>
            <ClearIcon />Clear Filter
          </Button>
          }
          <Button
            color='primary'
            onClick={this.handleServiceSearchClick}
            className={classes.buttonMargin}>
            <SearchIcon />Search
          </Button>
          <Button color='primary' onClick={this.handleAddClick}>
            <AddIcon />Add
          </Button>
        </div>
        <ServiceRegistryTabContainer systemData={services.groupBySystems} serviceData={services.groupByServices} handleServiceDelete={this.handleServiceDelete} handleServiceEdit={this.handleServiceEdit} />
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
  showModal: PropTypes.func.isRequired,
  deleteServiceById: PropTypes.func.isRequired
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
    },
    deleteServiceById: (serviceId) => {
      dispatch(deleteServiceById(serviceId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ServiceRegistry))
