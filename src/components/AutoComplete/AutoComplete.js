import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'

class AutoComplete extends Component {
  state = {
    inputValue: ''
  }

  render() {
    const paperStyle = {
      margin: '5px'
    }

    const { defaultValue, suggestions, placeholder, id, classes, handleOnChange } = this.props
    return (
      <Downshift
        onStateChange={({ inputValue }) => {
          handleOnChange(inputValue)
          return this.setState({ inputValue })
        }}
        selectedItem={defaultValue || this.state.inputValue}
      >
        {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
          <div>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder,
                id
              })
            })}
            {isOpen ? (
              <Paper style={paperStyle} square>
                {getSuggestions(suggestions, inputValue).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion }),
                    highlightedIndex,
                    selectedItem
                  })
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }
}

AutoComplete.propTypes = {
  defaultValue: PropTypes.string,
  suggestions: PropTypes.arrayOf(String).isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.object,
  handleOnChange: PropTypes.func.isRequired
}

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps

  return (
    <TextField
      style={classes.textField}
      InputProps={{
        inputRef: ref,
        ...InputProps
      }}
      {...other}
    />
  )
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion) > -1

  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component='div'
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion}
    </MenuItem>
  )
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.arrayOf(String).isRequired
}

function getSuggestions(suggestions, inputValue) {
  let count = 0

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 5

    if (keep) {
      count += 1
    }

    return keep
  })
}

export default AutoComplete
