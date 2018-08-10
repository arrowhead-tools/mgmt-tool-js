import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import AddIcon from "@material-ui/icons/Add";
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TableBroker from '../../components/Table/TableBroker'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Switch from '@material-ui/core/Switch';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getBrokers } from '../../actions/broker'


import Button from "../../components/CustomButtons/Button.js";

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

class Broker extends Component {
  state = {
    open: false,
    checkedIsSecure: false,
  }
  
  componentDidMount() {
    this.props.getBrokers()
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
    console.log('Submitted!');
 
  }

  render() {
    const { classes, broker } = this.props
    const columnData = [
      { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
      { id: 'broker_name', numeric: false, disablePadding: false, label: 'Broker Name' },
      { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
      { id: 'port', numeric: true, disablePadding: false, label: 'Port' },
      { id: 'secure', numeric: false, disablePadding: false, label: 'Secure' },
      { id: 'auth_info', numeric: false, disablePadding: false, label: 'Authentication Info' }
      
    ]
    return (
      <div className={classes.root}>
      <br/><br/>
        {broker && broker.data && broker.data.items && broker.data.items.map(serviceData => (
          <ExpansionPanel key={serviceData.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{serviceData.brokerName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.child}>
              <TableBroker data={serviceData.brokers} columnData={columnData} />
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

        <DialogTitle id="form-dialog-title">Add new Broker to Service Registry</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            id="name"
            label="Broker Name"
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
            type="text"
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

Broker.propTypes = {
  classes: PropTypes.object.isRequired,
  getBrokers: PropTypes.func.isRequired,
  broker: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { broker } = state
  return { broker }
}

function mapDispatchToProps(dispatch) {
  return {
    getBrokers: () => {
      dispatch(getBrokers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Broker))
