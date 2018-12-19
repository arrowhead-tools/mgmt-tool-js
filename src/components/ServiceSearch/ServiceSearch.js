import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import Button from '../../components/CustomButtons/Button'
import SearchIcon from '@material-ui/icons/Search'
import AutoComplete from '../../components/AutoComplete/AutoComplete'

class ServiceSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      systemSearch: '',
      serviceSearch: '',
      interfaceSearch: ''
    }
  }

  handleSystemSearchOnChange = value => {
    if (value !== undefined) {
      this.setState({
        systemSearch: value
      })
    }
  }

  handleServiceSearchOnChange = value => {
    if (value !== undefined) {
      this.setState({
        serviceSearch: value
      })
    }
  }

  handleInterfaceSearchOnChange = value => {
    if (value !== undefined) {
      this.setState({
        interfaceSearch: value
      })
    }
  }

  render() {
    const { handleSearchClick, systemSuggestions, serviceSuggestions, interfaceSuggestions } = this.props
    return (
      <Card raised style={{ display: 'flex', flexDirection: 'column', margin: '10px', marginTop: '20px' }}>
        <AutoComplete
          handleOnChange={this.handleSystemSearchOnChange}
          suggestions={systemSuggestions}
          placeholder='System Name' id='system_search'
          classes={{
            inputRoot: { flexWrap: 'wrap' },
            textField: { width: '400px', marginTop: '20px', marginLeft: '20px', marginRight: '20px' }
          }} />
        <AutoComplete
          handleOnChange={this.handleServiceSearchOnChange}
          suggestions={serviceSuggestions}
          placeholder='Service Definition' id='service_definition_search'
          classes={{ inputRoot: { flexWrap: 'wrap' }, textField: { width: '400px', margin: '20px' } }} />
        <AutoComplete
          handleOnChange={this.handleInterfaceSearchOnChange}
          suggestions={interfaceSuggestions}
          placeholder='Interface' id='interface_search'
          classes={{
            inputRoot: { flexWrap: 'wrap' },
            textField: { width: '400px', marginBottom: '20px', marginLeft: '20px', marginRight: '20px' }
          }} />

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
  handleSearchClick: PropTypes.func.isRequired,
  systemSuggestions: PropTypes.array.isRequired,
  serviceSuggestions: PropTypes.array.isRequired,
  interfaceSuggestions: PropTypes.array.isRequired
}

export default ServiceSearch
