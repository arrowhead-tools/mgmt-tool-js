import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../components/Grid/GridItem'
import Button from '../../components/CustomButtons/Button'
import ModalContainer from '../../components/Modals/ModalContainer/ModalContainer'
import { hideModal, showModal } from '../../actions/modal'
import AddIcon from '@material-ui/icons/Add'
import { getAuthData } from '../../actions/auth'

const styles = theme => ({
  root: {},
  grid: {},
  buttonMargin: {
    marginLeft: '10px',
    marginRight: '10px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

class Auth extends Component {
  componentDidMount() {
    this.props.getAuthData()
  }

  handleAddClick = () => {
    this.props.showModal({
      open: true,
      closeModal: this.closeModal
    }, 'addAuthEntry')
  }

  render() {
    const { classes } = this.props
    console.log('Auth render')
    return (
      <div className={classes.root}>
        <Grid
          container
          direction='row'
          spacing={16}
          justify='flex-end'
          alignItems='baseline'
          className={classes.grid}>
          <GridItem>
            <div className={classes.buttonContainer}>
              <Button color='primary' onClick={this.handleAddClick}>
                <AddIcon />Add
              </Button>
            </div>
          </GridItem>
        </Grid>
        <ModalContainer />
      </div>
    )
  }
}

Auth.propTypes = {
  getAuthData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { auth } = state
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    getAuthData: () => {
      dispatch(getAuthData())
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    showModal: (modalProps, modalType) => {
      dispatch(showModal({ modalProps, modalType }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Auth))
