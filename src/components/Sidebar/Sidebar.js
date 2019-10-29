import React from 'react'
import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
// @material-ui/core components
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import withStyles from '@material-ui/core/styles/withStyles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ImportExport from '../ImportExport/ImportExport'

import sidebarStyle from '../../assets/jss/material-dashboard-react/components/sidebarStyle'

class Sidebar extends React.Component {
  state = {}

  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1
  }

  handleClick = item => () => {
    if (this.state[item] === undefined) {
      this.setState({[item]: true})
    } else {
      this.setState(state => ({[item]: !state[item]}))
    }
  }

  render() {
    const {classes, color, logo, image, logoText, routes} = this.props

    const importExportFeature = (
     <ImportExport classes={classes} />
    )

    const links = (
      <div>
        <List className={classes.list}>
          {routes.map((prop, key) => {
            if (prop.redirect) return null
            if (prop.collapse) {
              const whiteFontClasses = classNames({
                [' ' + classes.whiteFont]: this.activeRoute(prop.path)
              })
              return (
                <div key={key}>
                  <ListItem
                    button
                    onClick={this.handleClick(prop.state)}
                    className={classes.itemLink}
                  >
                    <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                      <prop.icon/>
                    </ListItemIcon>
                    <ListItemText
                      primary={prop.sidebarName}
                      className={classes.itemText + whiteFontClasses}
                      disableTypography
                    />
                    {this.state[prop.state] ? (
                      <ArrowDropUp className={classes.white}/>
                    ) : (
                      <ArrowDropDown className={classes.white}/>
                    )}
                  </ListItem>
                  <Collapse
                    in={this.state[prop.state]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List className={classes.list}>
                      {prop.views.map((view, index) => {
                        let activePro = ' '
                        const listItemClasses = classNames({
                          [' ' + classes[color]]: this.activeRoute(view.path)
                        })
                        const whiteFontClasses = classNames({
                          [' ' + classes.whiteFont]: this.activeRoute(view.path)
                        })
                        return (
                          <NavLink
                            to={view.path}
                            className={activePro + classes.item}
                            activeClassName="active"
                            key={key + '-' + index}
                          >
                            <ListItem
                              button
                              className={
                                classes.nested +
                                ' ' +
                                classes.itemLink +
                                listItemClasses
                              }
                            >
                              <ListItemIcon
                                className={classes.itemIcon + whiteFontClasses}
                              >
                                <view.icon/>
                              </ListItemIcon>
                              <ListItemText
                                primary={view.sidebarName}
                                className={classes.itemText + whiteFontClasses}
                                disableTypography
                              />
                            </ListItem>
                          </NavLink>
                        )
                      })}
                    </List>
                  </Collapse>
                </div>
              )
            } else {
              let activePro = ' '
              const listItemClasses = classNames({
                [' ' + classes[color]]: this.activeRoute(prop.path)
              })
              const whiteFontClasses = classNames({
                [' ' + classes.whiteFont]: this.activeRoute(prop.path)
              })
              return (
                <NavLink
                  to={prop.path}
                  className={activePro + classes.item}
                  activeClassName="active"
                  key={key}
                >
                  <ListItem button className={classes.itemLink + listItemClasses}>
                    <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                      <prop.icon/>
                    </ListItemIcon>
                    <ListItemText
                      primary={prop.sidebarName}
                      className={classes.itemText + whiteFontClasses}
                      disableTypography
                    />
                  </ListItem>
                </NavLink>
              )
            }
          })}
        </List>
        <div>
          {importExportFeature}
        </div>
      </div>

    )
    const brand = (
      <div className={classes.logo}>
        <a href="http://www.arrowhead.eu" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img}/>
          </div>
          {logoText}
        </a>
      </div>
    )
    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{backgroundImage: 'url(' + image + ')'}}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{backgroundImage: 'url(' + image + ')'}}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    )
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(sidebarStyle)(Sidebar)
