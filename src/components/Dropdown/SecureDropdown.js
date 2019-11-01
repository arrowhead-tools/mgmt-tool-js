/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2019. 10. 28.
 */

import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl';

class SecureDropdown extends Component {

    render () {
        const { value, handleSecureChange, classes } = this.props
        return (
            <FormControl className={classes.input}>
                <InputLabel htmlFor="secure">Security</InputLabel>
                <Select
                    value={value}
                    onChange={handleSecureChange}
                    inputProps={{
                        name: 'secure',
                        id: 'secure',
                    }}
                >
                    <MenuItem value='NOT_SECURE'>Not Secure</MenuItem>
                    <MenuItem value='CERTIFICATE'>Certificate</MenuItem>
                    <MenuItem value='TOKEN'>Token</MenuItem>
                </Select>
            </FormControl>
        )
    }
}

SecureDropdown.propTypes = {
    value: PropTypes.string.isRequired,
    handleSecureChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default SecureDropdown
