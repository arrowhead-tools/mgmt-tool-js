import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Time from 'react-time'
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Grid from "@material-ui/core/Grid";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography'
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import Checkbox from "@material-ui/core/Checkbox"
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Table from "../../components/Table/TableOrch.js";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.js";
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
  }
})

class Orchestrator extends Component {
  state = {now: new Date(), checkedProvider: false, checkedConsumer: false,
           checkedFiltered: false, orderSystem: ''}

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
    this.setState({ [name]: event.target.checked })
  }

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClick = () => {
    window.location.reload()
  }

  render() {
    const { classes, tableData} = this.props
    const columnData = [
      { id: 'service_id', numeric: false, disablePadding: false, label: 'ServiceId' },
      { id: 'service_definition', numeric: false, disablePadding: false, label: 'ServiceDef' },
      { id: 'system_id', numeric: false, disablePadding: false, label: 'SysId' },
      { id: 'system_name', numeric: false, disablePadding: false, label: 'SysName' },
      { id: 'local_cloud', numeric: false, disablePadding: false, label: 'Local Cloud' },
    ]
    return (
      
<div className={classes.root}>
<br/><br/>
   <Grid container direction='row' spacing={16} justify='space-between' alignItems='center'>
   <GridItem>
      <CustomInput
      formControlProps={{
        className: classes.margin + " " + classes.search 
      }}
      inputProps={{
        placeholder: "service definition",
      }} 
      labelText="Filter by service"
      />
      <Button color="primary" aria-label="edit" justIcon round>
         <SearchIcon />
      </Button>
      <FormGroup row>
         <FormControlLabel
         control={
         <Checkbox
            checked={this.state.checkedProvider}
            onChange={this.handleChange('checkedProvider')}
            value="checkedProvider"
            color="primary"
            />
         }
         label="Provider"
         />
         <FormControlLabel
         control={
         <Checkbox
            checked={this.state.checkedConsumer}
            onChange={this.handleChange('checkedConsumer')}
            value="checkedConsumer"
            color="primary"
            />
         }
         label="Consumer"
         />
      </FormGroup>
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
      label="List without Core Systems"
      />
    </GridItem>
    <GridItem>
    <InputLabel htmlFor="order-system-id">Order type </InputLabel>
          <Select
            value={this.state.orderSystem}
            onChange={this.handleSelectChange}
            inputProps={{
              name: 'orderSystem',
              id: 'order-system-id',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Alphabetical order</MenuItem>
            <MenuItem value={20}>Most provided services</MenuItem>
          </Select>
          

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
               <Table data={systemData.services} columnData={columnData} />
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
