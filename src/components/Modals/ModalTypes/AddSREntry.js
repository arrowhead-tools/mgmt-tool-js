import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import Button from '../../CustomButtons/Button'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Card from '@material-ui/core/Card'
import Checkbox from '@material-ui/core/Checkbox'
import ChipInput from 'material-ui-chip-input'
import AutoComplete from '../../AutoComplete/AutoComplete'
import { getSystems } from '../../../actions/system'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { addSREntry, editSREntry, getServiceById } from '../../../actions/serviceRegistry'
import _ from 'lodash'

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
  }
})

class AddSREntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      SREntryId: null,
      providedServiceId: null,
      systemId: null,
      systemName: '',
      address: '',
      port: '',
      authenticationInfo: '',
      serviceDefinition: '',
      serviceMetadata: [{ name: '', value: '' }],
      interface: [],
      serviceURI: '',
      UDP: '',
      endOfValidity: '',
      version: ''
    }
  }

  componentDidMount() {
    this.props.getSystems()
    if (this.props.isEdit && this.props.serviceId) {
      this.props.getServiceById(this.props.serviceId)
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isEdit && nextProps.serviceId && !_.isEmpty(nextProps.serviceData) &&
      nextProps.serviceData[nextProps.serviceId].id !== prevState.SREntryId) {
      const serviceMetadata = []
      if (nextProps.serviceData[nextProps.serviceId].providedService.serviceMetadata === undefined || nextProps.serviceData[nextProps.serviceId].providedService.serviceMetadata === {}) {
        serviceMetadata.push({ name: '', value: '' })
      } else {
        for (const key in nextProps.serviceData[nextProps.serviceId].providedService.serviceMetadata) {
          serviceMetadata.push({
            name: key,
            value: nextProps.serviceData[nextProps.serviceId].providedService.serviceMetadata[key]
          })
        }
      }
      return {
        SREntryId: nextProps.serviceData[nextProps.serviceId].id,
        providedServiceId: nextProps.serviceData[nextProps.serviceId].providedService.id,
        serviceDefinition: nextProps.serviceData[nextProps.serviceId].providedService.serviceDefinition,
        interface: nextProps.serviceData[nextProps.serviceId].providedService.interfaces,
        systemId: nextProps.serviceData[nextProps.serviceId].provider.id,
        systemName: nextProps.serviceData[nextProps.serviceId].provider.systemName,
        address: nextProps.serviceData[nextProps.serviceId].provider.address,
        port: nextProps.serviceData[nextProps.serviceId].provider.port,
        authenticationInfo: nextProps.serviceData[nextProps.serviceId].provider.authenticationInfo,
        serviceMetadata,
        serviceURI: nextProps.serviceData[nextProps.serviceId].serviceURI,
        UDP: !!nextProps.serviceData[nextProps.serviceId].udp,
        endOfValidity: nextProps.serviceData[nextProps.serviceId].endOfValidity,
        version: nextProps.serviceData[nextProps.serviceId].version
      }
    } else {
      return null
    }
  }

  handleSystemSearchOnChange = value => {
    if (value !== undefined) {
      this.setState({
        systemId: value.id,
        systemName: value.systemName,
        address: value.address,
        port: value.port,
        authenticationInfo: value.authenticationInfo
      })
    }
  }

  handleSystemNameOnChange = value => {
    this.setState({ systemName: value, systemId: null })
  }

  handleAddressOnChange = event => {
    this.setState({ address: event.target.value })
  }

  handlePortOnChange = event => {
    if (event.target.value === '' || (event.target.value > 0 && event.target.value <= 65536)) {
      this.setState({ port: event.target.value })
    }
  }

  handleAuthenticationInfoOnChange = event => {
    this.setState({ authenticationInfo: event.target.value })
  }

  handleServiceDefinitionOnChange = event => {
    this.setState({ serviceDefinition: event.target.value })
  }

  handleServiceURIOnChange = event => {
    this.setState({ serviceURI: event.target.value })
  }

  handleUDPOnChange = event => {
    this.setState({ UDP: event.target.checked })
  }

  handleEndOfValidityOnChange = event => {
    this.setState({ endOfValidity: event.target.value })
  }

  handleVersionChange = event => {
    this.setState({ version: event.target.value })
  }

  handleAddSREntryButtonClick = () => {
    if (this.props.isEdit) {
      this.props.editSREntry(this.state.systemId, this.state.systemName, this.state.address, this.state.port, this.state.authenticationInfo,
        this.state.serviceDefinition, this.state.serviceMetadata, this.state.interface, this.state.serviceURI,
        this.state.UDP, this.state.endOfValidity, this.state.version)
    } else {
      this.props.addSREntry(this.state.systemId, this.state.systemName, this.state.address, this.state.port, this.state.authenticationInfo,
        this.state.serviceDefinition, this.state.serviceMetadata, this.state.interface, this.state.serviceURI,
        this.state.UDP, this.state.endOfValidity, this.state.version)
    }
  }

  addServiceMetadataPropertyAdd = () => {
    this.setState({ serviceMetadata: [...this.state.serviceMetadata, { name: '', value: '' }] })
  }

  handleInterfaceChipsOnChange = chips => {
    this.setState({ interface: chips })
  }

  handleServiceMetadataChange = (index, key) => event => {
    const metadataArray = this.state.serviceMetadata
    metadataArray[index][key] = event.target.value
    this.setState({ serviceMetadata: metadataArray })
  }

  removeServiceMetadataProperty = (removeIndex) => () => {
    this.setState({ serviceMetadata: [...this.state.serviceMetadata.slice(0, removeIndex), ...this.state.serviceMetadata.slice(removeIndex + 1)] })
  }

  render() {
    const { classes, system, isEdit = false } = this.props
    return (
      <div>
        <Card raised style={{ display: 'flex', flexDirection: 'column', margin: '10px', width: '440px' }}>
          <Typography variant='headline' align='center' style={{ paddingTop: '10px' }}>System Details</Typography>
          <AutoComplete
            defaultValue={this.state.systemName || ''}
            suggestions={system}
            required
            disabled={isEdit}
            label='System Name'
            keyValue='systemName'
            handleTextChange={this.handleSystemNameOnChange}
            placeholder='System Name'
            id='system_search'
            handleOnChange={this.handleSystemSearchOnChange}
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: { width: '400px', marginTop: '20px', marginLeft: '20px', marginRight: '20px' }
            }} />
          <TextField
            value={this.state.address}
            className={classes.input}
            id='address'
            required
            disabled={isEdit}
            label='Address'
            onChange={this.handleAddressOnChange}
          />
          <TextField
            className={classes.input}
            id='port'
            label='Port'
            required
            disabled={isEdit}
            onChange={this.handlePortOnChange}
            value={this.state.port}
            type='number'
            inputProps={{
              min: '1',
              max: '65535'
            }}
          />
          <TextField
            className={classes.input}
            id='authenticationInfo'
            label='Authentication Info'
            disabled={isEdit}
            onChange={this.handleAuthenticationInfoOnChange} />
        </Card>
        <Card raised style={{ display: 'flex', flexDirection: 'column', margin: '10px', width: '440px' }}>
          <Typography variant='headline' align='center' style={{ paddingTop: '10px' }}>Service Details</Typography>
          <TextField
            required
            id='serviceDefinition'
            className={classes.input}
            value={this.state.serviceDefinition}
            disabled={isEdit}
            label='Service Definition'
            onChange={this.handleServiceDefinitionOnChange} />
          <ChipInput
            required
            value={this.state.interface}
            id='interface'
            disabled={isEdit}
            className={classes.input}
            label='Interface'
            onChange={this.handleInterfaceChipsOnChange} />
          <Typography variant='subtitle2' style={{ margin: '20px' }}>Service Metadata</Typography>
          <div>
            {this.state.serviceMetadata.map(({ name, value }, index) => (
              <div key={index} className={classes.prop}>
                <TextField
                  label='Name'
                  value={name}
                  disabled={isEdit}
                  className={classes.propKey}
                  onChange={this.handleServiceMetadataChange(index, 'name', value)}
                />
                <TextField
                  label='Value'
                  value={value}
                  disabled={isEdit}
                  className={classes.propValue}
                  onChange={this.handleServiceMetadataChange(index, 'value', value)}
                />
                <IconButton
                  color='secondary'
                  disabled={isEdit}
                  aria-label='Remove Property'
                  onClick={this.removeServiceMetadataProperty(index)}><ClearIcon /></IconButton>
              </div>
            ))}
          </div>
          <Fab
            className={classes.fabStyle}
            size='small' color='secondary'
            aria-label='Add'
            disabled={isEdit}
            onClick={this.addServiceMetadataPropertyAdd}><AddIcon /></Fab>
          <TextField
            required
            id='serviceURI'
            value={this.state.serviceURI}
            className={classes.input}
            label='Service URI'
            onChange={this.handleServiceURIOnChange}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant='subtitle2' style={{ margin: '20px' }}>is UDP?</Typography>
            <Checkbox
              checked={this.state.UDP}
              id='udp'
              disabled={isEdit}
              label='UDP'
              onChange={this.handleUDPOnChange}
            />
          </div>
          <TextField
            type='datetime-local'
            id='endOfValidity'
            className={classes.input}
            defaultValue={moment().format('YYYY-MM-DDTHH:mm:ss')}
            label='End of Validity'
            onChange={this.handleEndOfValidityOnChange}
          />
          <TextField
            value={this.state.version}
            id='version'
            disabled={isEdit}
            className={classes.input}
            label='Service Version' type='number'
            onChange={this.handleVersionChange}
            inputProps={{
              min: '1'
            }} />
        </Card>
        <Button
          disabled={this.state.systemName === '' || this.state.address === '' || this.state.port === '' || this.state.serviceURI === '' || this.state.serviceDefinition === '' || this.state.interface === []}
          color='primary'
          onClick={this.handleAddSREntryButtonClick}
          style={{
            width: '440px',
            marginLeft: '10px',
            padding: '0px'
          }}>{isEdit ? (<p><EditIcon />Edit</p>) : (<p><AddIcon />Add</p>)}</Button>
      </div>
    )
  }
}

