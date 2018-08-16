import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
//icons
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
//core
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from "@material-ui/core/Grid"
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
//actions
import { getRelays } from '../../actions/relay'
import { addRelay } from '../../actions/relay'
//components
import Button from "../../components/CustomButtons/Button.js"
import TableRelay from '../../components/Table/TableRelay'

const styles = theme => ({
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

class Relay extends Component {
  state = {
    open: false,
    checkedIsSecure: false,
  }
  
  componentDidMount() {
    this.props.getRelays()
  }

  componentDidUpdate() {
    this.props.getRelays()
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChange = name => event => {
      this.setState({ [name]: event.target.checked })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var newRelay = [{
      brokerName: event.target.elements.name.value,
      address: event.target.elements.address.value,
      port: event.target.elements.port.value,
      secure: this.state.checkedIsSecure,
      authenticationInfo: null
    }]
    if (this.state.checkedIsSecure == true) {
      newRelay.authenticationInfo = event.target.elements.auth_info.value
    }
    this.props.addRelay(newRelay)
    this.handleClose()
  }

  handleDelete = () => {
    this.props.deleteRelay()
  }
  
  render() {
    const { classes, relay } = this.props
    const columnData = [
      { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
      { id: 'broker_name', numeric: false, disablePadding: false, label: 'Relay Name' },
      { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
      { id: 'port', numeric: true, disablePadding: false, label: 'Port' },
      { id: 'secure', numeric: false, disablePadding: false, label: 'Secure' },
      { id: 'auth_info', numeric: false, disablePadding: false, label: 'Authentication Info' }
      
    ]
    return (
      <div className={classes.root}>
      <br/><br/>
        {relay && relay.data && relay.data.items && relay.data.items.map(serviceData => (
          <ExpansionPanel key={serviceData.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{serviceData.brokerName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.child}>
            <Grid container direction='row' spacing={8} justify='flex-end' alignItems='center'>
            <Grid item>
            <Button onClick={this.handleClickOpen} color="primary" aria-label="edit" justIcon round>
              <EditIcon/>
            </Button>
            </Grid>
            <Grid item>
            <Button onClick={this.handleDelete} color="primary" aria-label="edit" justIcon round>
              <DeleteIcon />
            </Button>
            </Grid>
            </Grid>
              <TableRelay data={serviceData.relays} columnData={columnData} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          
        ))}
      <br/><br/>
      <Button onClick={this.handleClickOpen} color="primary" aria-label="edit" justIcon round>
         <AddIcon />
      </Button>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.handleSubmit}>

        <DialogTitle id="form-dialog-title">Add new relay to Relay Table</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            id="name"
            label="Relay Name"
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
      { this.state.checkedIsSecure ? 
           <TextField
            id="auth_info"
            label="Authentication Info"
            type="string"
            margin="dense"
            className={classes.textField}
      /> : null 
    }
    
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" block>
            Cancel
          </Button>
          <Button color="primary" type='submit' block>
            Save
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>

    )
  }
}

Relay.propTypes = {
  classes: PropTypes.object.isRequired,
  getRelays: PropTypes.func.isRequired,
  addRelay: PropTypes.func.isRequired,
  deleteRelay: PropTypes.func.isRequired,
  relay: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { relay } = state
  return { relay }
}

function mapDispatchToProps(dispatch) {
  return {
    getRelays: () => {
      dispatch(getRelays())
    },
    addRelay: (newRelay) => {
      dispatch(addRelay(newRelay))
    },
    deleteRelay: () => {
      dispatch(addRelay())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Relay))