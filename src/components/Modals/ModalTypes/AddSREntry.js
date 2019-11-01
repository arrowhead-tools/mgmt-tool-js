import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import * as PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import Button from '../../CustomButtons/Button'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Card from '@material-ui/core/Card'
import SecureDropdown from '../../Dropdown/SecureDropdown'
import ChipInput from 'material-ui-chip-input'
import AutoComplete from '../../AutoComplete/AutoComplete'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { DateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'

moment.locale('hu')

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

    const serviceMetadata = []
    if (props.data) {
      for (const key in props.data.metadata) {
        serviceMetadata.push({
          name: key,
          value: props.data.metadata[key]
        })
      }
    }
    if (!serviceMetadata.length) {
      serviceMetadata.push({ name: '', value: '' })
    }

    let interfaceHelper = []
    if(props.data) {
      interfaceHelper = props.data.interfaces.map(iface => iface.interfaceName)
    }

    this.state = {
      id: props.data ? props.data.id : undefined,
      endOfValidity: props.data ? moment(props.data.endOfValidity) : moment().add(2, 'days'),
      interfaces: interfaceHelper,
      metadata: serviceMetadata,
      providerSystem: {
        id: '',
        address: '',
        authenticationInfo: '',
        port: '',
        systemName: '',
        ...(props.data && props.data.provider)
      },
      secure: props.data && props.data.secure ? props.data.secure : 'NOT_SECURE',
      serviceDefinition: props.data && props.data.serviceDefinition && props.data.serviceDefinition.serviceDefinition ? props.data.serviceDefinition.serviceDefinition : '',
      serviceUri: props.data ? props.data.serviceUri : '',
      version: props.data ? props.data.version : '',

    }
  }

  handleSystemSearchOnChange = value => {
    if (value !== undefined) {
      this.setState({
        providerSystem: value
      })
    }
  }

  handleSystemNameOnChange = value => {
    this.setState({
      providerSystem: {
        ...this.state.providerSystem,
        systemName: value,
        id: undefined
      }
    })
  }

  handleAddressOnChange = event => {
    this.setState({
      providerSystem: {
        ...this.state.providerSystem,
        address: event.target.value
      }
    })
  }

  handlePortOnChange = event => {
    if (
      event.target.value === '' ||
      (event.target.value > 0 && event.target.value <= 65536)
    ) {
      this.setState({
        providerSystem: {
          ...this.state.providerSystem,
          port: event.target.value
        }
      })
    }
  }

  handleAuthenticationInfoOnChange = event => {
    this.setState({
      providerSystem: {
        ...this.state.providerSystem,
        authenticationInfo: event.target.value
      }
    })
  }

  handleServiceDefinitionOnChange = event => {
    this.setState({
      serviceDefinition: event.target.value
    })
  }

  handleServiceURIOnChange = event => {
    this.setState({
      serviceUri: event.target.value
    })
  }

  handleSecureChange = event =>{
    console.log('secure', event.target.value)
    this.setState( {
      secure: event.target.value
    })
  }

  handleEndOfValidityOnChange = date => {
    this.setState({ endOfValidity: date })
  }

  handleVersionChange = event => {
    this.setState({ version: event.target.value })
  }

  handleAddSREntryButtonClick = () => {
    const endOfValidity = moment(this.state.endOfValidity).format(
      'YYYY-MM-DD HH:mm:ss'
    )

    const metadataHelper = {}
    for (const item of this.state.metadata) {
      if (item.name !== '' || item.value !== '') {
        metadataHelper[item.name] = item.value
      }
    }

    const entry = {
      ...this.state,
      endOfValidity,
      metadata: metadataHelper
    }

    if (this.props.isEdit) {
      this.props.editSREntry(entry)
    } else {
      this.props.addSREntry(entry)
    }
    this.props.closeModal()
  }

  addServiceMetadataPropertyAdd = () => {
    this.setState({
        metadata: [
          ...this.state.metadata,
          { name: '', value: '' }
        ]
    })
  }

  handleChipAdd = chip => {
    this.setState({
      interfaces: [...this.state.interfaces, chip]
    })
  }

  handleDeleteChip = (deletedChip, index) => {
    this.setState({
        interfaces: this.state.interfaces.filter(
          c => c !== deletedChip
        )
      }
    )
  }

  handleServiceMetadataChange = (index, key) => event => {
    const metadataArray = [...this.state.metadata]
    metadataArray[index][key] = event.target.value
    this.setState({
      metadata: metadataArray
    })
  }

  removeServiceMetadataProperty = removeIndex => () => {
    this.setState({
      metadata: [
        ...this.state.metadata.slice(0, removeIndex),
        ...this.state.metadata.slice(removeIndex + 1)
      ]
    })
  }

  render() {
    const { classes, autoCompleteData, isEdit = false } = this.props
    return (
      <div>
        <Card
          raised
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
            width: '440px'
          }}
        >
          <Typography
            variant="h5"
            align="center"
            style={{ paddingTop: '10px' }}
          >
            System Details
          </Typography>
          <AutoComplete
            defaultValue={this.state.providerSystem.systemName}
            suggestions={autoCompleteData.systemList}
            required
            isEdit
            label="System Name"
            keyValue="systemName"
            handleTextChange={this.handleSystemNameOnChange}
            placeholder="System Name"
            id="system_search"
            handleOnChange={this.handleSystemSearchOnChange}
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
            onChange={this.handleAddressOnChange}
          />
          <TextField
            className={classes.input}
            id="port"
            label="Port"
            required
            onChange={this.handlePortOnChange}
            value={this.state.providerSystem.port}
            type="number"
            inputProps={{
              min: '1',
              max: '65535'
            }}
          />
          <TextField
            value={this.state.providerSystem.authenticationInfo}
            className={classes.input}
            id="authenticationInfo"
            label="Authentication Info"
            onChange={this.handleAuthenticationInfoOnChange}
          />
        </Card>
        <Card
          raised
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
            width: '440px'
          }}
        >
          <Typography
            variant="h5"
            align="center"
            style={{ paddingTop: '10px' }}
          >
            Service Details
          </Typography>
          <TextField
            required
            id="serviceDefinition"
            className={classes.input}
            value={this.state.serviceDefinition}
            label="Service Definition"
            onChange={this.handleServiceDefinitionOnChange}
          />
          <SecureDropdown value={this.state.secure} handleSecureChange={this.handleSecureChange} classes={classes}/>
          <ChipInput
            required
            value={this.state.interfaces}
            id="interfaces"
            className={classes.input}
            label="Interfaces"
            onAdd={chip => this.handleChipAdd(chip)}
            onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
          />
          <Typography variant="subtitle2" style={{ margin: '20px' }}>
            Service Metadata
          </Typography>
          <div>
            {this.state.metadata.map(
              ({ name, value }, index) => (
                <div key={index} className={classes.prop}>
                  <TextField
                    label="Name"
                    value={name}
                    className={classes.propKey}
                    onChange={this.handleServiceMetadataChange(
                      index,
                      'name',
                      value
                    )}
                  />
                  <TextField
                    label="Value"
                    value={value}
                    className={classes.propValue}
                    onChange={this.handleServiceMetadataChange(
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
            onClick={this.addServiceMetadataPropertyAdd}
          >
            <AddIcon />
          </Fab>
          <TextField
            required
            id="serviceURI"
            value={this.state.serviceUri}
            className={classes.input}
            label="Service URI"
            onChange={this.handleServiceURIOnChange}
          />
          <MuiPickersUtilsProvider
            utils={MomentUtils}
            moment={moment}
            locale={{ hu: 'hu' }}
          >
            <div>
              <DateTimePicker
                disablePast
                showTodayButton
                className={classes.input}
                ampm={false}
                label="End of Validity"
                value={this.state.endOfValidity}
                onChange={this.handleEndOfValidityOnChange}
              />
            </div>
          </MuiPickersUtilsProvider>
          <TextField
            value={this.state.version}
            id="version"
            className={classes.input}
            label="Service Version"
            type="number"
            onChange={this.handleVersionChange}
            inputProps={{
              min: '1'
            }}
          />
        </Card>
        <Button
          disabled={
            false // TODO
          }
          color="primary"
          onClick={this.handleAddSREntryButtonClick}
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

AddSREntry.propTypes = {
  classes: PropTypes.object.isRequired,
  addSREntry: PropTypes.func,
  isEdit: PropTypes.bool,
  editSREntry: PropTypes.func,
  closeModal: PropTypes.func
}

function mapStateToProps(state) {
  const { services } = state
  return { autoCompleteData: services.autoCompleteData }
}

export default connect(
  mapStateToProps
)(withStyles(styles)(AddSREntry))
