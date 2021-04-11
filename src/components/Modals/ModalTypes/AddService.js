import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import Button from '../../../components/CustomButtons/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles/'
import { addService } from '../../../actions/serviceRegistry'
import ChipInput from 'material-ui-chip-input'

const styles = (theme) => ({
  container: {
    display: 'flex',
    width: '400px'
  },
  input: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '400px'
  }
})

class AddService extends Component {
  constructor(props) {
    super(props)

    this.state = {
      serviceDefinition: '',
      interfaces: [],
      serviceMetadata: {}
    }
  }

  handleServiceDefinitionOnChange = (event) => {
    this.setState({ serviceDefinition: event.target.value })
  }

  handleInterfaceChipsOnChange = (chips) => {
    this.setState({ interfaces: chips })
  }

  handleAddServiceButtonClick = () => {}

  render() {
    const { classes } = this.props
    return (
      <Card
        raised
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '10px',
          width: '440px'
        }}
      >
        <TextField
          id="servicedefinition"
          required
          onChange={this.handleServiceDefinitionOnChange}
          label="ServiceDefinition"
          className={classes.input}
        />
        <ChipInput
          onChange={this.handleInterfaceChipsOnChange}
          className={classes.input}
          label="Interfaces"
        />
        <Button
          disabled
          color="primary"
          onClick={this.handleAddServiceButtonClick}
          style={{
            width: '400px',
            marginLeft: '20px',
            marginRight: '20px',
            marginBottom: '20px'
          }}
        >
          Add Service
        </Button>
      </Card>
    )
  }
}

AddService.propTypes = {
  classes: PropTypes.object.isRequired,
  addService: PropTypes.func.isRequired
}

function mapStateToProps(dispatch) {}

function mapDispatchToProps(dispatch) {
  return {
    addService: () => {
      dispatch(addService())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddService))
