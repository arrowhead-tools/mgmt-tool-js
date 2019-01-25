import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import DefaultConfigTab from './DefaultConfig/DefaultConfigTab'
import BackupListTab from './BackupList/BackupListTab'

const styles = theme => ({})

class OrchestrationStoreTabContainer extends Component {
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
    const { theme, backupList } = this.props
    const { value } = this.state
    return (
      <div>
        <AppBar position='static' style={{ background: '#004676' }}>
          <Tabs value={value} onChange={this.handleChange} variant='fullWidth'>
            <Tab label='Default Config' />
            <Tab label='Backup List' />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}>
          <DefaultConfigTab dir={theme.direction} />
          <BackupListTab dir={theme.direction} data={backupList} />
        </SwipeableViews>
      </div>
    )
  }
}

OrchestrationStoreTabContainer.propTypes = {
  theme: PropTypes.object.isRequired,
  backupList: PropTypes.array.isRequired
}

export default withStyles(styles, { withTheme: true })(OrchestrationStoreTabContainer)
