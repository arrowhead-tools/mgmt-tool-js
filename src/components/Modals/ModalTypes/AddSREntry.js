import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import Button from '../../../components/CustomButtons/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import AutoComplete from '../../AutoComplete/AutoComplete'

class AddSREntry extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render(){
    const { classes } = this.props
    return (
      <Card raised style={{ display: 'flex', flexDirection: 'column', margin: '10px', width: '440px' }}>
        <Card raised>
        <AutoComplete suggestions={} placeholder={} id={} handleOnChange={}/>
        <TextField id='address'/>
        <TextField id='port'/>
        <TextField id='authenticationInfo'/>
        </Card>
        <TextField id='serviceDefinition'/>
        <TextField id='interfaces'/>
        <TextField id='serviceMetadata'/>
        <TextField id='serviceURI'/>
        <TextField id='udp'/>
        <TextField id='endOfValidity'/>
        <TextField id='version'/>
      </Card>
    )
  }
}