import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import * as PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import Button from '../../CustomButtons/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import AutoCompleteMulti from '../../AutoCompleteMulti/AutoCompleteMulti'
import { getClouds} from '../../../actions/gatekeeper'
import { getServices, getSystems, getServiceRegistryEntriesView } from '../../../actions/serviceRegistry'
import AutoCompleteSingle from '../../AutoCompleteSingle/AutoCompleteSingle'

const styles = theme => ({
  input: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '400px'
  },
  prop: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  propKey: {
    width: '40%',
    marginLeft: '20px',
    marginRight: theme.spacing.unit * 2,
    marginBottom: '10px'
  },
  propValue: {
    width: '40%',
    marginRight: '20px',
    marginBottom: '10px'
  },
  fabStyle: {
    marginLeft: '20px'
  },
  wrapper: {
    position: 'relative',
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 8
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    width: '440px'
  },
  text: {
    paddingLeft: '20px',
    paddingBottom: '20px'
  },
  title: {
    paddingTop: '10px'
  },
  buttonStyle: {
    width: '440px',
    marginLeft: '10px'
  }
})

class InterCloudDialog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cloud: {},
      interfaceList: [],
      providerList: [],
      service: {}
    }
  }

  componentDidMount() {
    this.props.getServiceRegistryEntriesView()
    this.props.getClouds()
    this.props.getServices()
    this.props.getSystems()
  }

  onCloudChange = cloud => {
    this.setState({cloud})
  }

  onSourceSystemChange = service => {
    this.setState({ service })
  }

  handleProviderSystemOnChange = providerList => {
    this.setState({ providerList })
  }

  handleInterfacesListOnChange = interfaceList => {
    this.setState({ interfaceList })
  }

  onSubmit = () => {
    const interCloudEntry = {
      cloudId: this.state.cloud.id,
      interfaceIdList: this.state.interfaceList.map(iface => iface.id),
      providerIdList: this.state.providerList.map(system => system.id),
      serviceDefinitionIdList: [this.state.service.id]
    }
    this.props.addInterCloudEntry(interCloudEntry)
    this.props.closeModal()
  }

  render() {
    const { clouds, classes, services, systems, interfaces } = this.props
    return (
      <div>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Cloud
          </Typography>
          <AutoCompleteSingle
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: {
                width: '400px',
                marginTop: '20px',
                marginLeft: '20px'
              }
            }}
            suggestions={clouds}
            handleOnChange={this.onCloudChange}
            keyValue="name"
            required
            placeholder="Cloud"
            label="Cloud"
          />
          <Typography className={classes.text}>
            <b>Operator:</b>{' '}
            {this.state.cloud && this.state.cloud.operator ? this.state.cloud.operator : ''}
          </Typography>
        </Card>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Provider Systems
          </Typography>
          <AutoCompleteMulti
            handleOnChange={this.handleProviderSystemOnChange}
            disabled={this.state.interfaces === null}
            label="Provider Systems"
            placeholder="Provider Systems"
            keyValue="systemName"
            required
            suggestions={systems}
          />
        </Card>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Service
          </Typography>
          <AutoCompleteSingle
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: {
                width: '400px',
                marginTop: '20px',
                marginLeft: '20px'
              }
            }}
            suggestions={services}
            handleOnChange={this.onSourceSystemChange}
            label="Service"
            placeholder="Service"
            keyValue="serviceDefinition"
            required
          />
          <AutoCompleteMulti
            handleOnChange={this.handleInterfacesListOnChange}
            disabled={this.state.providedService === null}
            label="Interfaces"
            placeholder="Interfaces"
            keyValue="value"
            required
            suggestions={interfaces}
          />
        </Card>
        <Button
          onClick={this.onSubmit}
          disabled={
            this.state.cloud === {} ||
            this.state.interfaceList === [] ||
            this.state.providerList === [] ||
            this.state.serviceList === []
          }
          color="primary"
          className={classes.buttonStyle}
        >
          <AddIcon /> Add
        </Button>
      </div>
    )
  }
}

InterCloudDialog.propTypes = {
  clouds: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  addInterCloudEntry: PropTypes.func,
  getClouds: PropTypes.func.isRequired,
  getServices: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { gatekeeper, services } = state
  return { clouds: gatekeeper.data, services: services.services, systems: services.systems, interfaces: services.autoCompleteData.interfaceList }
}

export default connect(
  mapStateToProps,
  { getClouds, getServices, getSystems, getServiceRegistryEntriesView }
)(withStyles(styles)(InterCloudDialog))
