import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TableBroker from '../../components/Table/TableBroker'
import { getServices } from '../../actions/broker'

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

class Broker extends Component {
  componentDidMount() {
    this.props.getServices()
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
      <br/>      <br/>

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
      </div>

    )
  }
}

Broker.propTypes = {
  classes: PropTypes.object.isRequired,
  getServices: PropTypes.func.isRequired,
  broker: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { broker } = state
  return { broker }
}

function mapDispatchToProps(dispatch) {
  return {
    getServices: () => {
      dispatch(getServices())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Broker))
