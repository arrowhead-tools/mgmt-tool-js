import React from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import Downshift from 'downshift'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import Button from '../CustomButtons/Button'
import ClearIcon from '@material-ui/icons/Clear'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import { filterItems } from '../../utils/utils'

function renderInput(inputProps) {
  const {
    InputProps,
    classes,
    disabled,
    deleteAll,
    getToggleButtonProps,
    selectedItem,
    required,
    ref,
    ...other
  } = inputProps
  return (
    <div
      style={{ marginLeft: '20px', display: 'flex', alignItems: 'baseline' }}
    >
      <TextField
        required={required}
        disabled={disabled}
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput
          },
          ...InputProps
        }}
        {...other}
      />
      {selectedItem.length > 0 ? (
        <Button justIcon color="transparent" onClick={deleteAll}>
          <ClearIcon />
        </Button>
      ) : (
        <Button
          disabled={disabled}
          color="transparent"
          justIcon
          {...getToggleButtonProps()}
        >
          <KeyboardArrowDown />
        </Button>
      )}
    </div>
  )
}

class AutoCompleteMulti extends React.Component {
  state = {
    inputValue: '',
    selectedItem: []
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state
    if (
      selectedItem.length &&
      !inputValue.length &&
      keycode(event) === 'backspace'
    ) {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1)
      })
    }
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  handleChange = item => {
    if (item) {
      let { selectedItem } = this.state
      const { handleOnChange } = this.props

      if (selectedItem.indexOf(item) === -1) {
        selectedItem = [...selectedItem, item]
      }

      handleOnChange(selectedItem)

      this.setState({
        inputValue: '',
        selectedItem
      })
    }
  }

  handleDelete = item => () => {
    const { handleOnChange } = this.props
    const selectedItem = [...this.state.selectedItem]
    selectedItem.splice(selectedItem.indexOf(item), 1)
    handleOnChange(selectedItem)
    this.setState({ selectedItem })
  }

  deleteAll = () => {
    this.props.handleOnChange([])
    this.setState({ selectedItem: [] })
  }

  render() {
    const {
      classes,
      disabled,
      label,
      placeholder,
      suggestions,
      keyValue,
      required
    } = this.props
    const { inputValue, selectedItem } = this.state

    return (
      <Downshift
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedItem}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          getToggleButtonProps,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex
        }) => (
          <div>
            {renderInput({
              fullWidth: true,
              classes,
              required,
              selectedItem,
              disabled,
              deleteAll: this.deleteAll,
              getToggleButtonProps,
              InputProps: getInputProps({
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item.id}
                    tabIndex={-1}
                    label={item[keyValue]}
                    className={classes.chip}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown
              }),
              label,
              placeholder
            })}
            <div>
              <MenuList {...getMenuProps({ open: isOpen })}>
                {isOpen
                  ? filterItems(suggestions, inputValue2, keyValue).map(
                      (item, index) => (
                        <MenuItem
                          {...getItemProps({ key: item.id, index, item })}
                          key={item.id}
                          component="div"
                          selected={highlightedIndex === index}
                        >
                          {item[keyValue]}
                        </MenuItem>
                      )
                    )
                  : null}
              </MenuList>
            </div>
          </div>
        )}
      </Downshift>
    )
  }
}

AutoCompleteMulti.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  suggestions: PropTypes.array,
  keyValue: PropTypes.string,
  required: PropTypes.bool
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  inputRoot: {
    flexWrap: 'wrap'
  },
  inputInput: {
    flexGrow: 1,
    width: 'auto'
  },
  textField: {
    width: '400px',
    marginLeft: '20px'
  },
  container: {
    display: 'flex',
    alignItems: 'baseline'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  }
})

export default withStyles(styles)(AutoCompleteMulti)
