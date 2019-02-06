import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Divider from '@material-ui/core/Divider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
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
  }
})

class EventHandlerTab extends Component {
  render() {
    const { events, classes, deleteEventHandler } = this.props
    return (
      <div className={classes.root}>
        {
          events.map(event => {
            return (
              <ExpansionPanel key={event.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>{event.eventType}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.child}>
                  <Typography><b>Consumer Name:</b> {event.consumer.systemName}</Typography>
                  <Typography><b>Consumer Address:</b> {event.consumer.address}</Typography>
                  <Typography><b>Consumer Port:</b> {event.consumer.port}</Typography>
                  <Typography><b>Notify URI:</b> {event.notifyUri}</Typography>
                  <Typography><b>Match Metadata:</b> {event.matchMetadata ? '✓' : '✗'}</Typography>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                  <Button
                    size='small'
                    onClick={deleteEventHandler(event.eventType, event.consumer.systemName)}>
                    Delete
                  </Button>
                </ExpansionPanelActions>
              </ExpansionPanel>
            )
          })
        }
      </div>
    )
  }
}

EventHandlerTab.propTypes = {
  events: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  deleteEventHandler: PropTypes.func.isRequired
}

export default withStyles(styles)(EventHandlerTab)
