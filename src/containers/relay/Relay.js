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
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from "@material-ui/core/Grid"
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
//actions
import { getRelays } from '../../actions/relay'
import { addRelay } from '../../actions/relay'
import { deleteRelay } from '../../actions/relay'
import { updateRelay } from '../../actions/relay'
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
    openAdd: false,
    openUpdate: false,
    openDelete: false,
    checkedIsSecure: false
  }
  
  id = null
  actualRelayData = ""

  componentDidMount() {
    this.props.getRelays()
  }

  handleAddOpen = () => {
    this.setState({ openAdd: true })
  }

  handleUpdateOpen = (relayData) => {
    this.setState({ openUpdate: true })
    this.actualRelayData = relayData
  }

  handleDeleteOpen = (id) => {
    this.setState({ openDelete: true })
    this.id= id
  }

  handleChange = name => event => {
      this.setState({ [name]: event.target.checked })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var newRelay = [{
      address: event.target.elements.address.value,
      port: event.target.elements.port.value,
      secure: this.state.checkedIsSecure,
    }]
    this.props.addRelay(newRelay)
    this.handleAddClose()
  }

  handleDeleteClose = () => {
    this.setState({ openDelete: false});
  }

  handleAddClose = () => {
    this.setState({ openAdd: false });
  }

  handleUpdateClose = () => {
    this.setState({ openUpdate: false });
  }
  handleDelete = () => {
    this.props.deleteRelay(this.id)
    this.handleDeleteClose()
  }
  
  handleUpdate = (event) => {
    event.preventDefault();
    this.updatedRelay = {
      address: event.target.elements.address.value,
      port: event.target.elements.port.value,
      secure: this.state.checkedIsSecure,
    }
    this.props.updateRelay(this.updatedRelay)
    this.handleAddClose()
  }

  render() {
    const { classes, relay } = this.props
    console.log(relay)
    const columnData = [
      { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
      { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
      { id: 'port', numeric: true, disablePadding: false, label: 'Port' },
      { id: 'secure', numeric: false, disablePadding: false, label: 'Secure' },
      
    ]
    return (
      <div className={classes.root}>
      <br/><br/>
        {relay && relay.data && relay.data.items && relay.data.items.map(relayData => (
          <ExpansionPanel key={relayData.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{relayData.address +":"+relayData.port}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.child}>
            <Grid container direction='row' spacing={8} justify='flex-end' alignItems='center'>
            <Grid item>
            <Button onClick={() => {this.handleUpdateOpen(relayData)}} color="primary" aria-label="edit" justIcon round>
              <EditIcon/>
            </Button>
            </Grid>
            <Grid item>
            <Button onClick={() => {this.handleDeleteOpen(relayData.id)}} color="primary" aria-label="edit" justIcon round>
              <DeleteIcon />
            </Button>
            </Grid>
            </Grid>
              <TableRelay data={relayData.relays} columnData={columnData} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          
        ))}
      <br/><br/>
      <Button onClick={this.handleAddOpen} color="primary" aria-label="edit" justIcon round>
         <AddIcon />
      </Button>
      <Dialog
        open={this.state.openAdd}
        onClose={this.handleAddClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.handleSubmit}>

          <DialogTitle id="form-dialog-title">Add new relay</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
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
    
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleAddClose} color="primary" block>Cancel</Button>
          <Button color="primary" type='submit' block>Save</Button>
        </DialogActions>
      </form>
      </Dialog>
      <Dialog
          open={this.state.openDelete}
          onClose={this.handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteClose} color="primary">No</Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>Yes</Button>
          </DialogActions>
        </Dialog>
        <Dialog
        open={this.state.openUpdate}
        onClose={this.handleUpdateClose}
        aria-labelledby="form-dialog-title"
        >
          <form onSubmit={this.handleUpdate}>

            <DialogTitle id="form-dialog-title">Update relay</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id="address"
                label="Address"
                type="text"
                margin="dense"
                defaultValue = {this.actualRelayData.address}
                required
                className={classes.textField}

              />
              <TextField
                id="port"
                label="Port"
                type="number"
                margin="dense"
                defaultValue = {this.actualRelayData.port}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleUpdateClose} color="primary" block>Cancel</Button>
            <Button color="primary" type='submit' block>Save</Button>
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
  updateRelay: PropTypes.func.isRequired,
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
    deleteRelay: (id) => {
      dispatch(deleteRelay(id))
    },
    updateRelay: (updatedRelay) => {
      dispatch(updateRelay(updatedRelay))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Relay))