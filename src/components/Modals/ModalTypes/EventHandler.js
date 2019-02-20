import React, { Component } from 'react'
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
import { withStyles } from '@material-ui/core/styles'
import AutoComplete from '../../AutoComplete/AutoComplete'
import { getEventHandlerSystems } from '../../../actions/eventHandler'
import { connect } from 'react-redux'
import AutoCompleteMulti from '../../AutoCompleteMulti/AutoCompleteMulti'
import Checkbox from '@material-ui/core/Checkbox'
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
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    width: '440px'
  },
  buttonStyle: {
    width: '440px',
    marginLeft: '10px'
  }
})

class EventHandler extends Component {
  constructor(props) {
    super(props)

    const { event = {} } = props

    const filterMetadataHelper = []
    if (event.filterMetadata) {
      _.forEach(event.filterMetadata, (value, name) => {
        filterMetadataHelper.push({ name, value })
      })
    }

    if (filterMetadataHelper.length === 0) {
      filterMetadataHelper.push({ name: '', value: '' })
    }

    this.state = {
      id: event ? event.id : null,
      eventType: event ? event.eventType : '',
      consumerSystemId: event && event.consumer ? event.consumer.id : null,
      consumerSystemName:
        event && event.consumer ? event.consumer.systemName : '',
      consumerSystemAddress:
        event && event.consumer ? event.consumer.address : '',
      consumerSystemPort: event && event.consumer ? event.consumer.port : '',
      consumerSystemAuthentication: event.consumer
        ? event.consumer.authenticationInfo
        : '',
      sources: event.sources || [],
      filterMetadata: filterMetadataHelper,
      notifyUri: event.notifyUri || '',
      matchMetadata: event.matchMetadata
    }
  }

  componentDidMount() {
    this.props.getEventHandlerSystems()
  }

  onEventTypeTextChange = eventType => {
    this.setState({ eventType })
  }

  onEventTypeChange = eventType => {
    if (eventType !== undefined) {
      this.setState({
        eventType
      })
    }
  }

  onConsumerSystemChange = consumerSystem => {
    if (consumerSystem !== undefined) {
      this.setState({
        consumerSystemId: consumerSystem.id,
        consumerSystemName: consumerSystem.systemName,
        consumerSystemAddress: consumerSystem.address,
        consumerSystemPort: consumerSystem.port,
        consumerSystemAuthentication: consumerSystem.authenticationInfo
      })
    }
  }

  onConsumerSystemNameChange = systemName => {
    this.setState({ consumerSystemName: systemName })
  }

  onConsumerSystemAddressChange = event => {
    this.setState({ consumerSystemAddress: event.target.value })
  }

  onConsumerSystemPortChange = event => {
    if (
      event.target.value === '' ||
      (event.target.value > 0 && event.target.value <= 65536)
    ) {
      this.setState({ consumerSystemPort: event.target.value })
    }
  }

  onConsumerSystemAuthChange = event => {
    this.setState({ consumerSystemAuthentication: event.target.value })
  }

  onSourceSystemChange = sourceSystems => {
    this.setState({ sources: sourceSystems })
  }

  onFilterMetadataChange = (index, key) => event => {
    const metadataArray = this.state.filterMetadata
    metadataArray[index][key] = event.target.value
    this.setState({ filterMetadata: metadataArray })
  }

  removeFilterMetadataProperty = removeIndex => () => {
    this.setState({
      filterMetadata: [
        ...this.state.filterMetadata.slice(0, removeIndex),
        ...this.state.filterMetadata.slice(removeIndex + 1)
      ]
    })
  }

  addFilterMetadataProperty = () => {
    this.setState({
      filterMetadata: [...this.state.filterMetadata, { name: '', value: '' }]
    })
  }

  onNotifyUriChange = event => {
    this.setState({ notifyUri: event.target.value })
  }

  onMatchMetadataChange = event => {
    this.setState({ matchMetadata: event.target.checked })
  }

  onSubmit = () => {
    const filterMetadataHelper = {}
    for (const item of this.state.filterMetadata) {
      if (item.name !== '' || item.value !== '') {
        filterMetadataHelper[item.name] = item.value
      }
    }
    const subscriptionData = {
      eventType: this.state.eventType,
      consumer: {
        id: this.state.consumerSystemId,
        systemName: this.state.consumerSystemName,
        address: this.state.consumerSystemAddress,
        port: this.state.consumerSystemPort,
        authenticationInfo: this.state.consumerSystemAuthentication
      },
      sources: this.state.sources,
      filterMetadata: filterMetadataHelper,
      notifyUri: this.state.notifyUri,
      matchMetadata: this.state.matchMetadata
    }
    if (this.props.isEdit) {
      subscriptionData.id = this.state.id
      this.props.modifySubscription(subscriptionData, this.props.event.id)
    } else {
      delete subscriptionData.consumer.id
      this.props.createSubscription(subscriptionData)
    }
    this.props.closeModal()
  }

