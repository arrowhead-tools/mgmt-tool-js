import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '../../CustomButtons/Button'
import Checkbox from '@material-ui/core/Checkbox'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

import { getRelays } from '../../../actions/relay'
import AutoCompleteMulti from '../../AutoCompleteMulti/AutoCompleteMulti'

const styles = theme => ({
  input: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '400px'
  }
})

class AddCloud extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.data.id || null,
      operator: props.data.operator || '',
      name: props.data.name || '',
      authenticationInfo: props.data.authenticationInfo || '',
      secure: props.data.secure || false,
      gatekeeperRelays: props.data.gatekeeperRelays || [],
      gatewayRelays: props.data.gatewayRelays || []
    }
  }

  componentDidMount() {
    this.props.getRelays()
  }

  onOperatorChange = e => {
    this.setState({ operator: e.target.value })
  }

  onCloudNameChange = e => {
    this.setState({ name: e.target.value })
  }

  onAuthenticationInfoChange = e => {
    this.setState({ authenticationInfo: e.target.value })
  }

  onSecureChange = e => {
    this.setState({ secure: e.target.checked })
  }

  handleGatekeeperRelaysChange = gatekeeperRelays => {
    this.setState({ gatekeeperRelays })
  }

  handleGatewayRelaysChange = gatewayRelays => {
    this.setState({ gatewayRelays })
  }

  onSubmit = () => {
    if (this.props.isEdit) {
      this.props.updateCloud(this.state)
    } else {
      const cloudData = { ...this.state }
      delete cloudData.id
      this.props.addCloud(cloudData)
    }
    this.props.closeModal()
  }

  render() {
    const { classes, isEdit, relays } = this.props
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
          <TextField
            value={this.state.operator}
            className={classes.input}
            id="operator"
            required
            label="Operator"
            onChange={this.onOperatorChange}
          />
          <TextField
            value={this.state.name}
            className={classes.input}
            id="name"
            required
            label="Name"
            onChange={this.onCloudNameChange}
          />
          <TextField
            value={this.state.authenticationInfo}
            className={classes.input}
            id="authenticationInfo"
            label="Authentication Info"
            onChange={this.onAuthenticationInfoChange}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="subtitle2" style={{ margin: '20px' }}>
              Is secure?
            </Typography>
            <Checkbox
              checked={this.state.secure}
              id="secure"
              label="Secure"
              onChange={this.onSecureChange}
            />
          </div>
          <AutoCompleteMulti
            handleOnChange={this.handleGatekeeperRelaysChange}
            label="Gatekeeper Relays"
            placeholder="Gatekeeper Relays"
            keyValue="address"
            required
            defaultItems={this.state.gatekeeperRelays}
            suggestions={relays}
          />
          <AutoCompleteMulti
            handleOnChange={this.handleGatewayRelaysChange}
            label="Gateway Relays"
            placeholder="Gateway Relays"
            keyValue="address"
            required
            defaultItems={this.state.gatewayRelays}
            suggestions={relays}
          />
        </Card>
        <Button
          disabled={
            this.state.operator === '' ||
            this.state.name === '' ||
            this.state.gatekeeperRelays === [] ||
            this.state.gatewayRelays === []
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

AddCloud.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  updateCloud: PropTypes.func,
  addCloud: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  isEdit: PropTypes.bool
}

function mapStateToProps(state) {
  const { data } = state.relay
  return { relays: data}
}

function mapDispatchToProps(dispatch) {
  return {
    getRelays: () => {
      dispatch(getRelays())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddCloud))
