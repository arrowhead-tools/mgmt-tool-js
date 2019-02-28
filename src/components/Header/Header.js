import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
// @material-ui/icons
import Menu from '@material-ui/icons/Menu'
// core components
import Button from '../CustomButtons/Button'

import headerStyle from '../../assets/jss/material-dashboard-react/components/headerStyle'

function Header({ ...props }) {
  function makeBrand() {
    let name
    for (const prop of props.routes) {
      if (prop.collapse) {
        for (const view of prop.views) {
          if (view.path === props.location.pathname) {
            name = view.navbarName
          }
        }
      } else {
        if (prop.path === props.location.pathname) {
          name = prop.navbarName
        }
      }
    }
    return name
  }

  const { classes, color } = props
  const appBarClasses = classNames({
    [' ' + classes[color]]: color
  })
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden mdUp>
          <IconButton
            className={classes.appResponsive}
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  routes: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired
}

export default withStyles(headerStyle)(Header)
