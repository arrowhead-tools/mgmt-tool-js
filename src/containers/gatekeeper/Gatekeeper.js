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
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from "@material-ui/core/Grid"
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
//actions
import { getClouds } from '../../actions/gatekeeper'
import { addCloud } from '../../actions/gatekeeper'

//components
import Button from "../../components/CustomButtons/Button.js"
import TableGK from '../../components/Table/TableGK'


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

class Gatekeeper extends Component {
  state = {
    open: false,
    checkedIsSecure: false,
  }

  componentDidMount() {
    this.props.getClouds()
  }

  componentDidUpdate() {
    this.props.getClouds()
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
    var newCloud = [{cloud: {
      operator: event.target.elements.operator.value,
      cloudName: event.target.elements.cloudName.value,
      address: event.target.elements.address.value,
      port: event.target.elements.port.value,
      gatekeeperServiceURI: event.target.elements.gkServiceURI.value,
      secure: this.state.checkedIsSecure,
    }}]
    if (this.state.checkedIsSecure == false) {
      newCloud.authenticationInfo = null
    } else {
      newCloud.authenticationInfo = event.target.elements.auth_info.value
    }
    this.props.addCloud(newCloud)
    this.handleClose()
  }



  render() {
    const { classes, gatekeeper } = this.props
    const columnData = [
      { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
      { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
      { id: 'port', numeric: true, disablePadding: false, label: 'Port' },
      { id: 'operator', numeric: false, disablePadding: false, label: 'Operator' },
      { id: 'gatekeeper_service_uri', numeric: false, disablePadding: false, label: 'Service URI' },
      { id: 'secure', numeric: false, disablePadding: false, label: 'Secure' },
      { id: 'auth_info', numeric: false, disablePadding: false, label: 'Authentication Info' }
    ] 
    return (
     
      <div className={classes.root}> 
      <br/><br/>
        {gatekeeper && gatekeeper.data && gatekeeper.data.items && gatekeeper.data.items.map(serviceData => (
          <ExpansionPanel key={serviceData.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{serviceData.cloudName}</Typography>
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
              <TableGK data={serviceData.clouds} columnData={columnData} key={serviceData.id} />
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

        <DialogTitle id="form-dialog-title">Add new neighboring cloud to NeighborCloud Table</DialogTitle>
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

Gatekeeper.propTypes = {
  classes: PropTypes.object.isRequired,
  getClouds: PropTypes.func.isRequired,
  addCloud: PropTypes.func.isRequired,
  gatekeeper: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Gatekeeper))
