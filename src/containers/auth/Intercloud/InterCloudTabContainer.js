import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CloudTab from './Cloud/CloudTab'
import ServiceTab from './Service/ServiceTab'

const styles = (theme) => ({})

class InterCloudTabContainer extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = (index) => {
    this.setState({ value: index })
  }

  render() {
    const { theme, cloudData, serviceData, deleteInterCloudEntry } = this.props
    const { value } = this.state
    return (
      <div>
        <AppBar position="static" style={{ background: '#004676' }}>
          <Tabs value={value} onChange={this.handleChange} variant="fullWidth">
            <Tab label="Cloud" />
            <Tab label="Service" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <CloudTab
            dir={theme.direction}
            clouds={cloudData}
            deleteInterCloudEntry={deleteInterCloudEntry}
          />
          <ServiceTab
            dir={theme.direction}
            services={serviceData}
            deleteInterCloudEntry={deleteInterCloudEntry}
          />
        </SwipeableViews>
      </div>
    )
  }
}

InterCloudTabContainer.propTypes = {
  theme: PropTypes.object.isRequired,
  cloudData: PropTypes.array.isRequired,
  serviceData: PropTypes.array.isRequired,
  deleteInterCloudEntry: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(InterCloudTabContainer)
