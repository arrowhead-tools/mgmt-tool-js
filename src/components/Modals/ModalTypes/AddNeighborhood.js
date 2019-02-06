import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '../../CustomButtons/Button'
import Checkbox from '@material-ui/core/Checkbox'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

const styles = theme => ({
  input: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '400px'
  }
})

class AddNeighborhood extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.data.id || null,
      operator: props.data.operator || '',
      cloudName: props.data.cloudName || '',
      address: props.data.address || '',
      port: props.data.port || '',
      gatekeeperServiceURI: props.data.gatekeeperServiceURI || '',
      authenticationInfo: props.data.authenticationInfo || '',
      secure: props.data.secure || false

    }
  }

  onOperatorChange = e => {
    this.setState({ operator: e.target.value })
  }

  onAddressChange = e => {
    this.setState({ address: e.target.value })
  }

  onCloudNameChange = e => {
    this.setState({ cloudName: e.target.value })
  }

  onPortChange = e => {
    this.setState({ port: e.target.value })
  }

  onGatekeeperServiceURIChange = e => {
    this.setState({ gatekeeperServiceURI: e.target.value })
  }

  onAuthenticationInfoChange = e => {
    this.setState({ authenticationInfo: e.target.value })
  }

  onSecureChange = e => {
    this.setState({ secure: e.target.checked })
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
    const { classes, isEdit }  = this.props
    return (
      <div>
        <Card raised style={{ display: 'flex', flexDirection: 'column', margin: '10px', width: '440px' }}>
          <TextField
            value={this.state.operator}
            className={classes.input}
            id='operator'
            required
            label='Operator'
            onChange={this.onOperatorChange}
          />
          <TextField
            value={this.state.cloudName}
            className={classes.input}
            id='cloudName'
            required
            label='CloudName'
            onChange={this.onCloudNameChange}
          />
          <TextField
            value={this.state.address}
            className={classes.input}
            id='address'
            required
            label='Address'
            onChange={this.onAddressChange}
          />
          <TextField
            value={this.state.port}
            className={classes.input}
            id='port'
            required
            label='Port'
            onChange={this.onPortChange}
            type='number'
            inputProps={{
              min: '1',
              max: '65535'
            }}
          />
          <TextField
            value={this.state.gatekeeperServiceURI}
            className={classes.input}
            id='gatekeeperServiceURI'
            required
            label='Gatekeeper Service URI'
            onChange={this.onGatekeeperServiceURIChange}
          />
          <TextField
            value={this.state.authenticationInfo}
            className={classes.input}
            id='authenticationInfo'
            label='Authentication Info'
            onChange={this.onAuthenticationInfoChange}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant='subtitle2' style={{ margin: '20px' }}>Is secure?</Typography>
            <Checkbox
              checked={this.state.secure}
              id='secure'
              label='Secure'
              onChange={this.onSecureChange}
            />
          </div>
        </Card>
        <Button
          disabled={this.state.operator === '' || this.state.cloudName === '' || this.state.address === '' ||
          this.state.port === '' || this.state.gatekeeperServiceURI === ''}
          color='primary'
          onClick={this.onSubmit}
          style={{
            width: '440px',
            marginLeft: '10px',
            padding: '0px'
          }}>{isEdit ? (<p><EditIcon />Edit</p>) : (<p><AddIcon />Add</p>)}</Button>
      </div>
    )
  }
}

AddNeighborhood.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  updateCloud: PropTypes.func.isRequired,
  addCloud: PropTypes.func.isRequired,
  isEdit: PropTypes.bool
}


export default withStyles(styles)(AddNeighborhood)
