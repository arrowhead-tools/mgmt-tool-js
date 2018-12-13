import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Time from 'react-time'
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Grid from "@material-ui/core/Grid";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import Checkbox from "@material-ui/core/Checkbox"
import Switch from '@material-ui/core/Switch';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Table from "../../components/Table/TableOrch.js";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import Button from "../../components/CustomButtons/Button.js";

import { getOrchStatus } from '../../actions/orch'



const styles = theme => ({
  root: {
    width: '97%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium
  },
  child: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontSize: "14px",
      marginTop: "2px",
      marginBottom: "2px"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "5px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "5px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  textFieldWidth: {
    width: 280
  }
})

class Orchestrator extends Component {
  state = {now: new Date(), checkedSystemName: false, checkedServiceDef: false,
           checkedFiltered: false, orderSystem: '', anchorEl: null, filterService: ''}
 
  constructor(props) {
  super(props);
} 
 

  componentDidMount() {
    this.props.getOrchStatus()
    const self = this
    self.interval = setInterval(function() {
      self.setState({
        now: new Date(),
      })
    }, 60000);  }

  componenWillMount() {
    clearInterval(this.interval)
  }

  
  handleChange = name => event => {
    if (name === "checkedServiceDef") {
      this.setState({[name]: event.target.checked, checkedSystemName: false})
    } else {
      this.setState({[name]: event.target.checked, checkedServiceDef: false})
    }
  }

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClick = () => {
    window.location.reload()
  }

  handleClickMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  
  handleAlphabeticalOrder  = () => {
    const { tableData} = this.props 
    tableData.data.items.sort((a, b) => a.providerId- b.providerId) 
    this.setState({ anchorEl: null });
  }

  handleNumberOfProvidedServicesOrder = () => {
    const { tableData} = this.props
   tableData.data.items.sort((a, b) => b.services.length- a.services.length) 
   console.log(tableData.data.items)
   this.setState({ anchorEl: null });
  }

  handleFilterOnChange = event => {
    this.setState({
      filterService: event.target.value,
    })
  }  

  render() {
 
    const { classes, tableData} = this.props
    let { anchorEl} = this.state

    const columnData = [
      { id: 'service_id', numeric: false, disablePadding: false, label: 'ServiceId' },
      { id: 'service_definition', numeric: false, disablePadding: false, label: 'ServiceDef' },
      { id: 'system_id', numeric: false, disablePadding: false, label: 'SysId' },
      { id: 'system_name', numeric: false, disablePadding: false, label: 'SysName' },
      { id: 'local_cloud', numeric: false, disablePadding: false, label: 'Local Cloud' },
    ]
    return ( 
      
<div className={classes.root}>
<br/><br/><br/>
   <Grid container direction='row' spacing={16} justify='space-between' alignItems='baseline'>
   <GridItem>

      <TextField
      className={classes.textFieldWidth}
      inputProps={{
        placeholder: "system name or service definition",
      }} 
      onChange={this.handleFilterOnChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" variant="filled" color="primary">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      />
      <FormGroup row>
         <FormControlLabel
         control={
         <Checkbox
            checked={this.state.checkedSystemName}
            onChange={this.handleChange('checkedSystemName')}
            value="checkedSystemName"
            color="primary"
            />
         }
         label="System name"
         />
         <FormControlLabel
         control={
         <Checkbox
            checked={this.state.checkedServiceDef}
            onChange={this.handleChange('checkedServiceDef')}
            value="checkedServiceDef"
            color="primary"
            />
         } 
         label="Service Definition"
         />
      </FormGroup>
    </GridItem>
    <GridItem>
        <Button 
          color="primary" aria-label="edit"  round
          aria-owns={anchorEl ? 'order-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClickMenu}
        >
          Order by
        </Button>
        <Menu
          id="order-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleCloseMenu}
        >
          <MenuItem onClick={this.handleAlphabeticalOrder}>Alphabetical Order</MenuItem>
          <MenuItem onClick={this.handleNumberOfProvidedServicesOrder}>Number of provided services</MenuItem>
        </Menu>
    </GridItem>
    <GridItem>
      <FormControlLabel
       control={
        <Switch
          checked={this.state.checkedFiltered}
          onChange={this.handleChange('checkedFiltered')}
          value="checkedFiltered"
          color="primary"
        />
      }
      label="List without Core Services"
      />
    </GridItem>
    
    <GridItem>
      <Button color="primary" aria-label="edit"  round onClick = {this.handleClick} >
         <RefreshIcon />
      </Button>
    </GridItem>
   </Grid>
   <div>
   <br/><br/>
   <Grid container >
   {tableData && tableData.data && tableData.data.items && tableData.data.items.map(systemData => (
      <GridItem xs={12} sm={12} md={6} key={systemData.providerId}>
         <Card>
            <CardHeader color="primary" tit = "true">
               <h2 className={classes.cardTitleWhite}>System {systemData.providerId} </h2>
               <p className={classes.cardCategoryWhite}>
                  Provides Services on <Time value={this.state.now} format="YYYY MMM DD., HH:MM"/>
               </p>
            </CardHeader>
            <CardBody>
               <Table data={systemData.services} filterService={this.state.filterService} 
                checkedServiceDef={this.state.checkedServiceDef} checkedSystemName={this.state.checkedSystemName}
                 checkedFiltered={this.state.checkedFiltered} columnData={columnData}/>
            </CardBody>
         </Card>
      </GridItem>
   ))
  }
  
   </Grid>
</div>
</div>

    )
  }
}

Orchestrator.propTypes = {
  classes: PropTypes.object.isRequired,
  getOrchStatus: PropTypes.func.isRequired,
  tableData: PropTypes.object.isRequired

}


function mapStateToProps(state) {
  const { tableData } = state
  return { tableData }
}
function mapDispatchToProps(dispatch) {
  return {
    getOrchStatus: () => {
      dispatch(getOrchStatus())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Orchestrator))
