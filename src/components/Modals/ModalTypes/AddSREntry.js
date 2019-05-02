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
import { DateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import {
  addSREntry,
  editSREntryCollection,
  getServiceById
} from '../../../actions/serviceRegistry'
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
      for (const key in props.data.providedService.serviceMetadata) {
        serviceMetadata.push({
          name: key,
          value: props.data.providedService.serviceMetadata[key]
        })
      }
    }
    if (!serviceMetadata.length) {
      serviceMetadata.push({ name: '', value: '' })
    }

    const serviceData = {
      ...(props.data && props.data.providedService),
      serviceMetadata
    }

    this.state = {
      id: props.data ? props.data.id : null,
      providedService: {
        id: '',
        interfaces: [],
        serviceDefinition: '',
        ...serviceData
      },
      provider: {
        id: '',
        address: '',
        port: '',
        systemName: '',
        ...(props.data && props.data.provider)
      },
      serviceURI: props.data ? props.data.serviceURI : '',
      udp: props.data ? props.data.udp : '',
      version: props.data ? props.data.version : '',
      endOfValidity: props.data ? props.data.endOfValidity : ''
    }
  }

  componentDidMount() {
    this.props.getSystems()
  }

  handleSystemSearchOnChange = value => {
    if (value !== undefined) {
      this.setState({
        provider: value
      })
    }
  }

  handleSystemNameOnChange = value => {
    this.setState({
      provider: {
        ...this.state.provider,
        systemName: value,
        id: null
      }
    })
  }

  handleAddressOnChange = event => {
    this.setState({
      provider: {
        ...this.state.provider,
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
        provider: {
          ...this.state.provider,
          port: event.target.value
        }
      })
    }
  }

  handleAuthenticationInfoOnChange = event => {
    this.setState({
      provider: {
        ...this.state.provider,
        authenticationInfo: event.target.value
      }
    })
  }

  handleServiceDefinitionOnChange = event => {
    this.setState({
      providedService: {
        ...this.state.providedService,
        serviceDefinition: event.target.value
      }
    })
  }

  handleServiceURIOnChange = event => {
    this.setState({
      serviceURI: event.target.value
    })
  }

  handleUDPOnChange = event => {
    this.setState({
      providedService: {
        ...this.state.providedService,
        udp: event.target.checked
      }
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
      'YYYY-MM-DDTHH:mm:ss'
    )

    const serviceMetadataHelper = {}
    for (const item of this.state.providedService.serviceMetadata) {
      if (item.name !== '' || item.value !== '') {
        serviceMetadataHelper[item.name] = item.value
      }
    }

    const entry = {
      ...this.state,
      endOfValidity,
      providedService: {
        ...this.state.providedService,
        serviceMetadata: serviceMetadataHelper
      }
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
      providedService: {
        ...this.state.providedService,
        serviceMetadata: [
          ...this.state.providedService.serviceMetadata,
          { name: '', value: '' }
        ]
      }
    })
  }

  handleChipAdd = chip => {
    this.setState({
      providedService: {
        ...this.state.providedService,
        interfaces: [...this.state.providedService.interfaces, chip]
      }
    })
  }

  handleDeleteChip = (deletedChip, index) => {
    this.setState({
      providedService: {
        ...this.state.providedService,
        interfaces: this.state.providedService.interfaces.filter(
          c => c !== deletedChip
        )
      }
    })
  }

  handleServiceMetadataChange = (index, key) => event => {
    const metadataArray = [...this.state.providedService.serviceMetadata]
    metadataArray[index][key] = event.target.value
    this.setState({
      providedService: {
        ...this.state.providedService,
        serviceMetadata: metadataArray
      }
    })
  }

  removeServiceMetadataProperty = removeIndex => () => {
    this.setState({
      providedService: {
        ...this.state.providedService,
        serviceMetadata: [
          ...this.state.providedService.serviceMetadata.slice(0, removeIndex),
          ...this.state.providedService.serviceMetadata.slice(removeIndex + 1)
        ]
      }
    })
  }

  render() {
    const { classes, system, isEdit = false } = this.props
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
            defaultValue={this.state.provider.systemName}
            suggestions={system}
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
            value={this.state.provider.address}
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
            value={this.state.provider.port}
            type="number"
            inputProps={{
              min: '1',
              max: '65535'
            }}
          />
          <TextField
            value={this.state.provider.authenticationInfo}
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
            value={this.state.providedService.serviceDefinition}
            label="Service Definition"
            onChange={this.handleServiceDefinitionOnChange}
          />
          <ChipInput
            required
            value={this.state.providedService.interfaces}
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
            {this.state.providedService.serviceMetadata.map(
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
            value={this.state.serviceURI}
            className={classes.input}
            label="Service URI"
            onChange={this.handleServiceURIOnChange}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="subtitle2" style={{ margin: '20px' }}>
              is UDP?
            </Typography>
            <Checkbox
              checked={this.state.udp}
              id="udp"
              label="UDP"
              onChange={this.handleUDPOnChange}
            />
          </div>
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
  getSystems: PropTypes.func.isRequired,
  addSREntry: PropTypes.func.isRequired,
  system: PropTypes.array.isRequired,
  isEdit: PropTypes.bool,
  editSREntry: PropTypes.func,
  closeModal: PropTypes.func
}

function mapStateToProps(state) {
  const { system } = state
  return { system: system.system }
}

function mapDispatchToProps(dispatch) {
  return {
    getSystems: () => {
      dispatch(getSystems())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddSREntry))
