import React, { Component } from 'react'
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

class AddRelay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.data.id || null,
      address: props.data.address || '',
      port: props.data.port || '',
      secure: props.data.secure || false
    }
  }

  onAddressChange = e => {
    this.setState({ address: e.target.value })
  }

  onPortChange = e => {
    this.setState({ port: e.target.value })
  }

  onSecureChange = e => {
    this.setState({ secure: e.target.checked })
  }

  onSubmit = () => {
    if (this.props.isEdit) {
      this.props.updateRelay(this.state)
    } else {
      const relayData = { ...this.state }
      delete relayData.id
      this.props.addRelay(relayData)
    }
    this.props.closeModal()
  }

  render() {
    const { classes, isEdit } = this.props
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
        </Card>
        <Button
          disabled={this.state.address === '' || this.state.port === ''}
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

export default withStyles(styles)(AddRelay)
