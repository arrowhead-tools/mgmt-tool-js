/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2019. 10. 29.
 */

import React, {Component} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CloudUpload from '@material-ui/icons/CloudUpload'
import CloudDownload from '@material-ui/icons/CloudDownload'
import ListItemText from '@material-ui/core/ListItemText'
import Files from 'react-files'

class ImportExport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jsonFile: {}
    }

    this.fileReader = new FileReader()
    this.fileReader.onload = event => {
      this.setState({jsonFile: JSON.parse(event.target.result)}, () => {
        console.log(this.state.jsonFile)
      })
    }
  }


  render() {
    const {classes} = this.props
    return (
      <div className={classes.importExport}>
        <List className={classes.list}>
          <ListItem
            button
            className={classes.itemLink}
          >
            <ListItemIcon className={classes.itemIcon}>
              <CloudUpload/>
            </ListItemIcon>
            <Files
              className={classes.itemText}
              onChange={file => {
                this.fileReader.readAsText(file[0])
              }}
              onError={err => console.log(err)}
              accepts={['.json']}
              multiple={false}
              maxFileSize={10000000}
              minFileSize={0}
              clickable>
              <div style={{paddingLeft: '16px', paddingRight: '116px'}}>
                Import
              </div>
            </Files>
          </ListItem>
          <ListItem
            button
            onClick={() => console.log('click2')}
            className={classes.itemLink}
          >
            <ListItemIcon className={classes.itemIcon}>
              <CloudDownload/>
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