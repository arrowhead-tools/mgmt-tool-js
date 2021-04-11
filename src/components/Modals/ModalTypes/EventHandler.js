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
import { getServiceRegistryEntriesView } from '../../../actions/serviceRegistry'
import { getEventHandlerData } from '../../../actions/eventHandler'
import { connect } from 'react-redux'
import AutoCompleteMulti from '../../AutoCompleteMulti/AutoCompleteMulti'
import Checkbox from '@material-ui/core/Checkbox'
import _ from 'lodash'
import moment from 'moment'
import AutoCompleteSingle from '../../AutoCompleteSingle/AutoCompleteSingle'
import { DateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'

moment.locale('hu')

const styles = (theme) => ({
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
      endDate: event ? event.endDate : moment().add(2, 'days'),
      filterMetadata: filterMetadataHelper,
      matchMetadata: event.matchMetadata || false,
      sources: event.sources || [],
      notifyUri: event.notifyUri || '',
      startDate: event ? event.startDate : moment(),
      subscriberSystem: event ? event.subscriberSystem : {}
    }
  }

  componentDidMount() {
    this.props.getServiceRegistryEntriesView()
    this.props.getEventHandlerData()
  }

  onEventTypeTextChange = (eventType) => {
    this.setState({ eventType })
  }

  onEventTypeChange = (eventType) => {
    if (eventType !== undefined) {
      this.setState({
        eventType: eventType.eventType
      })
    }
  }

  handleSubscriberSystemOnChange = (subscriberSystem) => {
    this.setState({ subscriberSystem })
  }

  onSourceSystemChange = (sourceSystems) => {
    this.setState({ sources: sourceSystems })
  }

  onFilterMetadataChange = (index, key) => (event) => {
    const metadataArray = this.state.filterMetadata
    metadataArray[index][key] = event.target.value
    this.setState({ filterMetadata: metadataArray })
  }

  removeFilterMetadataProperty = (removeIndex) => () => {
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

  onNotifyUriChange = (event) => {
    this.setState({ notifyUri: event.target.value })
  }

  onMatchMetadataChange = (event) => {
    this.setState({ matchMetadata: event.target.checked })
  }

  handleStartDateOnChange = (date) => {
    this.setState({ startDate: date })
  }

  handleEndDateOnChange = (date) => {
    this.setState({ endDate: date })
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
      endDate: moment(this.state.endDate).format('YYYY-MM-DD HH:mm:ss'),
      startDate: moment(this.state.startDate).format('YYYY-MM-DD HH:mm:ss'),
      sources: this.state.sources,
      filterMetadata: filterMetadataHelper,
      notifyUri: this.state.notifyUri,
      matchMetadata: this.state.matchMetadata,
      subscriberSystem: this.state.subscriberSystem
    }
    if (this.props.isEdit) {
      subscriptionData.id = this.state.id
      console.log('sub', subscriptionData)
      this.props.modifySubscription(subscriptionData, this.props.event.id)
    } else {
      this.props.createSubscription(subscriptionData)
    }
    this.props.closeModal()
  }

  render() {
    const { systems, classes, isEdit, eventNames } = this.props
    return (
      <div>
        <Card raised className={classes.card}>
          <AutoComplete
            suggestions={eventNames}
            defaultValue={this.state.eventType}
            id="eventType"
            required
            isEdit={isEdit}
            placeholder="Event Type"
            keyValue="eventType"
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
          <Typography variant="h5" align="center" className={classes.title}>
            Subscriber System
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
            handleOnChange={this.handleSubscriberSystemOnChange}
            keyValue="systemName"
            required
            placeholder="Subscriber System"
            label="Subscriber System"
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
                label="Start Date"
                value={this.state.startDate}
                onChange={this.handleStartDateOnChange}
              />
            </div>
          </MuiPickersUtilsProvider>
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
                label="End Date"
                value={this.state.endDate}
                onChange={this.handleEndDateOnChange}
              />
            </div>
          </MuiPickersUtilsProvider>
        </Card>
        <Button
          onClick={this.onSubmit}
          disabled={
            this.state.eventType === '' ||
            this.state.subscriberSystem === {} ||
            this.state.sources === [] ||
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
  createSubscription: PropTypes.func,
  modifySubscription: PropTypes.func,
  event: PropTypes.object,
  eventNames: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { services, eventHandler } = state
  return {
    eventNames: eventHandler.eventNames,
    systems: services.autoCompleteData.systemList,
    services: services.autoCompleteData.serviceList,
    interfaces: services.autoCompleteData.interfaceList
  }
}

export default connect(mapStateToProps, {
  getServiceRegistryEntriesView,
  getEventHandlerData
})(withStyles(styles)(EventHandler))
