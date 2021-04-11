import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

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
  row: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  marginRight20: {
    marginRight: '18px',
  },
})

class StepsList extends Component {
  render() {
    const { classes, steps } = this.props
    return (
        <div className={classes.root}>
            {steps.map((step) => (
                <ExpansionPanel key={step.name}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>{step.name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.child}>
                        <Typography>
                            <b>Next Steps:</b>
                            {' '}
                            {step.nextSteps && step.nextSteps.length
                              ? step.nextSteps.join(', ')
                              : '-'}
                        </Typography>
                        <Typography>
                            <b>Services:</b>
                            {' '}
                            {step.services && step.services.length
                              ? step.services.join(', ')
                              : '-'}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    )
  }
}

StepsList.propTypes = {
  steps: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StepsList)
