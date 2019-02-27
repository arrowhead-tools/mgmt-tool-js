import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import * as PropTypes from 'prop-types'
import Button from '../../CustomButtons/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import AutoComplete from '../../AutoComplete/AutoComplete'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton/IconButton'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import {
  getOrchestratorSystems,
  getOrchestratorServices,
  getOrchestrationClouds
} from '../../../actions/orchestrator'
import ChipInput from 'material-ui-chip-input'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
  title: {
    marginTop: '10px'
  },
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
    marginLeft: '20px',
    marginBottom: '20px'
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
  marginBottom20: {
    marginBottom: '20px'
  },
  buttonStyle: {
    width: '440px',
    marginLeft: '10px'
  }
})

class OrchStoreDialog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      consumer: {
        id: null,
        systemName: '',
        address: '',
        port: '',
        authenticationInfo: ''
      },
      providerSystem: {
        id: null,
        systemName: '',
        address: '',
        port: '',
        authenticationInfo: ''
      },
      providerCloud: {
        id: null,
        operator: '',
        cloudName: '',
        address: '',
        port: '',
        gatekeeperServiceURI: '',
        authenticationInfo: '',
        secure: false
      },
      service: {
        id: null,
        serviceDefinition: '',
        interfaces: [],
        serviceMetadata: [{ name: '', value: '' }]
      },
      priority: '',
      serviceURI: ''
    }
  }

  componentDidMount() {
    this.props.getOrchestratorSystems()
    this.props.getOrchestratorServices()
    this.props.getOrchestrationClouds()
  }

  onConsumerSystemChange = consumer => {
    if (consumer !== undefined) {
      this.setState({ consumer })
    }
  }

  onConsumerSystemNameChange = systemName => {
    this.setState({
      consumer: { ...this.state.consumer, systemName, id: null }
    })
  }

  onAddressChange = event => {
    this.setState({
      consumer: {
        ...this.state.consumer,
        address: event.target.value,
        id: null
      }
    })
  }

  onPortChange = event => {
    if (
      event.target.value === '' ||
      (event.target.value > 0 && event.target.value <= 65536)
    ) {
      this.setState({
        consumer: { ...this.state.consumer, port: event.target.value, id: null }
      })
    }
  }

  onAuthInfoChange = event => {
    this.setState({
      consumer: {
        ...this.state.consumer,
        authenticationInfo: event.target.value,
        id: null
      }
    })
  }

  onChipAdd = chip => {
    this.setState({
      service: {
        ...this.state.service,
        interfaces: [...this.state.service.interfaces, chip]
      }
    })
  }

  onChipDelete = (deletedChip, index) => {
    this.setState({
      service: {
        ...this.state.service,
        interfaces: this.state.service.interfaces.filter(c => c !== deletedChip)
      }
    })
  }

  onServiceDefinitionChange = service => {
    if (service !== undefined) {
      this.setState({ service: { ...this.state.service, ...service } })
    }
  }

  onServiceDefinitionNameChange = serviceDefinition => {
    this.setState({
      service: { ...this.state.service, serviceDefinition, id: null }
    })
  }

  onServiceMetadataChange = (index, key) => event => {
    const metadataArray = [...this.state.service.serviceMetadata]
    metadataArray[index][key] = event.target.value
    this.setState({
      service: { ...this.state.service, serviceMetadata: metadataArray }
    })
  }

  removeServiceMetadataProperty = removeIndex => () => {
    this.setState({
      service: {
        ...this.state.service,
        serviceMetadata: [
          ...this.state.service.serviceMetadata.slice(0, removeIndex),
          ...this.state.service.serviceMetadata.slice(removeIndex + 1)
        ]
      }
    })
  }

  addServiceMetadataProperty = () => {
    this.setState({
      service: {
        ...this.state.service,
        serviceMetadata: [
          ...this.state.service.serviceMetadata,
          { name: '', value: '' }
        ]
      }
    })
  }

  onProviderSystemChange = providerSystem => {
    if (providerSystem !== undefined) {
      this.setState({ providerSystem })
    }
  }

  onProviderSystemNameChange = systemName => {
    this.setState({
      providerSystem: { ...this.state.providerSystem, systemName, id: null }
    })
  }

  onProviderAddressChange = event => {
    this.setState({
      providerSystem: {
        ...this.state.providerSystem,
        address: event.target.value,
        id: null
      }
    })
  }

  onProviderPortChange = event => {
    if (
      event.target.value === '' ||
      (event.target.value > 0 && event.target.value <= 65536)
    ) {
      this.setState({
        providerSystem: {
          ...this.state.providerSystem,
          port: event.target.value,
          id: null
        }
      })
    }
  }

  onProviderAuthInfoChange = event => {
    this.setState({
      providerSystem: {
        ...this.state.providerSystem,
        authenticationInfo: event.target.value,
        id: null
      }
    })
  }

  onProviderCloudChange = providerCloud => {
    if (providerCloud !== undefined) {
      this.setState({ providerCloud })
    }
  }

  onProviderCloudNameChange = cloudName => {
    this.setState({ providerCloud: { ...this.state.providerCloud, cloudName } })
  }

  onProviderCloudOperatorChange = event => {
    this.setState({
      providerCloud: {
        ...this.state.providerCloud,
        operator: event.target.value
      }
    })
  }

  onProviderCloudAddressChange = event => {
    this.setState({
      providerCloud: {
        ...this.state.providerCloud,
        address: event.target.value
      }
    })
  }

  onProviderCloudPortChange = event => {
    if (
      event.target.value === '' ||
      (event.target.value > 0 && event.target.value <= 65536)
    ) {
      this.setState({
        providerCloud: { ...this.state.providerCloud, port: event.target.value }
      })
    }
  }

  onProviderCloudGatekeeperServiceURIChange = event => {
    this.setState({
      providerCloud: {
        ...this.state.providerCloud,
        gatekeeperServiceURI: event.target.value
      }
    })
  }

  onProviderCloudAuthInfoChange = event => {
    this.setState({
      providerCloud: {
        ...this.state.providerCloud,
        authenticationInfo: event.target.value
      }
    })
  }

  onProviderCloudSecureChange = event => {
    this.setState({
      providerCloud: {
        ...this.state.providerCloud,
        secure: event.target.checked
      }
    })
  }

  onPriorityChange = event => {
    if (
      event.target.value === '' ||
      (event.target.value > 0 && event.target.value <= 999)
    ) {
      this.setState({
        priority: event.target.value
      })
    }
  }

  onServiceURIChange = event => {
    this.setState({ serviceURI: event.target.value })
  }

  onSubmit = () => {
    const serviceMetadataHelper = {}
    for (const item of this.state.service.serviceMetadata) {
      if (item.name !== '' || item.value !== '') {
        serviceMetadataHelper[item.name] = item.value
      }
    }

    const data = {...this.state}
    data.service.serviceMetadata = serviceMetadataHelper


    if (this.props.isEdit) {
      //edit
    } else {
      this.props.addStoreEntry(data)
    }
    this.props.closeModal()
  }

  render() {
    const { classes, systems, services, clouds, isEdit } = this.props

    return (
      <div>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Consumer System
          </Typography>
          <AutoComplete
            label="Consumer System Name"
            handleOnChange={this.onConsumerSystemChange}
            handleTextChange={this.onConsumerSystemNameChange}
            suggestions={systems}
            keyValue="systemName"
            required
            placeholder="Consumer System Name"
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: {
                width: '400px',
                marginTop: '20px',
                marginLeft: '20px',
                marginRight: '20px'
              }
            }}
          />
          <TextField
            value={this.state.consumer.address}
            className={classes.input}
            id="address"
            required
            label="Address"
            onChange={this.onAddressChange}
          />
          <TextField
            value={this.state.consumer.port}
            className={classes.input}
            id="port"
            label="Port"
            required
            onChange={this.onPortChange}
            type="number"
            inputProps={{ min: '1', max: '65535' }}
          />
          <TextField
            value={this.state.consumer.authenticationInfo}
            className={classes.input + ' ' + classes.marginBottom20}
            id="authenticationInfo"
            label="Authentication Info"
            onChange={this.onAuthInfoChange}
          />
        </Card>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Consumed Service
          </Typography>
          <AutoComplete
            required
            id="serviceDefinition"
            className={classes.input}
            value={this.state.service.serviceDefinition}
            label="Service Definition"
            suggestions={services}
            keyValue="serviceDefinition"
            placeholder="Service Definition"
            handleOnChange={this.onServiceDefinitionChange}
            handleTextChange={this.onServiceDefinitionNameChange}
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: {
                width: '400px',
                marginTop: '20px',
                marginLeft: '20px',
                marginRight: '20px'
              }
            }}
          />
          <ChipInput
            required
            value={this.state.service.interfaces}
            id="interface"
            className={classes.input}
            label="Interface"
            onAdd={chip => this.onChipAdd(chip)}
            onDelete={(chip, index) => this.onChipDelete(chip, index)}
          />
          <Typography variant="subtitle2" style={{ margin: '20px' }}>
            Service Metadata
          </Typography>
          <div>
            {console.log('render', this.state)}
            {this.state.service.serviceMetadata.map(
              ({ name, value }, index) => (
                <div key={index} className={classes.prop}>
                  <TextField
                    label="Name"
                    value={name}
                    className={classes.propKey}
                    onChange={this.onServiceMetadataChange(
                      index,
                      'name',
                      value
                    )}
                  />
                  <TextField
                    label="Value"
                    value={value}
                    className={classes.propValue}
                    onChange={this.onServiceMetadataChange(
                      index,
                      'value',
                      value
                    )}
                  />
                  <IconButton
                    color="secondary"
                    aria-label="Remove Property"
                    onClick={this.removeServiceMetadataProperty(index)}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              )
            )}
          </div>
          <Fab
            className={classes.fabStyle}
            size="small"
            color="secondary"
            aria-label="Add"
            onClick={this.addServiceMetadataProperty}
          >
            <AddIcon />
          </Fab>
        </Card>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Provider System
          </Typography>
          <AutoComplete
            label="Provider System Name"
            handleOnChange={this.onProviderSystemChange}
            handleTextChange={this.onProviderSystemNameChange}
            suggestions={systems}
            keyValue="systemName"
            required
            placeholder="Provider System Name"
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: {
                width: '400px',
                marginTop: '20px',
                marginLeft: '20px',
                marginRight: '20px'
              }
            }}
          />
          <TextField
            value={this.state.providerSystem.address}
            className={classes.input}
            id="address"
            required
            label="Address"
            onChange={this.onProviderAddressChange}
          />
          <TextField
            value={this.state.providerSystem.port}
            className={classes.input}
            id="port"
            label="Port"
            required
            onChange={this.onProviderPortChange}
            type="number"
            inputProps={{ min: '1', max: '65535' }}
          />
          <TextField
            value={this.state.providerSystem.authenticationInfo}
            className={classes.input + ' ' + classes.marginBottom20}
            id="authenticationInfo"
            label="Authentication Info"
            onChange={this.onProviderAuthInfoChange}
          />
        </Card>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Provider Cloud
          </Typography>
          <AutoComplete
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: {
                width: '400px',
                marginTop: '20px',
                marginLeft: '20px',
                marginRight: '20px'
              }
            }}
            suggestions={clouds}
            handleOnChange={this.onProviderCloudChange}
            handleTextChange={this.onProviderCloudNameChange}
            keyValue="cloudName"
            label="Provider Cloud Name"
            placeholder="Provider Cloud Name"
          />
          <TextField
            value={this.state.providerCloud.operator}
            className={classes.input}
            id="operator"
            required
            label="Operator"
            onChange={this.onProviderCloudOperatorChange}
          />
          <TextField
            value={this.state.providerCloud.address}
            className={classes.input}
            id="cloudAddress"
            required
            label="Address"
            onChange={this.onProviderCloudAddressChange}
          />
          <TextField
            value={this.state.providerCloud.port}
            className={classes.input}
            id="cloudPort"
            required
            label="Port"
            type="number"
            inputProps={{ min: '1', max: '65535' }}
            onChange={this.onProviderCloudPortChange}
          />
          <TextField
            value={this.state.providerCloud.gatekeeperServiceURI}
            className={classes.input}
            id="gatekeeperServiceURI"
            required
            label="Gatekeeper Service URI"
            onChange={this.onProviderCloudGatekeeperServiceURIChange}
          />
          <TextField
            value={this.state.providerCloud.authenticationInfo}
            className={classes.input}
            id="cloudAuthInfo"
            required
            label="Authentication Info"
            onChange={this.onProviderCloudAuthInfoChange}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="subtitle2" style={{ margin: '20px' }}>
              Is secure?
            </Typography>
            <Checkbox
              checked={this.state.secure}
              id="secure"
              label="Secure"
              onChange={this.onProviderCloudSecureChange}
            />
          </div>
        </Card>
        <Card raised className={classes.card}>
          <TextField
            value={this.state.priority}
            className={classes.input}
            id="priority"
            required
            label="Priority"
            onChange={this.onPriorityChange}
            type="number"
            inputProps={{ min: '1', max: '999' }}
          />
          <TextField
            value={this.state.serviceURI}
            className={classes.input}
            id="serviceURI"
            required
            label="Service URI"
            onChange={this.onServiceURIChange}
          />
        </Card>
        <Button
          disabled={
            this.state.consumer.systemName === '' ||
            this.state.consumer.address === '' ||
            this.state.consumer.port === '' ||
            this.state.providerSystem.systemName === '' ||
            this.state.providerSystem.address === '' ||
            this.state.providerSystem.port === '' ||
            this.state.providerCloud.operator === '' ||
            this.state.providerCloud.cloudName === '' ||
            this.state.providerCloud.address === '' ||
            this.state.providerCloud.port === '' ||
            this.state.providerCloud.gatekeeperServiceURI === '' ||
            this.state.service.serviceDefinition === '' ||
            this.state.service.interfaces === [] ||
            this.state.priority === '' ||
            this.state.serviceURI === ''
          }
          color="primary"
          onClick={this.onSubmit}
          style={{
            width: '440px',
            marginLeft: '10px',
            padding: '0px'
          }}
        >
          {isEdit ? (
            <p>
              <EditIcon />
              Edit
            </p>
          ) : (
            <p>
              <AddIcon />
              Add
            </p>
          )}
        </Button>
      </div>
    )
  }
}

OrchStoreDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  systems: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  clouds: PropTypes.array.isRequired,
  addStoreEntry: PropTypes.func
}

function mapStateToProps(state) {
  const { orchestrator } = state
  return {
    systems: orchestrator.systems,
    services: orchestrator.services,
    clouds: orchestrator.clouds
  }
}

export default connect(
  mapStateToProps,
  { getOrchestratorServices, getOrchestratorSystems, getOrchestrationClouds }
)(withStyles(styles)(OrchStoreDialog))
