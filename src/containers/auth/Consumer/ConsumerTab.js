import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
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

class ConsumerTab extends Component {
  render() {
    const { consumerData, classes } = this.props
    console.log('Consumer Tab render')
    return (<div className={classes.root}>
      {
        consumerData.map(consumerEntry => {
          return (
            <ExpansionPanel key={consumerEntry.consumer.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{consumerEntry.consumer.systemName}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.child}>
                Detail
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })
      }
    </div>)
  }
}

ConsumerTab.propTypes = {
  consumerData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ConsumerTab)
