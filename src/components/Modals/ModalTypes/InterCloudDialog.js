import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import * as PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import Button from '../../CustomButtons/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import AutoComplete from '../../AutoComplete/AutoComplete'
import { connect } from 'react-redux'
import AutoCompleteMulti from '../../AutoCompleteMulti/AutoCompleteMulti'
import Checkbox from '@material-ui/core/Checkbox'
import { getClouds, getAuthServices } from '../../../actions/auth'

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
      id: null,
      operator: '',
      cloudName: '',
      address: '',
      port: '',
      gatekeeperServiceURI: '',
      authenticationInfo: '',
      secure: false,
      serviceList: []
    }
  }

  componentDidMount() {
    this.props.getClouds()
    this.props.getAuthServices()
  }

  onCloudChange = cloud => {
    if (cloud !== undefined) {
      this.setState({
        id: cloud.id,
        operator: cloud.operator,
        cloudName: cloud.cloudName,
        address: cloud.address,
        port: cloud.port,
        gatekeeperServiceURI: cloud.gatekeeperServiceURI,
        authenticationInfo: cloud.authenticationInfo,
        secure: cloud.secure
      })
    }
  }

  onCloudNameChange = cloudName => {
    this.setState({ cloudName, id: null })
  }

  onOperatorChange = event => {
    this.setState({ operator: event.target.value, id: null })
  }

  onAddressChange = event => {
    this.setState({ address: event.target.value, id: null })
  }

  onPortChange = event => {
    if (
      event.target.value === '' ||
      (event.target.value > 0 && event.target.value <= 65536)
    ) {
      this.setState({ port: event.target.value, id: null })
    }
  }

  onGatekeeperServiceURIChange = event => {
    this.setState({ gatekeeperServiceURI: event.target.value, id: null })
  }

  onAuthInfoChange = event => {
    this.setState({ authenticationInfo: event.target.value, id: null })
  }

  onSecureChange = event => {
    this.setState({ secure: event.target.checked })
  }

  onSourceSystemChange = serviceList => {
    this.setState({ serviceList })
  }

  onSubmit = () => {
    const interCloudEntry = {
      cloud: {
        id: this.state.id,
        operator: this.state.operator,
        cloudName: this.state.cloudName,
        address: this.state.address,
        port: this.state.port,
        gatekeeperServiceURI: this.state.gatekeeperServiceURI,
        authenticationInfo: this.state.authenticationInfo,
        secure: this.state.secure
      },
      serviceList: this.state.serviceList
    }
    this.props.addInterCloudEntry(interCloudEntry)
    this.props.closeModal()
  }

  render() {
    const { clouds, classes, services } = this.props
    return (
      <div>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Cloud
          </Typography>
          <AutoComplete
            handleOnChange={this.onCloudChange}
            handleTextChange={this.onCloudNameChange}
            suggestions={clouds}
            defaultValue={this.state.cloudName}
            keyValue="cloudName"
            label="Cloud Name"
            required
            placeholder="Cloud Name"
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
            value={this.state.operator}
            className={classes.input}
            id="operator"
            required
            label="Operator"
            onChange={this.onOperatorChange}
          />
          <TextField
            value={this.state.address}
            className={classes.input}
            id="address"
            required
            label="Address"
            onChange={this.onAddressChange}
          />
          <TextField
            value={this.state.port}
            className={classes.input}
            id="port"
            required
            label="Port"
            onChange={this.onPortChange}
            type="number"
            inputProps={{
              min: '1',
              max: '65535'
            }}
          />
          <TextField
            value={this.state.gatekeeperServiceURI}
            className={classes.input}
            id="gatekeeperServiceURI"
            required
            label="GateKeeper Service URI"
            onChange={this.onGatekeeperServiceURIChange}
          />
          <TextField
            value={this.state.authenticationInfo}
            className={classes.input}
            id="authenticationInfo"
            label="Authentication Info"
            onChange={this.onAuthInfoChange}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="subtitle2" style={{ margin: '20px' }}>
              Match metadata?
            </Typography>
            <Checkbox
              checked={this.state.matchMetadata}
              id="secure"
              label="Secure?"
              onChange={this.onSecureChange}
            />
          </div>
        </Card>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Services
          </Typography>
          <AutoCompleteMulti
            handleOnChange={this.onSourceSystemChange}
            label="Services"
            placeholder="Services"
            keyValue="serviceDefinition"
            suggestions={services}
          />
        </Card>
        <Button
          onClick={this.onSubmit}
          disabled={
            !this.state.operator ||
            !this.state.cloudName ||
            !this.state.address ||
            !this.state.port ||
            !this.state.gatekeeperServiceURI
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
  getAuthServices: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { auth } = state
  return { clouds: auth.clouds, services: auth.services }
}

export default connect(
  mapStateToProps,
  { getClouds, getAuthServices }
)(withStyles(styles)(InterCloudDialog))
