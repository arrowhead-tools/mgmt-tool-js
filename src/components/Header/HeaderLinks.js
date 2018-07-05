import React from 'react'
import { Manager, Popper, Target } from 'react-popper'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Hidden from '@material-ui/core/Hidden'
// @material-ui/icons
import Person from '@material-ui/icons/Person'
// core components
import Button from '../CustomButtons/Button'

import headerLinksStyle from '../../assets/jss/material-dashboard-react/components/headerLinksStyle'

class HeaderLinks extends React.Component {
  state = {
    open: false
  }
  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    const { open } = this.state
    return (
      <Button
        color={window.innerWidth > 959 ? 'transparent' : 'white'}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label='Person'
        className={classes.buttonLink}
      >
        <Person className={classes.icons} />
        <Hidden mdUp>
          <p className={classes.linkText}>Profile</p>
        </Hidden>
      </Button>
    )
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks)
