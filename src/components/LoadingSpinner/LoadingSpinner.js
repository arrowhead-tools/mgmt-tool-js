/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2020. 01. 16.
 */

import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  loadingContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class LoadingSpinner extends React.Component{
  render(){
    const { classes } = this.props
    return <div className={classes.loadingContainer}><CircularProgress/></div>
  }
}

export default withStyles(styles, {withTheme: true})(LoadingSpinner)
