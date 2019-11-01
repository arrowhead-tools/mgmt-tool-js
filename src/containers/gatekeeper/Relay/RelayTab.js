import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Divider from '@material-ui/core/Divider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CustomButton from '../../../components/CustomButtons/Button'

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
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: '10px'
  }
})

class RelayTab extends Component {
  render() {
    const { data, classes, handlers } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
          <CustomButton color="primary" onClick={handlers.onAddRelayClick}>
            <AddIcon />
            Add
          </CustomButton>
        </div>
        {data.map(entry => {
          return (
            <ExpansionPanel key={entry.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{`${entry.address}:${
                  entry.port
                }`}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.child}>
                <Typography>
                  <b>Type:</b> {entry.type}
                </Typography>
                <Typography>
                  <b>Secure:</b> {entry.secure ? '✓' : '✗'}
                </Typography>
                <Typography>
                  <b>Exclusive:</b> {entry.exclusive ? '✓' : '✗'}
                </Typography>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Button
                  size="small"
                  onClick={handlers.onDeleteRelayClick(entry.id)}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={handlers.onModifyRelayClick(entry)}
                >
                  Edit
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          )
        })}
      </div>
    )
  }
}

RelayTab.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default withStyles(styles)(RelayTab)
