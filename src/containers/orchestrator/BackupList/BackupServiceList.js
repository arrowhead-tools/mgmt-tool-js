import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import BackupSortableList from './BackupSortableList'

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
  }
})

class BackupServiceList extends React.Component {
  render() {
    const { classes, services } = this.props
    return (
      <div className={classes.root}>
        {
          services.map(service => {
            return (
              <ExpansionPanel key={service.service.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>{service.service.serviceDefinition}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.child}>
                  <BackupSortableList list={service.providers} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
        }
      </div>
    )
  }
}

BackupServiceList.propTypes = {
  services: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BackupServiceList)
