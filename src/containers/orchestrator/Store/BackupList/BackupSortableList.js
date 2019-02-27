import React from 'react'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import * as PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'
import EditIcon from '@material-ui/icons/Edit'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  item: {
    width: '100%'
  },
  deleteItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const SortableItem = sortableElement(({ value, classes, deleteStoreEntry }) => (
  <li className="SortableItem">
    <div className={classes.container}>
      <div className={classes.item}>
        {console.log(value)}
        <Typography>
          <b>System Name: </b> {value.systemName}
        </Typography>
        <Typography>
          <b>Address:</b> {value.address}
        </Typography>
        <Typography>
          <b>Port: </b> {value.port}
        </Typography>
      </div>
      <div className={classes.deleteItem}>
        <EditIcon />
        <ClearIcon color="error" onClick={(e) => {e.preventDefault();deleteStoreEntry(value.storeEntryId)}} />
      </div>
    </div>
  </li>
))

const SortableContainer = sortableContainer(({ children }) => {
  return <ul className="SortableList">{children}</ul>
})

class BackupSortableList extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    this.setState({ items: this.props.list })
  }

  onSortEnd = async ({ oldIndex, newIndex }) => {
    await this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }))

    const disabled = _.isEqual(this.state.items, this.props.list)
    this.props.onItemsOrderChanged(
      this.props.serviceId,
      disabled,
      this.state.items
    )
  }

  onItemsOrderChanged = newArray => {
    return _.isEqual(newArray, this.props.list)
  }

  render() {
    const { items } = this.state
    const { classes, deleteStoreEntry } = this.props

    return (
      <SortableContainer onSortEnd={this.onSortEnd}>
        {items.map((provider, index) => (
          <SortableItem
            key={index}
            index={index}
            value={provider}
            deleteStoreEntry={deleteStoreEntry}
            helperClass="SortableHelper"
            classes={classes}
          />
        ))}
      </SortableContainer>
    )
  }
}

BackupSortableList.propTypes = {
  list: PropTypes.array.isRequired,
  onItemsOrderChanged: PropTypes.func.isRequired,
  serviceId: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  deleteStoreEntry: PropTypes.func.isRequired
}

export default withStyles(styles)(BackupSortableList)
