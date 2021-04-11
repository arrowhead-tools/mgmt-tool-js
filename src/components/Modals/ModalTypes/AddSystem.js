import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import * as PropTypes from 'prop-types'
import Button from '../../../components/CustomButtons/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles/'
import { createSystem } from '../../../actions/serviceRegistry'

const styles = (theme) => ({
  container: {
    display: 'flex',
    width: '400px'
  },
  input: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '400px'
  }
})

class AddSystem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      systemName: '',
      address: '',
      port: '',
      authenticationInfo: ''
    }
  }

  handleSystemNameOnChange = (event) => {
    this.setState({ systemName: event.target.value })
  }

  handleAddressOnChange = (event) => {
    this.setState({ address: event.target.value })
  }

  handlePortOnChange = (event) => {
    if (
      event.target.value === '' ||
      (event.target.value > 0 && event.target.value <= 65536)
    ) {
      this.setState({ port: event.target.value })
    }
  }

  handleAuthenticationInfoOnChange = (event) => {
    this.setState({ authenticationInfo: event.target.value })
  }

  handleAddSystemButtonClick = () => {
    this.props.createSystem({
      systemName: this.state.systemName,
      address: this.state.address,
      port: this.state.port,
      authenticationInfo: this.state.authenticationInfo
    })
    this.props.closeModal()
  }

  render() {
    const { classes } = this.props
    return (
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
          id="system_name"
          required
          onChange={this.handleSystemNameOnChange}
          label="System Name"
          className={classes.input}
        />
        <TextField
          id="system_address"
          required
          onChange={this.handleAddressOnChange}
          label="Address"
          className={classes.input}
        />
        <TextField
          value={this.state.port}
          id="port"
          required
          onChange={this.handlePortOnChange}
          label="Port"
          className={classes.input}
          type="number"
          inputProps={{
            min: '1',
            max: '65535'
          }}
        />
        <TextField
          id="authentication_info"
          onChange={this.handleAuthenticationInfoOnChange}
          label="Authentication Info"
          className={classes.input}
          inputProps={{
            'aria-label': 'Description'
          }}
        />
        <Button
          disabled={
            this.state.systemName === '' ||
            this.state.address === '' ||
            this.state.port === ''
          }
          color="primary"
          onClick={this.handleAddSystemButtonClick}
          style={{
            width: '400px',
            marginLeft: '20px',
            marginRight: '20px',
            marginBottom: '20px'
          }}
        >
          Add System
        </Button>
      </Card>
    )
  }
}

AddSystem.propTypes = {
  classes: PropTypes.object.isRequired,
  addSystem: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}

function mapStateToProps(dispatch) {}

function mapDispatchToProps(dispatch) {
  return {
    createSystem: (system) => {
      dispatch(createSystem(system, null, true))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddSystem))
