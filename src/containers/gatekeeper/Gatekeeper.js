import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TableGK from '../../components/Table/TableGK'
import { getClouds } from '../../actions/gatekeeper'

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
  }
})

class Gatekeeper extends Component {
  componentDidMount() {
    this.props.getClouds()
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
              <TableGK data={serviceData.clouds} columnData={columnData} key={serviceData.id} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
      )
  }
}

Gatekeeper.propTypes = {
  classes: PropTypes.object.isRequired,
  getClouds: PropTypes.func.isRequired,
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Gatekeeper))
