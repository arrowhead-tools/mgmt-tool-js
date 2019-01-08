import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import Button from '../../CustomButtons/Button'
import SearchIcon from '@material-ui/icons/Search'
import AutoComplete from '../../AutoComplete/AutoComplete'
import { getFilteredServices } from '../../../actions/serviceRegistry'

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
        systemSearch: value.systemName
      })
    }
  }

  handleSystemSearchTextOnChange = value => {
    if (value !== undefined) {
      this.setState({
        systemSearch: value
      })
    }
  }

  handleServiceSearchOnChange = value => {
    if (value !== undefined) {
      this.setState({
        serviceSearch: value.value
      })
    }
  }

  handleServiceSearchTextOnChange = value => {
    if (value !== undefined) {
      this.setState({
        serviceSearch: value
      })
    }
  }

  handleInterfaceSearchOnChange = value => {
    if (value !== undefined) {
      this.setState({
        interfaceSearch: value.value
      })
    }
  }

  handleInterfaceSearchTextOnChange = value => {
    if (value !== undefined) {
      this.setState({
        interfaceSearch: value.value
      })
    }
  }

  handleSearchClick = () => {
    let queryData = []
    const queryDataObject = {}
    if (this.state.systemSearch) {
      queryDataObject.systemName = this.state.systemSearch
      queryData.push({
        regularExpression: this.state.systemSearch,
        fieldName: 'systemName',
        partialMath: true
      })
    }
    if (this.state.serviceSearch) {
      queryDataObject.serviceDefinition = this.state.serviceSearch
      queryData.push({
        regularExpression: this.state.serviceSearch,
        fieldName: 'serviceDefinition',
        partialMath: true
      })
    }
    if (this.state.interfaceSearch) {
      queryDataObject.interfaces = this.state.interfaceSearch
      queryData.push({ regularExpression: this.state.interfaceSearch, fieldName: 'interfaces', partialMath: true })
    }

    this.props.getFilteredServices(queryData, queryDataObject)
  }

  render() {
    const { services } = this.props
    console.log('services', services)
    return (
      <Card raised style={{ display: 'flex', flexDirection: 'column', margin: '10px', marginTop: '20px' }}>
        <AutoComplete
          handleOnChange={this.handleSystemSearchOnChange}
          handleTextChange={this.handleSystemSearchTextOnChange}
          suggestions={services.systemList}
          keyValue='systemName'
          defaultValue={services.queryData.systemName || ''}
          placeholder='System Name' id='system_search'
          label='System Name'
          classes={{
            inputRoot: { flexWrap: 'wrap' },
            textField: { width: '400px', marginTop: '20px', marginLeft: '20px', marginRight: '20px' }
          }} />
        <AutoComplete
          handleOnChange={this.handleServiceSearchOnChange}
          suggestions={services.serviceList}
          keyValue='value'
          handleTextChange={this.handleServiceSearchTextOnChange}
          defaultValue={services.queryData.serviceDefinition || ''}
          placeholder='Service Definition' id='service_definition_search'
          label='Service Definition'
          classes={{ inputRoot: { flexWrap: 'wrap' }, textField: { width: '400px', margin: '20px' } }} />
        <AutoComplete
          handleOnChange={this.handleInterfaceSearchOnChange}
          suggestions={services.interfaceList}
          keyValue='value'
          handleTextChange={this.handleInterfaceSearchTextOnChange}
          defaultValue={services.queryData.interfaces || ''}
          placeholder='Interface' id='interface_search'
          label='Interface'
          classes={{
            inputRoot: { flexWrap: 'wrap' },
            textField: { width: '400px', marginBottom: '20px', marginLeft: '20px', marginRight: '20px' }
          }} />

        <Button
          color='primary'
          onClick={this.handleSearchClick}
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
  services: PropTypes.object.isRequired,
  getFilteredServices: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { services } = state
  return { services }
}

function mapDispatchToProps(dispatch) {
  return {
    getFilteredServices: (queryData, queryDataObject) => {
      dispatch(getFilteredServices(queryData, queryDataObject))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSearch)
