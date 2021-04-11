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
import { getServiceRegistryEntriesView } from '../../../actions/serviceRegistry'
import AutoCompleteSingle from '../../AutoCompleteSingle/AutoCompleteSingle'

const styles = (theme) => ({
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

    const attributeHelper = []
    if (props.data) {
      for (const key in props.data.attribute) {
        attributeHelper.push({
          name: key,
          value: props.data.attribute[key]
        })
      }
    }
    if (!attributeHelper.length) {
      attributeHelper.push({ name: '', value: '' })
    }

    this.state = {
      consumerSystem: props.data ? props.data.consumerSystem : {},
      providerSystem: props.data ? props.data.providerSystem : {},
      serviceDefinition: props.data ? props.data.serviceDefinition : {},
      serviceInterface: props.data ? props.data.serviceInterface : {},
      priority: props.data ? props.data.priority : '',
      attribute: attributeHelper
    }
  }

  componentDidMount() {
    this.props.getServiceRegistryEntriesView()
  }

  handleConsumerSystemOnChange = (consumerSystem) => {
    this.setState({ consumerSystem })
  }

  handleProvidedServiceOnChange = (serviceDefinition) => {
    this.setState({ serviceDefinition })
  }

  handleInterfaceOnChange = (serviceInterface) => {
    this.setState({ serviceInterface })
  }

  onAttributeChange = (index, key) => (event) => {
    const metadataArray = [...this.state.attribute]
    metadataArray[index][key] = event.target.value
    this.setState({
      attribute: metadataArray
    })
  }

  removeAttributeProperty = (removeIndex) => () => {
    this.setState({
      attribute: [
        ...this.state.attribute.slice(0, removeIndex),
        ...this.state.attribute.slice(removeIndex + 1)
      ]
    })
  }

  addAttribute = () => {
    this.setState({
      attribute: [...this.state.attribute, { name: '', value: '' }]
    })
  }

  onProviderSystemChange = (providerSystem) => {
    if (providerSystem !== undefined) {
      this.setState({ providerSystem })
    }
  }

  onProviderSystemNameChange = (systemName) => {
    this.setState({
      providerSystem: { ...this.state.providerSystem, systemName, id: null }
    })
  }

  onProviderAddressChange = (event) => {
    this.setState({
      providerSystem: {
        ...this.state.providerSystem,
        address: event.target.value,
        id: null
      }
    })
  }

  onProviderPortChange = (event) => {
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

  onProviderAuthInfoChange = (event) => {
    this.setState({
      providerSystem: {
        ...this.state.providerSystem,
        authenticationInfo: event.target.value,
        id: null
      }
    })
  }

  onPriorityChange = (event) => {
    if (
      event.target.value === '' ||
      (event.target.value > 0 && event.target.value <= 999)
    ) {
      this.setState({
        priority: event.target.value
      })
    }
  }

  onSubmit = () => {
    const attributeHelper = {}
    for (const item of this.state.attribute) {
      if (item.name !== '' || item.value !== '') {
        attributeHelper[item.name] = item.value
      }
    }

    const data = {
      attribute: attributeHelper,
      consumerSystemId: this.state.consumerSystem.id,
      priority: this.state.priority,
      providerSystem: this.state.providerSystem,
      serviceDefinitionName: this.state.serviceDefinition.value,
      serviceInterfaceName: this.state.serviceInterface.value
    }

    if (this.props.isEdit) {
      this.props.editStoreEntry(data, this.props.id)
    } else {
      this.props.addStoreEntry(data)
    }
    this.props.closeModal()
  }

  render() {
    const {
      classes,
      systems,
      services,
      interfaces,
      isEdit = false
    } = this.props

    return (
      <div>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Consumer System
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
            suggestions={systems}
            handleOnChange={this.handleConsumerSystemOnChange}
            keyValue="systemName"
            required
            placeholder="Consumer System"
            label="Consumer System"
          />
        </Card>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Consumed Service
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
            keyValue="value"
            label="Consumed Service"
            placeholder="Consumed Service"
            handleTextChange={null}
            required
            handleOnChange={this.handleProvidedServiceOnChange}
          />
          <AutoCompleteSingle
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: {
                width: '400px',
                marginTop: '20px',
                marginLeft: '20px'
              }
            }}
            suggestions={interfaces}
            keyValue="value"
            label="Interface"
            placeholder="Interface"
            handleTextChange={null}
            required
            handleOnChange={this.handleInterfaceOnChange}
          />
          <Typography variant="subtitle2" style={{ margin: '20px' }}>
            Attributes
          </Typography>
          <div>
            {this.state.attribute.map(({ name, value }, index) => (
              <div key={index} className={classes.prop}>
                <TextField
                  label="Name"
                  value={name}
                  className={classes.propKey}
                  onChange={this.onAttributeChange(index, 'name', value)}
                />
                <TextField
                  label="Value"
                  value={value}
                  className={classes.propValue}
                  onChange={this.onAttributeChange(index, 'value', value)}
                />
                <IconButton
                  color="secondary"
                  aria-label="Remove Property"
                  onClick={this.removeAttributeProperty(index)}
                >
                  <ClearIcon />
                </IconButton>
              </div>
            ))}
          </div>
          <Fab
            className={classes.fabStyle}
            size="small"
            color="secondary"
            aria-label="Add"
            onClick={this.addAttribute}
          >
            <AddIcon />
          </Fab>
        </Card>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Provider System
          </Typography>
          <AutoComplete
            defaultValue={this.state.providerSystem.systemName}
            label="Provider System Name"
            handleOnChange={this.onProviderSystemChange}
            handleTextChange={this.onProviderSystemNameChange}
            suggestions={systems}
            keyValue="systemName"
            required
            isEdit={isEdit}
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
        </Card>
        <Button
          disabled={
            this.state.consumerSystem === {} ||
            this.state.providerSystem === {} ||
            this.state.serviceDefinition === {} ||
            this.state.serviceInterface === {} ||
            this.state.priority === ''
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

/*
  Removed Provider Cloud Card
 <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Provider Cloud
          </Typography>
          <AutoComplete
            defaultValue={this.state.providerCloud.cloudName}
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: {
                width: '400px',
                marginTop: '20px',
                marginLeft: '20px',
                marginRight: '20px'
              }
            }}
            isEdit={isEdit}
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
 */

OrchStoreDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  systems: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  clouds: PropTypes.array.isRequired,
  addStoreEntry: PropTypes.func,
  editStoreEntry: PropTypes.func,
  data: PropTypes.object,
  id: PropTypes.number,
  getServiceRegistryEntriesView: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { services } = state
  return {
    systems: services.autoCompleteData.systemList,
    services: services.autoCompleteData.serviceList,
    interfaces: services.autoCompleteData.interfaceList
  }
}

export default connect(mapStateToProps, { getServiceRegistryEntriesView })(
  withStyles(styles)(OrchStoreDialog)
)
