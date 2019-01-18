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
  }
})

class AddAuthEntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      consumerSystem: null,
      providerSystems: null,
      providedService: null
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
    this.props.addAuthData(this.state.consumerSystem, this.state.providerSystems, this.state.providedService)
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
        </Card>
        <Card raised className={classes.card}>
          <Typography variant='headline' align='center' className={classes.title}>Provider Systems</Typography>
          <AutoCompleteList
            suggestions={systems}
            handleOnChange={this.handleProviderSystemOnChange}
            keyValue='systemName'
            label='Provider Systems'
            placeholder='System Name'
            disabled={this.state.providedService === null}
          />
        </Card>
        <Button
          disabled={this.state.consumerSystem === null || this.state.providedService === null || this.state.providerSystems === null}
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
    addAuthData: (consumerSystem, providerSystems, providedService) => {
      dispatch(addAuthData(consumerSystem, providerSystems, providedService))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddAuthEntry))