  render() {
    const { systems, classes, isEdit, eventNames } = this.props
    console.log('isEdit', isEdit)
    return (
      <div>
        <Card raised className={classes.card}>
          <AutoComplete
            suggestions={eventNames}
            defaultValue={this.state.eventType}
            id="eventType"
            required
            isEdit={isEdit}
            placeholder='Event Type'
            keyValue='eventType'
            label="Event Type"
            handleOnChange={this.onEventTypeChange}
            handleTextChange={this.onEventTypeTextChange}
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: {
                width: '400px',
                margin: '20px'
              }
            }}
          />
        </Card>
        <Card raised className={classes.card}>
          <AutoComplete
            handleOnChange={this.onConsumerSystemChange}
            handleTextChange={this.onConsumerSystemNameChange}
            suggestions={systems}
            defaultValue={this.state.consumerSystemName}
            isEdit={isEdit}
            keyValue="systemName"
            label="Consumer System"
            placeholder="Consumer System"
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
            value={this.state.consumerSystemAddress}
            className={classes.input}
            id="address"
            required
            label="Address"
            onChange={this.onConsumerSystemAddressChange}
          />
          <TextField
            value={this.state.consumerSystemPort}
            className={classes.input}
            id="port"
            required
            label="Port"
            type="number"
            inputProps={{
              min: '1',
              max: '65535'
            }}
            onChange={this.onConsumerSystemPortChange}
          />
          <TextField
            value={this.state.consumerSystemAuthentication}
            className={classes.input}
            id="authentication_info"
            label="Authentication Info"
            onChange={this.onConsumerSystemAuthChange}
          />
        </Card>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Sources
          </Typography>
          <AutoCompleteMulti
            handleOnChange={this.onSourceSystemChange}
            label="Sources"
            placeholder="Sources"
            keyValue="systemName"
            suggestions={systems}
          />
        </Card>
        <Card raised className={classes.card}>
          <Typography variant="subtitle2" style={{ margin: '20px' }}>
            Filter Metadata
          </Typography>
          <div>
            {this.state.filterMetadata.map(({ name, value }, index) => (
              <div key={index} className={classes.prop}>
                <TextField
                  label="Name"
                  value={name}
                  className={classes.propKey}
                  onChange={this.onFilterMetadataChange(index, 'name', value)}
                />
                <TextField
                  label="Value"
                  value={value}
                  className={classes.propValue}
                  onChange={this.onFilterMetadataChange(index, 'value', value)}
                />
                <IconButton
                  color="secondary"
                  aria-label="Remove Property"
                  onClick={this.removeFilterMetadataProperty(index)}
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
            onClick={this.addFilterMetadataProperty}
          >
            <AddIcon />
          </Fab>
          <TextField
            value={this.state.notifyUri}
            className={classes.input}
            id="notifyUri"
            required
            label="Notify URI"
            onChange={this.onNotifyUriChange}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="subtitle2" style={{ margin: '20px' }}>
              Match metadata?
            </Typography>
            <Checkbox
              checked={this.state.matchMetadata}
              id="matchMetadata"
              label="Match Metadata?"
              onChange={this.onMatchMetadataChange}
            />
          </div>
        </Card>
        <Button
          onClick={this.onSubmit}
          disabled={
            !this.state.eventType ||
            !this.state.consumerSystemName ||
            !this.state.consumerSystemAddress ||
            !this.state.consumerSystemPort ||
            !this.state.notifyUri
          }
          color="primary"
          className={classes.buttonStyle}
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

EventHandler.propTypes = {
  systems: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  isEdit: PropTypes.bool,
  getEventHandlerSystems: PropTypes.func.isRequired,
  createSubscription: PropTypes.func,
  modifySubscription: PropTypes.func,
  event: PropTypes.object,
  eventNames: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { eventHandler } = state
  return { systems: eventHandler.systems, eventNames: eventHandler.eventNames }
}

export default connect(
  mapStateToProps,
  { getEventHandlerSystems }
)(withStyles(styles)(EventHandler))
