import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

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

class NeighborhoodTab extends Component {
  render() {
    const { data, classes } = this.props
    return (
      <div className={classes.root}>
        {
          data.map(entry => {
            return (
              <ExpansionPanel key={entry.cloud.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>{entry.cloud.cloudName}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.child}>
                  <Typography><b>Operator:</b> {entry.cloud.operator}</Typography>
                  <Typography><b>Address:</b> {entry.cloud.address}</Typography>
                  <Typography><b>Port:</b> {entry.cloud.port}</Typography>
                  <Typography><b>Gatekeeper Service URI</b> {entry.cloud.gatekeeperServiceURI}</Typography>
                  <Typography noWrap><b>Authentication
                    Info:</b> {entry.cloud.authenticationInfo || '-'}</Typography>
                  <Typography><b>Secure:</b> {entry.cloud.secure ? '✓' : '✗'}</Typography>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                  <Button>Delete</Button>
                  <Button size='small' color='primary'>Edit</Button>
                </ExpansionPanelActions>
              </ExpansionPanel>
            )
          })
        }
      </div>
    )
  }
}

NeighborhoodTab.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NeighborhoodTab)
