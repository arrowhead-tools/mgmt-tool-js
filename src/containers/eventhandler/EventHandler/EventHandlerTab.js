import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import EventHandlerTable from './EventHandlerTable'

const styles = (theme) => ({
  root: {
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium,
  },
  child: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const columnData = [
  { id: 'systemName', disablePadding: false, label: 'Consumer System Name' },
  { id: 'address', disablePadding: false, label: 'Consumer Address' },
  { id: 'port', disablePadding: false, label: 'Consumer Port' },
  { id: 'notifyUri', disablePadding: false, label: 'Notify URI' },
  { id: 'sources', disablePadding: false, label: 'Sources' },
  {
    id: 'actions', disablePadding: false, label: 'Actions', disableSort: true,
  },
]

class EventHandlerTab extends Component {
  render() {
    const {
      events,
      classes,
      deleteEventHandler,
      modifyEventHandler,
    } = this.props
    return (
        <div className={classes.root}>
            {events.map((event) => (
                <ExpansionPanel key={event.eventType}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            Event Type:
                            {' '}
                            {event.eventType}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.child}>
                        <EventHandlerTable
                            data={event.consumers}
                            columnData={columnData}
                            deleteEventHandler={deleteEventHandler}
                            modifyEventHandler={modifyEventHandler}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    )
  }
}

EventHandlerTab.propTypes = {
  events: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  deleteEventHandler: PropTypes.func.isRequired,
  modifyEventHandler: PropTypes.func.isRequired,
}

export default withStyles(styles)(EventHandlerTab)
