import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
//core
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
//actions
import { getClouds } from '../../actions/gatekeeper'
import { addCloud } from '../../actions/gatekeeper'

import Button from '../../components/CustomButtons/Button.js'

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium
  },
  child: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    width: '80%'
  },
  textFieldPort: {
    width: '25%'
  }
})

class NewCloudDialog extends React.Component {
  constructor(props) {
    super(props)

    const { data } = this.props

    this.state = {
      open: false,
      checkedIsSecure: false
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked })
  }

  handleDelete = (operator, cloudName) => {
    this.props.deleteCloud(operator, cloudName)
    window.location.reload()
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    var newCloud = [
      {
        cloud: {
          operator: event.target.elements.operator.value,
          cloudName: event.target.elements.cloudName.value,
          address: event.target.elements.address.value,
          port: event.target.elements.port.value,
          gatekeeperServiceURI: event.target.elements.gkServiceURI.value,
          secure: this.state.checkedIsSecure
        }
      }
    ]
    if (this.state.checkedIsSecure == false) {
      newCloud.authenticationInfo = null
    } else {
      newCloud[0].authenticationInfo = event.target.elements.auth_info.value
    }
    this.props.addCloud(newCloud)
    this.handleClose()
    window.location.reload()
  }

  render() {
    const { classes, gatekeeper } = this.props
    const { open, checkedIsSecure } = this.state

    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle id="form-dialog-title">
            Add new neighboring cloud to NeighborCloud Table
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="cloudName"
              label="Cloud name"
              type="text"
              margin="dense"
              required
              className={classes.textField}
            />
            <TextField
              id="address"
              label="Address"
              type="text"
              margin="dense"
              required
              className={classes.textField}
            />
            <TextField
              id="operator"
              label="Operator"
              type="text"
              margin="dense"
              required
              className={classes.textField}
            />
            <TextField
              id="gkServiceURI"
              label="Gatekeeper Service URI"
              type="text"
              margin="dense"
              required
              className={classes.textField}
            />
            <TextField
              id="port"
              label="Port"
              type="number"
              margin="dense"
              className={classes.textFieldPort}
              required
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.checkedIsSecure}
                  onChange={this.handleChange('checkedIsSecure')}
                  value="checkedIsSecure"
                  color="primary"
                />
              }
              label="Secure"
            />
            {this.state.checkedIsSecure ? (
              <TextField
                id="auth_info"
                label="Authentication Info"
                type="string"
                margin="dense"
                className={classes.textField}
              />
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" block>
              Cancel
            </Button>
            <Button color="primary" type="submit" block>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

NewCloudDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { gatekeeper } = state
  return { gatekeeper }
}

function mapDispatchToProps(dispatch) {
  return {
    getClouds: () => {
      dispatch(getClouds())
    },
    addCloud: (newCloud) => {
      dispatch(addCloud(newCloud))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewCloudDialog))
