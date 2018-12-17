import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import Button from '../../components/CustomButtons/Button'
import SearchIcon from '@material-ui/icons/Search'

class ServiceSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      systemSearch: '',
      serviceSearch: '',
      interfaceSearch: ''
    }
  }

  handleSystemSearchOnChange = event => {
    this.setState({
      systemSearch: event.target.value
    })
  }

  handleServiceSearchOnChange = event => {
    this.setState({
      serviceSearch: event.target.value
    })
  }

  handleInterfaceSearchOnChange = event => {
    this.setState({
      interfaceSearch: event.target.value
    })
  }

  render() {
    const { handleSearchClick } = this.props
    return (
      <Card raised style={{ display: 'flex', flexDirection: 'column', margin: '10px', marginTop: '20px' }}>
        <TextField
          id='system_search'
          onChange={this.handleSystemSearchOnChange}
          style={{ width: '400px', marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}
          inputProps={{ placeholder: 'System Name' }} />
        <TextField
          id='system_search'
          style={{ width: '400px', margin: '20px' }}
          inputProps={{ placeholder: 'Service Definition' }}
          onChange={this.handleServiceSearchOnChange} />
        <TextField
          id='system_search'
          onChange={this.handleInterfaceSearchOnChange}
          style={{ width: '400px', marginBottom: '20px', marginLeft: '20px', marginRight: '20px' }}
          inputProps={{ placeholder: 'Interface' }} />
        <Button
          color='primary'
          onClick={() => handleSearchClick(this.state.systemSearch, this.state.serviceSearch, this.state.interfaceSearch)}
          style={{
            width: '400px',
            marginLeft: '20px',
            marginRight: '20px',
            marginBottom: '20px'
          }}><SearchIcon /> Search</Button>
      </Card>
    )
  }
}

ServiceSearch.propTypes = {
  handleSearchClick: PropTypes.func.isRequired
}

export default ServiceSearch
