import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import NeighborhoodTab from './Neighborhood/NeighborhoodTab'
import RelayTab from './Relay/RelayTab'

const styles = theme => ({})

class GatekeeperTabContainer extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { theme, relayData, neighborhoodData, handlers } = this.props
    const { value } = this.state
    return (
      <div>
        <AppBar position='static' style={{ background: '#004676' }}>
          <Tabs value={value} onChange={this.handleChange} variant='fullWidth'>
            <Tab label='Neighborhood' />
            <Tab label='Relay' />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <NeighborhoodTab dir={theme.direction} data={neighborhoodData} handlers={handlers.neighborhood} />
          <RelayTab dir={theme.direction} data={relayData} handlers={handlers.relay} />
        </SwipeableViews>
      </div>
    )
  }
}

GatekeeperTabContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  relayData: PropTypes.array.isRequired,
  neighborhoodData: PropTypes.array.isRequired,
  handlers: PropTypes.object
}

export default withStyles(styles, { withTheme: true })(GatekeeperTabContainer)
