/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2019. 10. 29.
 */

import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CloudUpload from '@material-ui/icons/CloudUpload'
import CloudDownload from '@material-ui/icons/CloudDownload'
import ListItemText from '@material-ui/core/ListItemText'

class ImportExport extends Component{
  render(){
    const { classes } = this.props
    return (
      <div className={classes.importExport}>
        <List className={classes.list}>
          <ListItem
            button
            onClick={() => console.log('click')}
            className={classes.itemLink}
          >
            <ListItemIcon className={classes.itemIcon}>
              <CloudUpload />
            </ListItemIcon>
            <ListItemText
              primary="Import"
              className={classes.itemText}
              disableTypography
            />
          </ListItem>
          <ListItem
            button
            onClick={() => console.log('click2')}
            className={classes.itemLink}
          >
            <ListItemIcon className={classes.itemIcon}>
              <CloudDownload />
            </ListItemIcon>
            <ListItemText
              primary="Export"
              className={classes.itemText}
              disableTypography
            />
          </ListItem>
        </List>
      </div>
    )
  }
}

export default ImportExport