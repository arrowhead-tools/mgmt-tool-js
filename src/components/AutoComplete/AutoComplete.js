import React, { Component } from 'react'
import Downshift from 'downshift'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'

class AutoComplete extends Component {
  state = {
    inputValue: ''
  }

  render() {
    const { classes, handleOnChange, keyValue, suggestions, label, placeholder, defaultValue, handleTextChange, required } = this.props
    return (
      <Downshift
        onChange={selection => {
          handleOnChange(selection)
        }}
        onStateChange={({ inputValue }) => {
          if (inputValue !== undefined) {
            handleTextChange(inputValue)
            this.setState({ inputValue })
          }
        }}
        selectedItem={defaultValue || this.state.inputValue}
        itemToString={item => {
          return item && item[keyValue] ? item[keyValue] : this.state.inputValue
        }}
      >
        {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
          }) => (
          <div>
            <TextField value={this.state.inputValue} label={label} placeholder={placeholder} {...getInputProps()}
                       style={classes.textField} required={required}/>
            <div {...getMenuProps()}>
              {isOpen ?
                <Paper className={classes.paper} square>{
                  suggestions.filter(item => !inputValue || item[keyValue].includes(inputValue))
                    .map((item, index) => (
                      <MenuItem
                        {...getItemProps({ key: item.id, index, item })}
                        key={item.id}
                        component='div'
                        selected={highlightedIndex === index}
                        style={{
                          fontWeight: selectedItem === item ? 500 : 400
                        }}
                      >
                        {item[keyValue]}
                      </MenuItem>
                    ))
                }</Paper> : null}
            </div>
          </div>
        )}
      </Downshift>
    )
  }
}

AutoComplete.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  suggestions: PropTypes.array.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  keyValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  required: PropTypes.bool
}

export default AutoComplete
