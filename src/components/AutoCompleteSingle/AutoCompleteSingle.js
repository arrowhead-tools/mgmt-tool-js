import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Downshift from 'downshift'
import Button from '../CustomButtons/Button'
import ClearIcon from '@material-ui/icons/Clear'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import { filterItems } from '../../utils/utils'

class AutoCompleteSingle extends Component {
  render() {
    const { classes, keyValue, suggestions, label, placeholder, required, disabled, handleOnChange } = this.props
    return (
      <div>
        <Downshift
          onChange={selection =>
            handleOnChange(selection)
          }
          itemToString={item => item ? item[keyValue] : ''}
        >
          {({
              getLabelProps,
              getInputProps,
              getToggleButtonProps,
              getMenuProps,
              getItemProps,
              isOpen,
              clearSelection,
              selectedItem,
              inputValue,
              highlightedIndex
            }) => (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <TextField
                  label={label}
                  disabled={disabled}
                  placeholder={placeholder}
                  style={classes.textField}
                  required={required}
                  {...getInputProps()} />
                {selectedItem ? (
                  <Button
                    justIcon
                    color='transparent'
                    onClick={clearSelection}
                  >
                    <ClearIcon />
                  </Button>
                ) : (
                  <Button disabled={disabled} color='transparent' justIcon {...getToggleButtonProps()}>
                    <KeyboardArrowDown />
                  </Button>
                )}
              </div>
              <div>
                <MenuList {...getMenuProps({ open: isOpen })}>
                  {isOpen
                    ? filterItems(suggestions, inputValue, keyValue).map(
                      (item, index) => (
                        <MenuItem
                          {...getItemProps({ key: item.id, index, item })}
                          key={item.id}
                          component='div'
                          selected={highlightedIndex === index}
                          stle={{ fontWeight: selectedItem === item ? 500 : 400 }}>
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
      </div>
    )
  }
}

AutoCompleteSingle.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
  suggestions: PropTypes.array.isRequired,
  keyValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

export default AutoCompleteSingle
