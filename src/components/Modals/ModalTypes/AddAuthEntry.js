import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import * as PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import { addAuthData } from '../../../actions/auth'
import { getServiceRegistryEntriesView } from '../../../actions/serviceRegistry'
import AutoCompleteSingle from '../../AutoCompleteSingle/AutoCompleteSingle'
import Button from '../../CustomButtons/Button'
import AddIcon from '@material-ui/icons/Add'
import AutoCompleteMulti from '../../AutoCompleteMulti/AutoCompleteMulti'

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
      providerSystems: [],
      providedService: null,
      interfaces: null,
      inputValue: ''
    }
  }

  componentDidMount() {
    this.props.getServiceRegistryEntries()
  }

  handleChange = system => {
    if (this.state.providerSystems.includes(system)) {
      this.removeSelectedItem(system)
    } else {
      this.addSelectedItem(system)
    }
  }

  addSelectedItem(system) {
    this.setState(({ providerSystems }) => ({
      inputValue: '',
      providerSystems: [...providerSystems, system]
    }))
  }

  removeSelectedItem = system => {
    this.setState(({ providerSystems }) => ({
      inputValue: '',
      providerSystems: providerSystems.filter(i => i !== system)
    }))
  }

  handleConsumerSystemOnChange = consumerSystem => {
    this.setState({ consumerSystem })
  }

  handleProvidedServiceOnChange = providedService => {
    this.setState({ providedService })
  }

  handleInterfacesListOnChange = interfaces => {
      this.setState({ interfaces })
  }

  handleProviderSystemOnChange = providerSystems => {
    this.setState({ providerSystems })
  }

  handleAddButtonClick = () => {
    this.props.addAuthData(
      this.state.consumerSystem,
      this.state.providerSystems,
      this.state.providedService,
      this.state.interfaces
    )
  }

  handleChipAdd = chip => {
    this.setState({ interface: [...this.state.interface, chip] })
  }

  handleDeleteChip = (deletedChip, index) => {
    this.setState({
      interface: this.state.interface.filter(c => c !== deletedChip)
    })
  }

  render() {
    const { systems, classes, services, interfaces } = this.props
    return (
      <div>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Consumer System
          </Typography>
          <AutoCompleteSingle
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: {
                width: '400px',
                marginTop: '20px',
                marginLeft: '20px'
              }
            }}
            suggestions={systems}
            handleOnChange={this.handleConsumerSystemOnChange}
            keyValue="systemName"
            required
            placeholder="Consumer System"
            label="Consumer System"
          />
          <Typography className={classes.text}>
            <b>Address:</b>{' '}
            {this.state.consumerSystem ? this.state.consumerSystem.address : ''}
          </Typography>
          <Typography className={classes.textBottom}>
            <b>Port:</b>{' '}
            {this.state.consumerSystem ? this.state.consumerSystem.port : ''}
          </Typography>
        </Card>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Consumed Service
          </Typography>
          <AutoCompleteSingle
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: {
                width: '400px',
                marginTop: '20px',
                marginLeft: '20px'
              }
            }}
            suggestions={services}
            keyValue="value"
            label="Consumed Service"
            placeholder="Consumed Service"
            handleTextChange={null}
            required
            handleOnChange={this.handleProvidedServiceOnChange}
            disabled={this.state.consumerSystem === null}
          />
          <AutoCompleteMulti
            handleOnChange={this.handleInterfacesListOnChange}
            disabled={this.state.providedService === null}
            label="Interfaces"
            placeholder="Interfaces"
            keyValue="value"
            required
            suggestions={interfaces}
          />
        </Card>
        <Card raised className={classes.card}>
          <Typography variant="h5" align="center" className={classes.title}>
            Provider Systems
          </Typography>
          <AutoCompleteMulti
            handleOnChange={this.handleProviderSystemOnChange}
            disabled={this.state.interfaces === null}
            label="Provider Systems"
            placeholder="Provider Systems"
            keyValue="systemName"
            required
            suggestions={systems}
          />
        </Card>
        <Button
          disabled={
            this.state.consumerSystem === null ||
            this.state.providedService === null ||
            this.state.providerSystems === [] ||
            this.state.interface === []
          }
          color="primary"
          onClick={this.handleAddButtonClick}
          className={classes.buttonStyle}
        >
          <AddIcon /> Add
        </Button>
      </div>
    )
  }
}

AddAuthEntry.propTypes = {
  getServiceRegistryEntries: PropTypes.func.isRequired,
  addAuthData: PropTypes.func.isRequired,
  systems: PropTypes.array,
  services: PropTypes.array,
  interfaces: PropTypes.array,
  classes: PropTypes.object
}

function mapStateToProps(state) {
  const { services } = state
  return { systems: services.autoCompleteData.systemList, services: services.autoCompleteData.serviceList, interfaces: services.autoCompleteData.interfaceList }
}

function mapDispatchToProps(dispatch) {
  return {
    getServiceRegistryEntries: () => {dispatch(getServiceRegistryEntriesView())},
    addAuthData: (
      consumerSystem,
      providerSystems,
      providedService,
      interfaces
    ) => {
      dispatch(
        addAuthData(
          consumerSystem,
          providerSystems,
          providedService,
          interfaces
        )
      )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddAuthEntry))
