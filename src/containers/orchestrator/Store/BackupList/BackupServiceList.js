import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Divider from '@material-ui/core/Divider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import BackupSortableList from './BackupSortableList'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium
  },
  child: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  marginRight20: {
    marginRight: '18px'
  }
})

class BackupServiceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onItemsOrderChanged = (serviceId, newValue, array) => {
    this.setState({ [serviceId]: { disabled: newValue, array } })
  }

  onButtonClick = serviceId => () => {
    const helperObject = {}
    this.state[serviceId].array.map((item, index) => {
      helperObject[item.storeEntryId] = index + 1
    })

    this.props.savePriorities(helperObject)
  }

  render() {
    const { classes, services } = this.props
    return (
      <div className={classes.root}>
        {services.map(service => {
          return (
            <ExpansionPanel key={service.service.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {service.service.serviceDefinition}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.child}>
                <BackupSortableList
                  list={service.providers}
                  serviceId={service.service.id}
                  onItemsOrderChanged={this.onItemsOrderChanged}
                />
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Button
                  onClick={() => {
                    this.props.deleteService(service.service.id)
                  }}
                >
                  Delete
                </Button>
                <Button
                  color="primary"
                  className={classes.marginRight20}
                  disabled={
                    this.state[service.service.id] === undefined
                      ? true
                      : this.state[service.service.id].disabled
                  }
                  onClick={this.onButtonClick(service.service.id)}
                >
                  Save
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          )
        })}
      </div>
    )
  }
}

BackupServiceList.propTypes = {
  services: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  savePriorities: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired
}

export default withStyles(styles)(BackupServiceList)
