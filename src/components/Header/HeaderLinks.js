import React from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Hidden from '@material-ui/core/Hidden'
import MenuItem from "@material-ui/core/MenuItem"
import MenuList from "@material-ui/core/MenuList"
import Grow from "@material-ui/core/Grow"
import Paper from "@material-ui/core/Paper"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"

// @material-ui/icons
import Person from '@material-ui/icons/Person'
// core components
import Button from '../CustomButtons/Button'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { startLogout } from '../../actions/auth'
import headerLinksStyle from '../../assets/jss/material-dashboard-react/components/headerLinksStyle'
import Header from './Header';

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: props.value }
  }
  state = {
    open: false,
  }
  
  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleLogout = () => {
    this.props.startLogout()
  }


  render() {
    const { classes } = this.props
    const { open } = this.state
    return (
      <div>
      <Button
        color={window.innerWidth > 959 ? 'transparent' : 'white'}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label='Person'
        aria-owns={open ? "menu-list" : null}
        aria-haspopup="true"
        onClick={this.handleClick}
        className={classes.buttonLink}
      >
        <Person className={classes.icons} />
        <Hidden mdUp>
          <p onClick={this.handleClick} className={classes.linkText}>Profile</p>
        </Hidden>
      </Button>

     <ClickAwayListener onClickAway={this.handleClose}>
        <Grow
          in={open}
          id="menu-list"
          style={{ transformOrigin: "0 0 0" }}
        >
          <Paper className={classes.dropdown}>
            <MenuList role="menu">
              <MenuItem
                onClick={this.handleLogout}
                className={classes.dropdownItem}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Paper>
        </Grow>
    </ClickAwayListener>
</div>
)

  }
}

HeaderLinks.propTypes = {
  startLogout: PropTypes.func
}

function mapStateToProps(state) {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {
    startLogout: () => {
      dispatch(startLogout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerLinksStyle)(HeaderLinks))