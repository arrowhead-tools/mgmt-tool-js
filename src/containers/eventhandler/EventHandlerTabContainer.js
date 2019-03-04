import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import EventHandlerTab from './EventHandler/EventHandlerTab'

const styles = theme => ({})

class EventHandlerTabContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 0
    }
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { theme, events, deleteEventHandler, modifyEventHandler } = this.props
    const { value } = this.state
    return (
      <div>
        <AppBar position="static" style={{ background: '#004676' }}>
          <Tabs value={value} onChange={this.handleChange} variant="fullWidth">
            <Tab label="Events" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <EventHandlerTab
            events={events}
            deleteEventHandler={deleteEventHandler}
            modifyEventHandler={modifyEventHandler}
          />
        </SwipeableViews>
      </div>
    )
  }
}

EventHandlerTabContainer.propTypes = {
  theme: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  deleteEventHandler: PropTypes.func.isRequired,
  modifyEventHandler: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(EventHandlerTabContainer)
