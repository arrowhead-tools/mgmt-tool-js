import React, { Component } from 'react'
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
import { withStyles } from '@material-ui/core/styles'
import AutoComplete from '../../AutoComplete/AutoComplete'
import { getEventHandlerSystems } from '../../../actions/eventHandler'
import { connect } from 'react-redux'
import AutoCompleteMulti from '../../AutoCompleteMulti/AutoCompleteMulti'
import Checkbox from '@material-ui/core/Checkbox'

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

    this.state = {
      id: props.id || null,
      eventType: props.eventType || '',
      consumerSystemId: props.consumer ? props.consumer.id : null,
      consumerSystemName: props.consumer ? props.consumer.systemName : '',
      consumerSystemAddress: props.consumer ? props.consumer.address : '',
      consumerSystemPort: props.consumer ? props.consumer.port : '',
      consumerSystemAuthentication: props.consumer
        ? props.consumer.authenticationInfo
        : '',
      sources: props.sources || [],
      filterMetadata: props.filterMetadata || [{ name: '', value: '' }],
      notifyUri: '',
      matchMetadata: true
    }
  }

  componentDidMount() {
    this.props.getEventHandlerSystems()
  }

  onEventTypeChange = event => {
    this.setState({ eventType: event.target.value })
  }

  onConsumerSystemChange = consumerSystem => {
    if (consumerSystem !== undefined) {
      this.setState({
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

  render() {
    const { systems, classes } = this.props
    return (
      <div>
        <Card raised className={classes.card}>
          <TextField
            value={this.state.eventType}
            className={classes.input}
            id="eventType"
            required
            label="Event Type"
            onChange={this.onEventTypeChange}
          />
        </Card>
        <Card raised className={classes.card}>
          <AutoComplete
            handleOnChange={this.onConsumerSystemChange}
            handleTextChange={this.onConsumerSystemNameChange}
            suggestions={systems}
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
            required
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
            required
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
              checked={this.state.secure}
              id="matchMetadata"
              label="Match Metadata?"
              onChange={this.onMatchMetadataChange}
            />
          </div>
        </Card>
        <Button
          disabled
          color="primary"
          onClick={this.onButtonClick}
          className={classes.buttonStyle}
        >
          <AddIcon /> Add{' '}
        </Button>
      </div>
    )
  }
}

EventHandler.propTypes = {
  systems: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { eventHandler } = state
  return { systems: eventHandler.systems }
}

export default connect(
  mapStateToProps,
  { getEventHandlerSystems }
)(withStyles(styles)(EventHandler))
