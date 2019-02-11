import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import BackupServiceList from './BackupServiceList'

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

class BackupListTab extends React.Component {
  render() {
    const { data, classes, savePriorities } = this.props
    return (
      <div className={classes.root}>
        {data.map(entry => {
          return (
            <ExpansionPanel key={entry.consumerData.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {entry.consumerData.systemName}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.child}>
                <BackupServiceList
                  services={entry.consumedServices}
                  savePriorities={savePriorities}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
      </div>
    )
  }
}

BackupListTab.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  savePriorities: PropTypes.func.isRequired
}

export default withStyles(styles)(BackupListTab)
