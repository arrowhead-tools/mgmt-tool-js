import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import CustomButton from '../../../components/CustomButtons/Button'

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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: '10px',
  },
})

class CloudTab extends Component {
  render() {
    const { data, classes, handlers } = this.props
    return (
        <div className={classes.root}>
            <div className={classes.buttonContainer}>
                <CustomButton
                    color="primary"
                    onClick={handlers.onAddNeighborhoodClick}
                >
                    <AddIcon />
                    Add
                </CustomButton>
            </div>
            {data.map((entry) => (
                <ExpansionPanel key={entry.id}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            {entry.name}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.child}>
                        <Typography>
                            <b>Operator:</b>
                            {' '}
                            {entry.operator}
                        </Typography>
                        <Typography>
                            <b>Own Cloud:</b>
                            {' '}
                            {entry.ownCloud ? '✓' : '✗'}
                        </Typography>
                        <Typography>
                            <b>Neighbor:</b>
                            {' '}
                            {entry.neighbor ? '✓' : '✗'}
                        </Typography>
                        {/* <Typography>
                  <b>Gatekeeper Service URI</b>{' '}
                  {entry.cloud.gatekeeperServiceURI}
                </Typography> */}
                        <Typography noWrap>
                            <b>Authentication Info:</b>
                            {' '}
                            {entry.authenticationInfo || '-'}
                        </Typography>
                        <Typography>
                            <b>Secure:</b>
                            {' '}
                            {entry.secure ? '✓' : '✗'}
                        </Typography>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <Button
                            size="small"
                            onClick={handlers.onDeleteNeighborhoodClick(entry.id)}
                        >
                            Delete
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            onClick={handlers.onModifyNeighborhoodClick(entry)}
                        >
                            Edit
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            ))}
        </div>
    )
  }
}

CloudTab.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired,
}

export default withStyles(styles)(CloudTab)