AddSREntry.propTypes = {
  classes: PropTypes.object.isRequired,
  getSystems: PropTypes.func.isRequired,
  addSREntry: PropTypes.func.isRequired,
  editSREntry: PropTypes.func.isRequired,
  system: PropTypes.array.isRequired,
  isEdit: PropTypes.bool,
  serviceData: PropTypes.object,
  serviceId: PropTypes.number,
  getServiceById: PropTypes.func
}

function mapStateToProps(state) {
  const { system, services } = state
  return { system: system.system, serviceData: services.serviceData }
}

function mapDispatchToProps(dispatch) {
  return {
    getSystems: () => {
      dispatch(getSystems())
    },
    addSREntry: (
      systemId, systemName, address, port, authenticationInfo,
      serviceDefinition, serviceMetadata, interfaces, serviceURI,
      udp, endOfValidity, version) => {
      dispatch(addSREntry(systemId, systemName, address, port, authenticationInfo,
        serviceDefinition, serviceMetadata, interfaces, serviceURI,
        udp, endOfValidity, version))
    },
    editSREntry: (
      systemId, systemName, address, port, authenticationInfo,
      serviceDefinition, serviceMetadata, interfaces, serviceURI,
      udp, endOfValidity, version) => {
      dispatch(editSREntry(systemId, systemName, address, port, authenticationInfo,
        serviceDefinition, serviceMetadata, interfaces, serviceURI,
        udp, endOfValidity, version))
    },
    getServiceById: (serviceId) => {
      dispatch(getServiceById(serviceId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddSREntry))
