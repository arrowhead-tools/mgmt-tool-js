import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import StepsList from './StepsList'
import Divider from '@material-ui/core/Divider'
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

class ChoreographerTab extends Component {
  //  TODO entry.id instead of name
  render() {
    const { data, classes, deletePlan } = this.props
    return (
      <div className={classes.root}>
        {data.map(entry => {
          return (
            <ExpansionPanel key={entry.Name}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Plan name: {entry.Name}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.child}>
                <StepsList steps={entry.Steps} />
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Button
                  onClick={() => {
                    this.props.deletePlan(entry.id)
                  }}
                >
                  Delete
                </Button>
                >
              </ExpansionPanelActions>
            </ExpansionPanel>
          )
        })}
      </div>
    )
  }
}

ChoreographerTab.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  deletePlan: PropTypes.func.isRequired
}

export default withStyles(styles)(ChoreographerTab)
