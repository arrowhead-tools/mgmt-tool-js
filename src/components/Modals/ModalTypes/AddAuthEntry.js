import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import { addAuthData, getAuthServices, getAuthSystems } from '../../../actions/auth'
import AutoCompleteSingle from '../../AutoCompleteSingle/AutoCompleteSingle'
import Button from '../../CustomButtons/Button'
import AddIcon from '@material-ui/icons/Add'
import AutoCompleteList from '../../AutoCompleteList/AutoCompleteList'
import ChipInput from 'material-ui-chip-input'

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    width: '440px'
  },
  title: {
    paddingTop: '10px'
  },
  buttonStyle: {
    width: '440px',
    marginLeft: '10px'
  },
  text: {
    paddingLeft: '20px'
  },
  textBottom: {
    paddingLeft: '20px',
    paddingBottom: '10px'
  },
  input: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '400px'
  }
})

class AddAuthEntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      consumerSystem: null,
      providerSystems: null,
      providedService: null,
      interface: [],
    }
  }

  componentDidMount() {
    this.props.getAuthSystems()
    this.props.getAuthServices()
  }

  handleConsumerSystemOnChange = consumerSystem => {
    this.setState({ consumerSystem })
  }

  handleProvidedServiceOnChange = providedService => {
    this.setState({ providedService })
  }

  handleProviderSystemOnChange = providerSystems => {
    this.setState({ providerSystems })
  }

  handleAddButtonClick = () => {
    this.props.addAuthData(this.state.consumerSystem, this.state.providerSystems, this.state.providedService, this.state.interface)
  }

  handleChipAdd = chip => {
    this.setState({ interface: [...this.state.interface, chip] })
  }

  handleDeleteChip = (deletedChip, index) => {
    this.setState({ interface: this.state.interface.filter((c) => c !== deletedChip) })
  }

  render() {
    const { systems, classes, services } = this.props
    return (
      <div>
        <Card raised className={classes.card}>
          <Typography variant='headline' align='center' className={classes.title}>Consumer System</Typography>
          <AutoCompleteSingle
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: { width: '400px', marginTop: '20px', marginLeft: '20px' }
            }}
            suggestions={systems}
            handleOnChange={this.handleConsumerSystemOnChange}
            keyValue='systemName'
            placeholder='Consumer System'
            label='Consumer System' />
          <Typography className={classes.text}><b>Address:</b> {this.state.consumerSystem ? this.state.consumerSystem.address : ''}</Typography>
          <Typography className={classes.textBottom}><b>Port:</b> {this.state.consumerSystem ? this.state.consumerSystem.port : ''}</Typography>
        </Card>
        <Card raised className={classes.card}>
          <Typography variant='headline' align='center' className={classes.title}>Consumed Service</Typography>
          <AutoCompleteSingle
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: { width: '400px', marginTop: '20px', marginLeft: '20px' }
            }}
            suggestions={services}
            keyValue='serviceDefinition'
            label='Consumed Service'
            placeholder='Consumed Service'
            handleTextChange={null}
            handleOnChange={this.handleProvidedServiceOnChange}
            disabled={this.state.consumerSystem === null} />
          <ChipInput
            disabled={this.state.providedService === null}
            required
            value={this.state.interface}
            id='interface'
            className={classes.input}
            label='Interface'
            onAdd={(chip) => this.handleChipAdd(chip)}
            onDelete={(chip, index) => this.handleDeleteChip(chip, index)} />
        </Card>
        <Card raised className={classes.card}>
          <Typography variant='headline' align='center' className={classes.title}>Provider Systems</Typography>
          <AutoCompleteList
            suggestions={systems}
            handleOnChange={this.handleProviderSystemOnChange}
            keyValue='systemName'
            label='Provider Systems'
            placeholder='System Name'
            disabled={this.state.interface === []}
          />
        </Card>
        <Button
          disabled={this.state.consumerSystem === null || this.state.providedService === null || this.state.providerSystems === null || this.state.interface === []}
          color='primary'
          onClick={this.handleAddButtonClick}
          className={classes.buttonStyle}>
          <AddIcon /> Add
        </Button>
      </div>
    )
  }
}

AddAuthEntry.propTypes = {
  getAuthSystems: PropTypes.func.isRequired,
  getAuthServices: PropTypes.func.isRequired,
  addAuthData: PropTypes.func.isRequired,
  systems: PropTypes.array,
  services: PropTypes.array,
  classes: PropTypes.object
}

function mapStateToProps(state) {
  const { auth } = state
  return { systems: auth.systems, services: auth.services }
}

function mapDispatchToProps(dispatch) {
  return {
    getAuthSystems: () => {
      dispatch(getAuthSystems())
    },
    getAuthServices: () => {
      dispatch(getAuthServices())
    },
    addAuthData: (consumerSystem, providerSystems, providedService, interfaces) => {
      dispatch(addAuthData(consumerSystem, providerSystems, providedService, interfaces))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddAuthEntry))
