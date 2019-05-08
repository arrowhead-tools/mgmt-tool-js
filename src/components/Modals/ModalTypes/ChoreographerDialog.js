import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { getAuthServices } from '../../../actions/auth'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Button from '../../CustomButtons/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import AutoCompleteMulti from '../../AutoCompleteMulti/AutoCompleteMulti'

const styles = theme => ({
  input: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '400px'
  },
  prop: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  propKey: {
    width: '40%',
    marginLeft: '20px',
    marginRight: theme.spacing.unit * 2,
    marginBottom: '10px'
  },
  propValue: {
    width: '40%',
    marginRight: '20px',
    marginBottom: '10px'
  },
  fabStyle: {
    marginLeft: '20px',
    marginBottom: '20px'
  },
  wrapper: {
    position: 'relative',
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 8
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    width: '440px'
  },
  buttonStyle: {
    width: '440px',
    marginLeft: '10px'
  }
})

class ChoreographerDialog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      steps: [{ name: '', nextSteps: [], services: [] }]
    }
  }

  componentDidMount() {
    this.props.getAuthServices()
  }

  handlePlanNameChange = event => {
    this.setState({ name: event.target.value })
  }

  handleStepsNameChange = index => event => {
    const tmpArr = [...this.state.steps]
    tmpArr[index].name = event.target.value
    this.setState({
      steps: [...tmpArr]
    })
  }

  handlePlanFab = () => {
    const emptyStep = { name: '', nextSteps: [], services: [] }
    this.setState({
      steps: [...this.state.steps, emptyStep]
    })
  }

  handleButtonClick = () => {
    console.log(this.state)
    this.props.createPlan(this.state)
  }

  handleNextStepsChange = index => value => {
    const stringArray = value.map(item => item.name)
    const tmpArray = [...this.state.steps]
    tmpArray[index].nextSteps = [...stringArray]
    this.setState({ steps: tmpArray })
  }

  handleServicesChange = index => value => {
    const stringArray = value.map(service => service.serviceDefinition)
    const tmpArray = [...this.state.steps]
    tmpArray[index].services = [...stringArray]
    this.setState({ steps: tmpArray })
  }

  isServiceProvidedForStep = () => {
    let disabled = true
    for (const item of this.state.steps) {
      if (item.services.length !== 0) {
        disabled = false
        break
      }
    }
    return disabled
  }

  render() {
    const { classes, services } = this.props
    return (
      <div>
        <Card raised className={classes.card}>
          <Typography
            variant="h5"
            align="center"
            style={{ paddingTop: '10px' }}
          >
            Plan Details
          </Typography>
          <TextField
            value={this.state.name}
            className={classes.input}
            required
            label="Name"
            onChange={this.handlePlanNameChange}
          />
        </Card>
        <Card raised className={classes.card}>
          <Typography
            variant="h5"
            align="center"
            style={{ paddingTop: '10px' }}
          >
            Steps
          </Typography>
          <div>
            {this.state.steps.map(({ name }, index) => {
              return (
                <div key={index}>
                  <TextField
                    label="Name"
                    value={name}
                    className={classes.input}
                    onChange={this.handleStepsNameChange(index)}
                  />
                  <AutoCompleteMulti
                    handleOnChange={this.handleNextStepsChange(index)}
                    label="Next Steps"
                    placeholder="Next Steps"
                    keyValue="name"
                    suggestions={this.state.steps}
                  />
                  <AutoCompleteMulti
                    handleOnChange={this.handleServicesChange(index)}
                    label="Services"
                    required
                    placeholder="Services"
                    keyValue="serviceDefinition"
                    suggestions={services}
                  />
                </div>
              )
            })}
          </div>
          <Fab
            className={classes.fabStyle}
            size="small"
            color="secondary"
            aria-label="Add"
            onClick={this.handlePlanFab}
          >
            <AddIcon />
          </Fab>
        </Card>
        <Button
          disabled={this.isServiceProvidedForStep()}
          color="primary"
          onClick={this.handleButtonClick}
          className={classes.buttonStyle}
        >
          Add
        </Button>
      </div>
    )
  }
}

ChoreographerDialog.propTypes = {
  services: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  createPlan: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { auth } = state

  return { services: auth.services }
}

export default connect(
  mapStateToProps,
  { getAuthServices }
)(withStyles(styles)(ChoreographerDialog))
