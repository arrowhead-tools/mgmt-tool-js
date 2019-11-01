/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2019. 11. 01.
 */

import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl';

class RelayTypeDropdown extends Component {

  render () {
    const { value, handleTypeChange, classes } = this.props
    return (
      <FormControl className={classes.input}>
        <InputLabel htmlFor="Type">Type</InputLabel>
        <Select
          value={value}
          onChange={handleTypeChange}
          inputProps={{
            name: 'type',
            id: 'type',
          }}
        >
          <MenuItem value='GENERAL_RELAY'>General Relay</MenuItem>
          <MenuItem value='GATEKEEPER_RELAY'>Gatekeeper Relay</MenuItem>
          <MenuItem value='GATEWAY_RELAY'>Gateway Relay</MenuItem>
        </Select>
      </FormControl>
    )
  }
}

RelayTypeDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default RelayTypeDropdown
